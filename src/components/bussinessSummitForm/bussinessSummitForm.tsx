"use client";
import { getCity, getIndustry } from "@/api/dropdown";
import { eventRegister } from "@/api/home";
import ArrowIcon from "@/assets/icons/arrowIcon";
import SpinnerLoader from "@/assets/icons/spinner";
import { Field, Form, Formik, FormikHelpers } from "formik";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "../button/button";
import InputField from "../Fields/InputField";
import Select from "../select/Select";
import CountryDropdown from "../countryDropdown/countryDropdown";
import NumberField from "../Fields/CustomNumberBox";

interface FormValues {
  name: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  investmentCapital: number[];
}

const myFont = localFont({
  src: "../../../public/font/impact-webfont.woff",
  variable: "--font-impact",
});

const option = [
  { label: "20L - 30L", value: "20L - 30L" },
  { label: "31L - 40L", value: "31L - 40L" },
  { label: "41L - 55L", value: "41L - 55L" },
  { label: "56L and above", value: "56L and above" },
];

const BussinessSummitForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string>("");

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    investmentCapital: [],
  });

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .max(250, "Name cannot be longer than 250 characters.")
      .required("Name is required")
      .test(
        "no-only-spaces",
        "Name cannot consist only of spaces",
        (value) => (value ? value.trim().length > 0 : false) // Return boolean
      ),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Custom regex for stricter email format
        "Please enter a valid email address"
      ),
    jobTitle: Yup.string()
      .trim()
      .max(250, "Job Title cannot be longer than 250 characters.")
      .required("Job Title is required")
      .test(
        "no-only-spaces",
        "Job Title cannot consist only of spaces",
        (value) => (value ? value.trim().length > 0 : false) // Return boolean
      ),
    investmentCapital: Yup.mixed().test(
      "is-not-empty",
      "Investment Capital is required",
      (value) => {
        return (
          value &&
          (typeof value === "string" ||
            (Array.isArray(value) && value.length > 0))
        );
      }
    ),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Contact Number must be exactly 10 digits")
      .required("Contact No is required"),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
    setIsSubmitting(true);
    try {
      const response = await eventRegister(values);
      if (response.success) {
        router.push(`/registerThankyou`);
      } else {
        setShowSuccessMessage(response.message);
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred";
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const getIn = <T extends object>(obj: T, key: string): any =>
    key.split(".").reduce((o, k) => (o || {})[k], obj as any);

  return (
    <div className="flex flex-col py-5 px-3 md:px-7">
      <div>
        <div className="text-footer-bg text-center uppercase">
          <p
            className={`${myFont.className} text-5xl md:text-[80px] font-impact leading-none`}
          >
            Success ka
          </p>
          <p
            className={`${myFont.className} text-[26px] md:text-[43px] font-impact leading-none`}
          >
            ultimate destination
          </p>
        </div>
        <div className="py-4 md:max-w-[500px]">
          <div className="flex justify-center items-center">
            <div className="h-[1px] w-8 md:w-16 bg-[var(--highlighted-color)]"></div>
            <p className="md:mx-4 mx-2 font-bold text-sm md:text-lg">
              Kickstart your business
            </p>
            <div className="h-[1px] w-8 md:w-16 bg-[var(--highlighted-color)]"></div>
          </div>
          <p className="text-center font-bold text-sm md:text-lg">
            with top franchise opportunities
          </p>
        </div>

        <div className="max-w-[440px]">
          <Formik<FormValues>
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-2 gap-2 md:gap-8">
                  <div className="w-full mb-[10px]">
                    <label
                      className="text-sm text-[var(--text-color)]"
                      htmlFor="name"
                    >
                      Your Name<sup className="text-red-500">*</sup>
                    </label>
                    <Field
                      as={InputField}
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={`block w-full border text-base border-[#73727366] rounded-lg py-1 md:py-2 px-1 md:px-4 focus:bg-white focus:outline-none ${
                        getIn(errors, "name") && getIn(touched, "name")
                          ? "border-red-500 mb-0.5"
                          : ""
                      }`}
                    />
                    {getIn(errors, "name") && getIn(touched, "name") && (
                      <div className="text-red-500 font-medium mb-2">
                        {getIn(errors, "name")}
                      </div>
                    )}
                  </div>
                  <div className="w-full mb-[10px]">
                    <label
                      className="text-sm text-[var(--text-color)]"
                      htmlFor="jobTitle"
                    >
                      Job Title<sup className="text-red-500">*</sup>
                    </label>
                    <Field
                      as={InputField}
                      id="jobTitle"
                      name="jobTitle"
                      type="text"
                      required
                      className={`block w-full border text-base border-[#73727366] rounded-lg py-1 md:py-2 px-1 md:px-4 focus:bg-white focus:outline-none ${
                        getIn(errors, "jobTitle") && getIn(touched, "jobTitle")
                          ? "border-red-500 mb-0.5"
                          : ""
                      }`}
                    />
                    {getIn(errors, "jobTitle") &&
                      getIn(touched, "jobTitle") && (
                        <div className="text-red-500 font-medium mb-2">
                          {getIn(errors, "jobTitle")}
                        </div>
                      )}
                  </div>
                </div>
                <div className="w-full mb-[10px]">
                  <label
                    className="text-sm text-[var(--text-color)]"
                    htmlFor="investmentCapital"
                  >
                    Investment Capital (INR in Lakhs)
                    <sup className="text-red-500">*</sup>
                  </label>
                  <Select
                    name="investmentCapital"
                    placeholder=" "
                    searchable
                    className={`flex justify-between !px-1 md:px-2 !py-1 md:py-2 mb-0.5 leading-none bg-white text-[var(--text-color)] font-medium border border-[#73727366] rounded-lg cursor-pointer focus:outline-none min-h-[37px] md:min-h-[45px] items-center ${
                      getIn(errors, "investmentCapital") &&
                      getIn(touched, "investmentCapital")
                        ? "border-red-500 mb-0.5"
                        : ""
                    }`}
                    options={option}
                  />
                  {getIn(errors, "investmentCapital") &&
                    getIn(touched, "investmentCapital") && (
                      <div className="text-red-500 font-medium mb-2">
                        {getIn(errors, "investmentCapital")}
                      </div>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-10">
                  <div className="w-full mb-[10px]">
                    <label
                      className="text-sm text-[var(--text-color)]"
                      htmlFor="email"
                    >
                      Email<sup className="text-red-500">*</sup>
                    </label>
                    <Field
                      as={InputField}
                      id="email"
                      name="email"
                      type="text"
                      required
                      className={`block w-full border text-base border-[#73727366] rounded-lg py-1 md:py-2 px-1 md:px-4  focus:bg-white focus:outline-none  ${
                        getIn(errors, "email") && getIn(touched, "email")
                          ? "border-red-500 mb-0.5"
                          : ""
                      }`}
                    />
                    {getIn(errors, "email") && getIn(touched, "email") && (
                      <div className="text-red-500 font-medium mb-2">
                        {getIn(errors, "email")}
                      </div>
                    )}
                  </div>
                  <div className="w-full mb-[10px]">
                    <label
                      className="text-sm text-[var(--text-color)]"
                      htmlFor="phoneNumber"
                    >
                      Contact No<sup className="text-red-500">*</sup>
                    </label>

                    <Field
                      as={NumberField}
                      id="phoneNumber"
                      name="phoneNumber"
                      type="Number"
                      required
                      maxLength={10}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.target;
                        if (/^\d{0,10}$/.test(value)) {
                          // Update formik value if it passes validation
                          setFieldValue("phoneNumber", value);
                        }
                      }}
                      className={`block !pl-14 w-full border text-base border-[#73727366] rounded-lg py-1 md:py-2 px-1 md:px-4 focus:bg-white focus:outline-none ${
                        getIn(errors, "phoneNumber") &&
                        getIn(touched, "phoneNumber")
                          ? "border-red-500 mb-0.5"
                          : ""
                      }`}
                    />

                    {getIn(errors, "phoneNumber") &&
                      getIn(touched, "phoneNumber") && (
                        <div className="text-red-500 font-medium mb-2">
                          {getIn(errors, "phoneNumber")}
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    variant="highlighted"
                    type="submit"
                    className="rounded-lg font-bold text-sm flex items-center !py-3 !px-7"
                  >
                    {isSubmitting ? (
                      <>
                        <SpinnerLoader />
                      </>
                    ) : (
                      <>
                        Get special VIP passes | Register Now
                        <ArrowIcon color="white" className="rotate-180 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
                {showSuccessMessage && (
                  <div className="text-red-500 text-center md:mt-2 font-bold">
                    {showSuccessMessage}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BussinessSummitForm;
