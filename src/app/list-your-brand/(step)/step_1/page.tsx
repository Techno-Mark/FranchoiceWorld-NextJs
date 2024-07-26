"use client";

import ArrowIcon from "@/assets/icons/arrowIcon";
import SpinnerLoader from "@/assets/icons/spinner";
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
      fullName: Yup.string()
        .max(250, "Full Name cannot be longer than 250 characters.")
        .required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .max(250, "Email Address cannot be longer than 250 characters.")
        .required("Email Address is required"),
      companyName: Yup.string()
        .max(250, "Brand Name cannot be longer than 250 characters.")
        .required("Brand Name is required"),
      websiteURL: Yup.string().matches(
        /[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Invalid WebsiteURL!"
      ),
      // .required("Website URL is required"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/form-details/create`,
          {
            ...values,
            phoneNumber: mobileNumber,
            countryCode: selectedCountry,
          }
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

  const fetchData = async () => {
    updateStepProgress("/list-your-brand/step_1");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/form-details/get`,
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
  useEffect(() => {
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
        descClass="md:!px-0 pb-8 font-medium text-xl"
        titleClass="md:!pb-2.5"
      />
      <form onSubmit={formik.handleSubmit} className="md:mt-16">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:pr-2 mb-8 md:mb-7">
            <InputField
              id="grid-first-name"
              name="fullName"
              type="text"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={true}
              className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none text-base font-medium ${
                formik.touched.fullName && formik.errors.fullName
                  ? "border-red-500 mb-0.5"
                  : ""
              }`}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 font-medium mb-4">
                {formik.errors.fullName}
              </div>
            )}
          </div>
          <div className="w-full mb-8 md:mb-7 md:pl-2">
            <label
              className="block mb-2 font-medium text-[var(--text-color)]"
              htmlFor="phoneNumber"
            >
              Phone Number <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex">
              <div className="w-[100px]">
                <CountryDropdown
                  variant="formDropdown"
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
                className={`block w-full bg-[rgba(115,114,115,0.2)] rounded-lg py-2 px-4 focus:outline-none text-base font-medium md:ml-2 !border-[1px] !border-[rgba(115,114,115,0.4)]`}
              />
            </div>
          </div>
        </div>
        <div className="inline-block w-full md:mb-7 mb-8">
          <InputField
            id="grid-email"
            name="email"
            type="email"
            value={formik.values.email}
            label="Email Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            className={`block w-full border border-[#73727366] rounded-lg py-2 px-4  focus:bg-white focus:outline-none text-base font-medium ${
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
        <div className="inline-block w-full md:mb-7 mb-8">
          <InputField
            id="grid-brand-name"
            name="companyName"
            type="text"
            label="Brand Name"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required={true}
            className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none text-base font-medium ${
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
        <div className="inline-block w-full md:mb-7 mb-8">
          <InputField
            id="grid-website-url"
            name="websiteURL"
            type="text"
            label="Website URL"
            value={formik.values.websiteURL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none text-base font-medium ${
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
                <SpinnerLoader />
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
