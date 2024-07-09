"use client";
import React, { ReactNode, useEffect, useState } from "react";

import styles from "./step_4.module.css";
import Title from "@/components/title/title";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/select/dropdown";
import TextArea from "@/components/Fields/TextArea";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import Select from "@/components/select/Select";
import MultiSelect from "@/components/select/MultiSelect";
import StepLayout from "../layout";
import FileUpload from "@/components/Uploader/FileUpload";
import ImageUpload from "@/components/Uploader/ImageUpload";
import ArrowIcon from "@/assets/icons/arrowIcon";
import VideoUpload from "@/components/Uploader/VideoUpload";
import axios from "axios";
import { useListBrand } from "@/contexts/ListBrandContext";
import { updateStepProgress } from "@/utills/stepProgress";

interface FormValues {
  phoneNumber: string | null;
  countryCode: string | null;
  brochure: File[];
  logo: File[];
  multipleLogos: File[];
  video?: File[];
}

function FourthStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobileNumber(localStorage.getItem("mobileNumber"));
      setSelectedCountry(localStorage.getItem("selectedCountry"));
    }
  }, []);

  const initialValues: FormValues = {
    phoneNumber: mobileNumber,
    countryCode: selectedCountry,
    brochure: [],
    logo: [],
    multipleLogos: [],
    video: [],
  };

  const FILE_SIZE = 5 * 1024 * 1024;
  const SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const SUPPORTED_VIDEO_FORMATS = ["video/mp4", "video/mov", "video/avi"];

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
    multipleLogos: Yup.array()
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
  });

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<FormValues>
  ) => {
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

    values.multipleLogos.forEach((file) => {
      formData.append(`multipleLogos`, file);
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
      updateStepProgress("/app/thankyou");
      router.push(`/app/thankyou`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackButton = () => {
    router.push(`/list-your-brand/step_3`);
  };

  return (
    <>
      <div className={`${styles.formPart} px-3`}>
        <Title
          title="Visualize Your Brand"
          desc="Upload Brochures,Logos, and More"
        />
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="mt-16">
              <div className="grid grid-cols-1 gap-5 mb-2 md:grid-cols-2">
                <div>
                  <FileUpload
                    label="Upload Brochure"
                    desc="Formats accepted are .pdf .png and .jpeg Not more then 25 MB."
                    descClass="text-xs mt-5 font-customBorder font-medium"
                    required
                    name="brochure"
                    onChange={(files) => {
                      // Ensure files is always an array
                      const fileArray = Array.isArray(files)
                        ? files
                        : files
                        ? [files]
                        : [];
                      setFieldValue("brochure", fileArray);
                    }}
                  />
                  {errors.brochure && touched.brochure && (
                    <div className="text-red-500">
                      {errors.brochure as ReactNode}
                    </div>
                  )}
                </div>
                <div>
                  <ImageUpload
                    label="upload Logo"
                    desc="Formats accepted are .png and .jpeg Not more then 5 MB."
                    descClass="text-xs mt-5 font-customBorder font-medium"
                    required
                    name="logo"
                    onChange={(files) => setFieldValue("logo", files)}
                  />
                  {errors.logo && touched.logo && (
                    <div className="text-red-500">
                      {errors.logo as ReactNode}
                    </div>
                  )}
                </div>
                <div>
                  <ImageUpload
                    label="upload Brand Images"
                    desc="Formats accepted are .png and .jpeg Not more then 5 MB."
                    descClass="text-xs mt-5 font-customBorder font-medium"
                    required
                    multiple
                    maxFiles={5}
                    name="multipleLogos"
                    onChange={(files) => setFieldValue("multipleLogos", files)}
                  />
                  {errors.multipleLogos && touched.multipleLogos && (
                    <div className="text-red-500">
                      {errors.multipleLogos as ReactNode}
                    </div>
                  )}
                </div>
                <div>
                  <VideoUpload
                    label="upload Video (Optional)"
                    desc="Formats accepted are .MP4, MOV, AVI Not more then 25 MB."
                    descClass="text-xs mt-5 font-customBorder font-medium"
                    name="video"
                    onChange={(files) => setFieldValue("video", files)}
                  />
                  {errors.video && touched.video && (
                    <div className="text-red-500">{errors.video}</div>
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
                  Next
                  <ArrowIcon color="white" className="rotate-180 ml-2" />
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
