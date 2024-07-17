"use client";
import { ReactNode, useEffect, useState } from "react";

import ArrowIcon from "@/assets/icons/arrowIcon";
import SpinnerLoader from "@/assets/icons/spinner";
import Checkbox from "@/components/Fields/CheckBox";
import FileUpload from "@/components/Uploader/FileUpload";
import ImageUpload from "@/components/Uploader/ImageUpload";
import VideoUpload from "@/components/Uploader/VideoUpload";
import Button from "@/components/button/button";
import Title from "@/components/title/title";
import { updateStepProgress } from "@/utills/stepProgress";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import styles from "./step_4.module.css";

interface FormValues {
  phoneNumber: string | null;
  countryCode: string | null;
  brochure: File[];
  logo: File[];
  brandImages: File[];
  video?: File[];
  acceptTerms: boolean;
}

function FourthStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobileNumber(localStorage.getItem("mobileNumber"));
      setSelectedCountry(localStorage.getItem("selectedCountry"));
    }
  }, []);

  const [formValues, setFormValues] = useState<FormValues>({
    phoneNumber: mobileNumber,
    countryCode: selectedCountry,
    brochure: [],
    logo: [],
    brandImages: [],
    video: [],
    acceptTerms: true,
  });

  const FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const SUPPORTED_VIDEO_FORMATS = [
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "video/avi",
  ];

  const validationSchema = Yup.object({
    brochure: Yup.array()
      .min(1, "Brochure is required")
      .test("fileSize", "File size is too large", (value) =>
        value && value[0] ? value[0].size <= FILE_SIZE : true
      ),
    logo: Yup.array()
      .min(1, "Logo is required")
      .test("fileSize", "File size is too large", (value) =>
        value && value[0] ? value[0].size <= FILE_SIZE : true
      )
      .test("fileFormat", "Unsupported file format", (value) =>
        value && value[0]
          ? SUPPORTED_IMAGE_FORMATS.includes(value[0].type)
          : true
      ),
    brandImages: Yup.array()
      .min(1, "At least one logo is required")
      .max(5, "Maximum 5 logos allowed")
      .test("fileSize", "Files are too large", (value) =>
        value ? value.every((file) => file.size <= FILE_SIZE) : true
      )
      .test("fileFormat", "Unsupported file format", (value) =>
        value
          ? value.every((file) => SUPPORTED_IMAGE_FORMATS.includes(file.type))
          : true
      ),
    video: Yup.array()
      .test(
        "fileSize",
        "File size is too large",
        (value) => (value && value[0] ? value[0].size <= FILE_SIZE * 5 : true) // 25 MB for video
      )
      .test("fileFormat", "Unsupported file format", (value) =>
        value && value[0]
          ? SUPPORTED_VIDEO_FORMATS.includes(value[0].type)
          : true
      ),
    acceptTerms: Yup.boolean()
      .oneOf([true], "You must accept the Terms & Conditions.")
      .required("You must accept the Terms & Conditions."),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
    setIsSubmitting(true);
    // Mark all fields as touched to trigger validation
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName as keyof FormValues, true);
    });

    const formData = new FormData();

    // Append files to formData
    values.brochure.forEach((file) => {
      formData.append(`brochure`, file);
    });

    values.logo.forEach((file) => {
      formData.append(`logo`, file);
    });

    values.brandImages.forEach((file) => {
      formData.append(`brandImages`, file);
    });

    if (values.video) {
      values.video.forEach((file) => {
        formData.append(`video`, file);
      });
    }

    formData.append("phoneNumber", mobileNumber || "");
    formData.append("countryCode", selectedCountry || "");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/form-details/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      updateStepProgress("/thankyou");
      router.push(`/thankyou`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  const createFileFromPath = async (filePath: string, fileName: string) => {
    console.log("🚀 ~ createFileFromPath ~ filePath:", filePath)
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();

      // Determine the MIME type based on the file extension
      const fileExtension = fileName.split(".").pop()?.toLowerCase();
      let mimeType = blob.type;

      if (fileExtension) {
        switch (fileExtension) {
          case "pdf":
            mimeType = "application/pdf";
            break;
          case "jpg":
          case "jpeg":
            mimeType = "image/jpeg";
            break;
          case "png":
            mimeType = "image/png";
            break;
          case "mp4":
            mimeType = "video/mp4";
            break;
          case "mov":
            mimeType = "video/quicktime";
            break;
          case "avi":
            mimeType = "video/x-msvideo";
            break;
        }
      }

      return new File([blob], fileName, { type: mimeType });
    } catch (error) {
      console.error("Error creating file from path:", error);
      return null;
    }
  };

  const extractFileName = (path: any) => {
    if (!path) return null;
    const parts = path.split("/");
    const fullFileName = parts[parts.length - 1];
    const fileNameParts = fullFileName.split("-");
    return fileNameParts.slice(1).join("-"); // This removes the timestamp prefix
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/form-details/get`,
        {
          phoneNumber: mobileNumber,
          countryCode: selectedCountry,
        }
      );
      const data = response.data?.ResponseData;

      // Create File objects from paths
      const brochureFile = data.brochure
        ? await createFileFromPath(
            data.brochure,
            extractFileName(data.brochure)
          )
        : null;
      const logoFile = data.logo
        ? await createFileFromPath(data.logo, extractFileName(data.logo))
        : null;
      const videoFile = data.video
        ? await createFileFromPath(data.video, extractFileName(data.video))
        : null;

      // Create File objects for brandImages
      const brandImageFiles = await Promise.all(
        (data.brandImages || []).map((path: any, index: any) =>
          createFileFromPath(path, `brandImage${index + 1}.jpg`)
        )
      );

      setFormValues((prevValues) => ({
        ...prevValues,
        phoneNumber: data.phoneNumber || null,
        countryCode: data.countryCode || null,
        brochure: brochureFile ? [brochureFile] : [],
        logo: logoFile ? [logoFile] : [],
        brandImages: brandImageFiles.filter(Boolean),
        video: videoFile ? [videoFile] : [],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (mobileNumber && selectedCountry) {
      fetchData();
    }
  }, [mobileNumber, selectedCountry]);

  const handleBackButton = () => {
    router.push(`/list-your-brand/step_3`);
  };

  return (
    <>
      <div className={`${styles.formPart} px-3`}>
        <Title
          title="Visualize Your Brand"
          desc="Upload Brochures,Logos, and More"
          descClass="md:!px-0 pb-8 font-medium text-xl"
          titleClass="md:!pb-2.5"
        />
        <Formik<FormValues>
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="md:mt-8">
              <div className="grid grid-cols-1 gap-5 mb-2 md:grid-cols-2">
                <div>
                  <FileUpload
                    label="Upload Brochure"
                    desc="Formats accepted are .pdf .png and .jpeg Not more then 25 MB."
                    descClass="text-xs mt-5 font-customBorder font-medium"
                    required
                    name="brochure"
                    onChange={(file) => {
                      const fileArray = file ? [file] : [];
                      setFieldValue("brochure", fileArray);
                    }}
                    existingFiles={formValues.brochure}
                  />
                  {errors.brochure && touched.brochure && (
                    <div className="text-red-500">
                      {errors.brochure as ReactNode}
                    </div>
                  )}
                </div>
                <div>
                  <ImageUpload
                    label="Upload Logo"
                    desc="Formats accepted are .png and .jpeg Not more then 5 MB."
                    descClass="text-xs mt-5 font-customBorder font-medium"
                    required
                    name="logo"
                    onChange={(files) => setFieldValue("logo", files)}
                    existingFiles={formValues.logo}
                    maxFiles={1}
                  />
                  {errors.logo && touched.logo && (
                    <div className="text-red-500 font-medium">
                      {errors.logo as ReactNode}
                    </div>
                  )}
                </div>
                <div>
                  <ImageUpload
                    label="Upload Brand Images"
                    desc="Formats accepted are .png and .jpeg Not more then 5 MB."
                    descClass="text-xs mt-5 font-customBorder font-medium"
                    required
                    multiple
                    maxFiles={5}
                    name="brandImages"
                    onChange={(files) => setFieldValue("brandImages", files)}
                  />
                  {errors.brandImages && touched.brandImages && (
                    <div className="text-red-500 font-medium">
                      {errors.brandImages as ReactNode}
                    </div>
                  )}
                </div>
                <div>
                  <VideoUpload
                    label="Upload Video (Optional)"
                    desc="Formats accepted are .MP4, MOV, AVI Not more then 25 MB."
                    descClass="text-xs mt-5 font-customBorder font-medium"
                    name="video"
                    onChange={(files) => setFieldValue("video", files)}
                    existingVideos={formValues.video}
                  />
                  {errors.video && touched.video && (
                    <div className="text-red-500 font-medium">
                      {errors.video}
                    </div>
                  )}
                </div>
              </div>

              <div className="py-24">
                <span className="text-[rgba(23,73,138,1)] font-semibold text-sm">
                  Agree and Submit Your Information
                </span>
                <div className="flex py-5">
                  <Field
                    as={Checkbox}
                    id="acceptTerms"
                    name="acceptTerms"
                    defaultChecked={true}
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="font-semibold text-[12px]"
                  >
                    I agree to the{" "}
                    <Link className="underline" href="#">
                      Terms & Conditions.
                    </Link>
                  </label>
                </div>
                <div className="flex">
                  <Field
                    as={Checkbox}
                    id="grid-accept-terms"
                    name="acceptTerms"
                    defaultChecked={true}
                  />
                  <label
                    htmlFor="grid-accept-terms"
                    className="font-semibold text-[12px]"
                  >
                    I hereby consent to the future processing of my data for
                    marketing and operational purposes.
                  </label>
                </div>
                <div>
                  <label
                    className="text-xs text-[rgba(115,114,115,1)]"
                    htmlFor=""
                  >
                    Please note that we do not sell your data to any third
                    party.
                  </label>
                  {errors.acceptTerms && touched.acceptTerms && (
                    <div className="text-red-500 font-medium">
                      {errors.acceptTerms}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  className="rounded-md text-base font-semibold flex items-center !py-4 !px-5"
                  onClick={handleBackButton}
                >
                  <ArrowIcon
                    color="rgba(115, 114, 115, 0.3)"
                    className="mr-2"
                  />
                  Back
                </Button>
                <Button
                  variant="highlighted"
                  type="submit"
                  className="rounded-md text-base font-semibold flex items-center !py-4 !px-5"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerLoader />
                    </>
                  ) : (
                    <>
                      Submit
                      <ArrowIcon color="white" className="rotate-180 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default FourthStep;
