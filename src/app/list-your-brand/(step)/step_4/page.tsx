"use client";
import React, { ReactNode } from "react";

import styles from "./step_4.module.css";
import Title from "@/components/title/title";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import { useRouter, useSearchParams } from "next/navigation";
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

interface FormValues {
  phoneNumber: string;
  countryCode: string;
  brochure: File[];
  logo: File[];
  brandImages: File[];
  video?: File[];
  terms?: boolean;
  purposeCheck?: boolean;
}

function FourthStep() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const phoneNumber = searchParams.get("phoneNumber") || "";
  const countryCode = searchParams.get("countryCode") || "";

  const initialValues: FormValues = {
    phoneNumber: phoneNumber,
    countryCode: countryCode,
    brochure: [],
    logo: [],
    brandImages: [],
    video: [],
    terms: true,
    purposeCheck: true,
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
  });

  const handleSubmit = async (
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

    values.brandImages.forEach((file) => {
      formData.append(`brandImages`, file);
    });

    if (values.video) {
      values.video.forEach((file) => {
        formData.append(`video`, file);
      });
    }

    formData.append("phoneNumber", values.phoneNumber);
    formData.append("countryCode", values.countryCode);

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
      alert("done");
      router.push(
        `/list-your-brand/step_4?phoneNumber=${encodeURIComponent(
          values.phoneNumber
        )}&countryCode=${encodeURIComponent(values.countryCode)}`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackButton = () => {
    router.push(
      `/list-your-brand/step_3?phoneNumber=${encodeURIComponent(
        phoneNumber
      )}&countryCode=${encodeURIComponent(countryCode)}`
    );
  };

  return (
    <>
      <div className={`${styles.formPart} px-3`}>
        <Title
          title="Visualize Your Brand"
          desc="Upload Brochures,Logos, and More"
          descClass="md:!px-0"
          titleClass="md:!pb-2.5"
        />
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, values }) => (
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
                    <div className="text-red-500 font-medium mb-4 mt-2">
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
                    <div className="text-red-500 font-medium mb-4 mt-2">
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
                    name="brandImages"
                    onChange={(files) => setFieldValue("brandImages", files)}
                  />
                  {errors.brandImages && touched.brandImages && (
                    <div className="text-red-500 font-medium mb-4 mt-2">
                      {errors.brandImages as ReactNode}
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
                    <div className="text-red-500 font-medium mb-4 ">
                      {errors.video}
                    </div>
                  )}
                </div>
              </div>
              <div className="font-semibold mt-24 text-[rgba(23,73,138,1)]">
                Agree and Submit Your Information
              </div>
              <div className="flex items-center mt-5 mb-3">
                <div className="relative w-4 h-4 mr-2">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={values.terms}
                    onChange={() => setFieldValue("terms", !values.terms)}
                    id="terms"
                    className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                  />
                  <div
                    className={`absolute inset-0 border-2 rounded flex justify-center items-center ${
                      values.terms
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {values.terms && (
                      <svg
                        className="fill-current w-3 h-3 text-white pointer-events-none"
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="terms"
                  className="select-none text-xs font-semibold text-[rgba(115,114,115,1)] cursor-pointer"
                >
                  I agree to the{" "}
                  <span className="underline">Terms & Conditions</span>
                </label>
              </div>
              <div className="flex items-center mt-5 mb-3">
                <div className="relative w-4 h-4 mr-2">
                  <input
                    type="checkbox"
                    name="purposeCheck"
                    checked={values.purposeCheck}
                    onChange={() =>
                      setFieldValue("purposeCheck", !values.purposeCheck)
                    }
                    id="purposeCheck"
                    className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                  />
                  <div
                    className={`absolute inset-0 border-2 rounded flex justify-center items-center ${
                      values.purposeCheck
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {values.purposeCheck && (
                      <svg
                        className="fill-current w-3 h-3 text-white pointer-events-none"
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="purposeCheck"
                  className="select-none text-xs font-semibold text-[rgba(115,114,115,1)] cursor-pointer"
                >
                  I hereby consent to the future processing my data for
                  marketing and operational purposes.
                </label>
              </div>
              <div className="font-medium text-xs mb-9">
                Please note that we do not sell your data to any third party.
              </div>
              <div className="flex justify-between mt-9">
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
