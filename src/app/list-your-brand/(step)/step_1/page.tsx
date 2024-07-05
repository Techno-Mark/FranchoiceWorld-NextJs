"use client";

import ArrowIcon from "@/assets/icons/arrowIcon";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import CountryDropdown from "@/components/countryDropdown/countryDropdown";
import Title from "@/components/title/title";
// import { updateStepProgress } from "@/utills/stepProgress";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

function FirstStep() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      websiteUrl: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      companyName: Yup.string().required("Company Name is required"),
      websiteUrl: Yup.string()
        .url("Invalid URL")
        .required("Website URL is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // updateStepProgress("/list-your-brand/step_2");
      router.push("/list-your-brand/step_2");
    },
  });

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
                value={formik.values.phoneNumber || "0000000000"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
            name="websiteUrl"
            type="url"
            label="WebSite URL"
            value={formik.values.websiteUrl}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            className={`${
              formik.touched.websiteUrl && formik.errors.websiteUrl
                ? "border-red-500 mb-0.5"
                : "mb-4"
            }`}
          />
          {formik.touched.websiteUrl && formik.errors.websiteUrl && (
            <div className="text-red-500 font-medium mb-12">
              {formik.errors.websiteUrl}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            variant="highlighted"
            type="submit"
            className="rounded-md text-base font-medium flex items-center !py-4 !px-5"
          >
            Next
            <ArrowIcon color="white" className="rotate-180 ml-2" />
          </Button>
        </div>
      </form>
    </>
  );
}

export default FirstStep;
