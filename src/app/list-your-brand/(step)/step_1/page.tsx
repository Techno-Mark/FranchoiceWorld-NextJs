"use client";

import ArrowIcon from "@/assets/icons/arrowIcon";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import CountryDropdown from "@/components/countryDropdown/countryDropdown";
import Title from "@/components/title/title";
import { updateStepProgress } from "@/utills/stepProgress";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

function FirstStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // This runs only on the client side
    setMobileNumber(localStorage.getItem("mobileNumber") || "");
    setSelectedCountry(localStorage.getItem("selectedCountry") || "");
  }, [mobileNumber, selectedCountry]);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: mobileNumber,
      countryCode: selectedCountry,
      email: "",
      companyName: "",
      websiteURL: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      companyName: Yup.string().required("Company Name is required"),
      websiteURL: Yup.string()
        .url("Invalid URL")
        .required("Website URL is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/form-details/create`,
          values
        );
        updateStepProgress("/list-your-brand/step_2");
        router.push(`/list-your-brand/step_2`);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      updateStepProgress("/list-your-brand/step_1");
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/form-details/get`,
          {
            phoneNumber: mobileNumber,
            countryCode: selectedCountry,
          }
        );
        const data = response.data?.ResponseData;

        formik.setValues({
          fullName: data.fullName || "",
          phoneNumber: mobileNumber,
          countryCode: selectedCountry,
          email: data.email || "",
          companyName: data.companyName || "",
          websiteURL: data.websiteURL || "",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (mobileNumber && selectedCountry) {
      fetchData();
    }
  }, [mobileNumber, selectedCountry]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title
        title="Your Details Stay Secure With Us"
        desc="Enter Your Confidential Information"
        descClass="md:!px-0"
        titleClass="md:!pb-2.5"
      />
      <form onSubmit={formik.handleSubmit} className="md:mt-16">
        <div className="flex flex-col md:flex-row">
          <div className="w-full pr-2 mb-3">
            <InputField
              id="grid-first-name"
              name="fullName"
              type="text"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={true}
              className={` ${
                formik.touched.fullName && formik.errors.fullName
                  ? "border-red-500 mb-0.5"
                  : "mb-3"
              }`}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 font-medium mb-4">
                {formik.errors.fullName}
              </div>
            )}
          </div>
          <div className="w-full pl-2 mb-3">
            <label
              className="block mb-2 font-medium text-[var(--text-color)]"
              htmlFor="phoneNumber"
            >
              Phone Number <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex">
              <div className="w-[100px] pb-3">
                <CountryDropdown
                  variant="small"
                  className="!border-[rgba(115,114,115,0.4)]"
                  disabled={true}
                />
              </div>
              <InputField
                id="grid-phoneNumber"
                name="phoneNumber"
                disabled={true}
                type="text"
                value={mobileNumber}
                className={`mb-3`}
              />
            </div>
          </div>
        </div>
        <div className="inline-block w-full mb-3">
          <InputField
            id="grid-email"
            name="email"
            type="email"
            value={formik.values.email}
            label="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            className={`${
              formik.touched.email && formik.errors.email
                ? "border-red-500 mb-0.5"
                : "mb-3"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 font-medium mb-4">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="inline-block w-full mb-3">
          <InputField
            id="grid-company-name"
            name="companyName"
            type="text"
            label="Company Name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            className={`${
              formik.touched.companyName && formik.errors.companyName
                ? "border-red-500 mb-0.5"
                : "mb-3"
            }`}
          />
          {formik.touched.companyName && formik.errors.companyName && (
            <div className="text-red-500 font-medium mb-4">
              {formik.errors.companyName}
            </div>
          )}
        </div>
        <div className="inline-block w-full mb-3">
          <InputField
            id="grid-website-url"
            name="websiteURL"
            type="url"
            label="WebSite URL"
            value={formik.values.websiteURL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            className={`${
              formik.touched.websiteURL && formik.errors.websiteURL
                ? "border-red-500 mb-0.5"
                : "mb-4"
            }`}
          />
          {formik.touched.websiteURL && formik.errors.websiteURL && (
            <div className="text-red-500 font-medium mb-12">
              {formik.errors.websiteURL}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            variant="highlighted"
            type="submit"
            className="rounded-md text-base font-medium flex items-center !py-4 !px-5"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Next
                <ArrowIcon color="white" className="rotate-180 ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}

export default FirstStep;
