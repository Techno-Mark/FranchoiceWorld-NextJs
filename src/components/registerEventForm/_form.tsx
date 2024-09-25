import { Field, Form, Formik, FormikHelpers, getIn } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Button from "../button/button";
import InputField from "../Fields/InputField";
import Select from "../select/Select";
import { eventRegister } from "@/api/home";

interface FormValues {
  name: string;
  jobTitle: string;
  phoneNumber: string;
  email: string;
  investmentCapital: number[];
}

const option = [
  { label: "20L - 30L", value: "20L - 30L" },
  { label: "31L - 40L", value: "31L - 40L" },
  { label: "41L - 55L", value: "41L - 55L" },
  { label: "56L and above", value: "56L and above" },
];

interface EnquireProps {
  varient?: "white" | "dark";
  pageForm?: string;
}

const EnvForm: React.FC<EnquireProps> = ({ varient = "white", pageForm }) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const initialValues: FormValues = {
    name: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    investmentCapital: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(250, "Name cannot be longer than 250 characters.")
      .matches(/^[a-zA-Z0-9\s]*$/, "Name cannot contain special characters")
      .required("Name is required"),
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
      .matches(/^\d{10}$/, "Number must be exactly 10 digits")
      .required("Phone Number is required"),
    email: Yup.string()
      .max(250, "Email Address cannot be longer than 250 characters.")
      .email("Invalid email address")
      .required("Email ID is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setFieldTouched, resetForm }: FormikHelpers<FormValues>
  ) => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    setSuccessMessage(""); // Reset messages before each submit
    setErrorMessage("");

    try {
      const params = {
        name: values.name,
        email: values.email,
        jobTitle: values.jobTitle,
        investmentCapital: values.investmentCapital,
        phoneNumber: values.phoneNumber.toString(),
      };
      const response = await eventRegister(params);
      if (response.success) {
        resetForm();
        setTimeout(() => setSuccessMessage(response.message), 5000);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="w-full">
          <div
            className={`flex flex-col items-center md:items-start md:flex-row whitespace-nowrap ${
              varient === "dark" ? "md:flex-col whitespace-normal" : ""
            }`}
          >
            <div className="w-full md:mr-2 mb-2 lg:max-w-[180px]">
              <Field
                as={InputField}
                id="grid-first-name"
                name="name"
                type="text"
                placeholder="Your Name*"
                required={true}
                className={`block text-base md:text-xs w-full border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none text-[12px] font-medium ${
                  getIn(errors, "name") && getIn(touched, "name")
                    ? "border-red-500 mb-0.5"
                    : ""
                }`}
              />
              {getIn(errors, "name") && getIn(touched, "name") && (
                <div className="text-red-500 font-medium text-[12px]">
                  {getIn(errors, "name")}
                </div>
              )}
            </div>
            <div className="w-full md:mr-2 mb-2 lg:max-w-[180px]">
              <Field
                as={InputField}
                id="grid-job-title"
                name="jobTitle"
                type="text"
                placeholder="Job Title"
                required={true}
                className={`block text-base md:text-xs w-full border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none text-[12px] font-medium ${
                  getIn(errors, "jobTitle") && getIn(touched, "jobTitle")
                    ? "border-red-500 mb-0.5"
                    : ""
                }`}
              />
              {getIn(errors, "jobTitle") && getIn(touched, "jobTitle") && (
                <div className="text-red-500 font-medium text-[12px]">
                  {getIn(errors, "jobTitle")}
                </div>
              )}
            </div>
            <div className="w-full md:mr-2 mb-2 lg:max-w-[180px]">
              <Select
                name="investmentCapital"
                searchable
                placeholder="Investment Capital"
                className={`flex items-center justify-between text-[12px] font-medium border border-[rgba(115,114,115,0.4)] rounded-lg py-[7px] px-4 cursor-pointer bg-white focus:outline-none ${
                  getIn(errors, "investmentCapital") &&
                  getIn(touched, "investmentCapital")
                    ? "border-red-500 mb-0.5"
                    : ""
                }`}
                options={option}
              />
              {getIn(errors, "investmentCapital") &&
                getIn(touched, "investmentCapital") && (
                  <div className="text-red-500 font-medium text-[12px]">
                    {getIn(errors, "investmentCapital")}
                  </div>
                )}
            </div>
            <div className="w-full md:mr-2 mb-2 lg:max-w-[180px]">
              <Field
                as={InputField}
                id="email"
                name="email"
                type="email"
                placeholder="Email*"
                required={true}
                className={`block text-base md:text-xs w-full border border-[#73727366] rounded-lg text-[12px] font-medium py-2 px-4 focus:outline-none ${
                  getIn(errors, "email") && getIn(touched, "email")
                    ? "border-red-500 mb-0.5"
                    : ""
                }`}
              />
              {getIn(errors, "email") && getIn(touched, "email") && (
                <div className="text-red-500 font-medium text-[12px]">
                  {getIn(errors, "email")}
                </div>
              )}
            </div>
            <div className="w-full md:mr-2 mb-2 lg:max-w-[215px]">
              <div className="flex flex-col">
                <div className="flex">
                  <Field
                    as={InputField}
                    id="grid-phoneNumber"
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    required={true}
                    maxLength={10}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const { value } = e.target;
                      if (/^\d{0,10}$/.test(value)) {
                        setFieldValue("phoneNumber", value);
                      }
                    }}
                    className={`block w-full text-base md:text-xs border border-[#73727366] text-[12px] font-medium rounded-lg py-2 px-4 ml-1 focus:outline-none mb-0.5 ${
                      getIn(errors, "phoneNumber") &&
                      getIn(touched, "phoneNumber")
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {getIn(errors, "phoneNumber") &&
                  getIn(touched, "phoneNumber") && (
                    <div className="text-red-500 font-medium text-[12px]">
                      {getIn(errors, "phoneNumber")}
                    </div>
                  )}
              </div>
            </div>
            <Button
              type="submit"
              variant="highlighted"
              className={`rounded-lg mb-2 text-[12px] border border-[var(--highlighted-color)] ${
                varient === "dark" ? "w-full" : ""
              }`}
            >
              Register to Attend
            </Button>
          </div>
          {successMessage && (
            <div className="text-green-500 text-center mt-4">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="text-red-500 text-center mt-4">
              {errorMessage}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EnvForm;
