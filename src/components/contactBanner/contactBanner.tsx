"use client";
import { Field, Form, Formik, FormikHelpers, getIn } from "formik";
import { GoCheckCircle } from "react-icons/go";
import * as Yup from "yup";
import InputField from "../Fields/InputField";
import Card from "../card/card";
import CountryDropdown from "../countryDropdown/countryDropdown";
import Title from "../title/title";
import styles from "./contactBanner.module.css";
import Link from "next/link";
import Checkbox from "../Fields/CheckBox";
import TextArea from "../Fields/TextArea";
import Button from "../button/button";
import Select from "../select/Select";
import { useRouter } from "next/navigation";
import { CreateContact } from "@/api/contact";
import { BiTrim } from "react-icons/bi";

interface FormValues {
  fullName: string;
  // countryCode: string;
  phoneNumber: string;
  emailId: string;
  companyName: string;
  otherInformation: string;
  whoAmI: number | null;
  acceptTerms: boolean;
  pageFrom: string;
}

interface ContactProps {
  underDevelopment?: string;
  title?: string;
  desc?: string;
  pageFroms: string;
}

const whoOption = [
  { label: "Brand", value: 1 },
  { label: "Investor", value: 2 },
  {
    label: "Independent Franchise Partner",
    value: 3,
  },
  { label: "Real Estate Developer", value: 4 },
];
const ContactBanner: React.FC<ContactProps> = ({
  underDevelopment,
  title = "Contact Our Team",
  desc = "We are here to answer your queries, help you navigate the franchising journey, and be at your assistance at all times.",
  pageFroms,
}) => {
  const router = useRouter();

  const initialValues: FormValues = {
    fullName: "",
    companyName: "",
    emailId: "",
    whoAmI: null,
    phoneNumber: "",
    otherInformation: "",
    acceptTerms: true,
    pageFrom: pageFroms,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .max(250, "Full Name cannot be longer than 250 characters.")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Full Name cannot contain special characters"
      )
      .trim()
      .required("Full Name is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
      .required("Phone Number is required"),
    emailId: Yup.string()
      .max(250, "Email Address cannot be longer than 250 characters.")
      .email("Invalid email address")
      .required("Email ID is required"),
    companyName: Yup.string()
      .max(250, "Company Name cannot be longer than 250 characters.")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Company Name cannot contain special characters"
      )
      .trim()
      .required("Company Name is required"),
    whoAmI: Yup.string().required("This field is required"),
    otherInformation: Yup.string().max(
      350,
      "Information cannot be longer than 350 characters."
    ),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms of use."
    ),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<FormValues>
  ) => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    try {
      const response = await CreateContact({
        fullName: values.fullName,
        companyName: values.companyName,
        emailId: values.emailId,
        whoAmI: values.whoAmI,
        phoneNumber: values.phoneNumber.toString(),
        otherInformation: values.otherInformation,
        pageForm: values.pageFrom,
      });
      if (response.ResponseStatus === "success") {
        router.push(`/thankyou`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <section
      className={`relative py-10 md:py-20 lg:mb-44 ${
        underDevelopment && "lg:mb-72"
      } ${styles.contactBanner}`}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row">
          <div className={`w-full lg:w-1/2 ${styles.contactContent}`}>
            <div className="w-full lg:max-w-[467px]">
              {underDevelopment && (
                <p className="text-white text-[14px] md:text-[16px] font-medium pb-10">
                  {underDevelopment}
                </p>
              )}
              <Title varient="white" title={title} titleClass="!pb-2" />
              <p className="text-white text-[14px] lg:text-[16px] font-bold mb-5 md:mb-10">
                {desc}
              </p>
              {!underDevelopment && (
                <ul className="text-white">
                  <li className="flex items-baseline pb-4 md:font-medium text-[12px] md:text-[16px]">
                    <GoCheckCircle size={14} className="mr-2" />
                    <span className="w-11/12">
                      List and grow your brand through thriving franchises.
                    </span>
                  </li>
                  <li className="flex items-baseline pb-4 md:font-medium text-[12px] md:text-[16px]">
                    <GoCheckCircle size={14} className="mr-2" />
                    <span className="w-11/12">
                      Get quality advisory service from brand audit and
                      development to competitive and franchise model assessment,
                      and industry insights.
                    </span>
                  </li>
                  <li className="flex items-baseline pb-4 md:font-medium text-[12px] md:text-[16px]">
                    <GoCheckCircle size={14} className="mr-2" />
                    <span className="w-11/12">
                      Avail comprehensive services for planning, marketing,
                      sales, and after sales under one roof.
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="w-full lg:w-1/2 relative">
                <Card
                  className={`bg-white rounded-lg p-5 lg:p-7 lg:absolute w-full mt-6 md:mt-0 left-0 top-0 ${styles.contactForm}`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:pr-1 mb-3">
                      <Field
                        as={InputField}
                        id="grid-first-name"
                        name="fullName"
                        type="text"
                        label="Full Name"
                        required={true}
                        className={`block text-base w-full border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none ${
                          getIn(errors, "fullName") &&
                          getIn(touched, "fullName")
                            ? "border-red-500 mb-0.5"
                            : ""
                        }`}
                      />
                      {getIn(errors, "fullName") &&
                        getIn(touched, "fullName") && (
                          <div className="text-red-500 font-medium">
                            {getIn(errors, "fullName")}
                          </div>
                        )}
                    </div>
                    <div className="w-full md:pl-1 mb-3">
                      <Field
                        as={InputField}
                        id="grid-company-name"
                        name="companyName"
                        type="text"
                        label="Company Name"
                        required={true}
                        className={`block text-base w-full border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none ${
                          getIn(errors, "companyName") &&
                          getIn(touched, "companyName")
                            ? "border-red-500 mb-0.5"
                            : ""
                        }`}
                      />
                      {getIn(errors, "companyName") &&
                        getIn(touched, "companyName") && (
                          <div className="text-red-500 font-medium">
                            {getIn(errors, "companyName")}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:pr-1 mb-3">
                      <Field
                        as={InputField}
                        id="emailId"
                        name="emailId"
                        type="email"
                        label="Email ID"
                        required={true}
                        className={`block text-base w-full border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none ${
                          getIn(errors, "emailId") && getIn(touched, "emailId")
                            ? "border-red-500 mb-0.5"
                            : ""
                        }`}
                      />
                      {getIn(errors, "emailId") &&
                        getIn(touched, "emailId") && (
                          <div className="text-red-500 font-medium">
                            {getIn(errors, "emailId")}
                          </div>
                        )}
                    </div>
                    <div className="w-full md:pl-1 mb-3">
                      <label
                        className="block mb-2 font-medium text-[rgba(115,114,115,1)]"
                        htmlFor="phoneNumber"
                      >
                        Phone Number{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="flex flex-col">
                        <div className="flex">
                          <div className="w-[100px] text-[12px]">
                            <CountryDropdown
                              variant="small"
                              className="!border-[rgba(115,114,115,0.4)]"
                            />
                          </div>
                          <Field
                            as={InputField}
                            id="grid-phoneNumber"
                            name="phoneNumber"
                            type="text"
                            required={true}
                            maxLength={10}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              const { value } = e.target;
                              if (/^\d{0,10}$/.test(value)) {
                                // Update formik value if it passes validation
                                setFieldValue("phoneNumber", value);
                              }
                            }}
                            className={`block text-base w-full border border-[#73727366] rounded-lg py-2 px-4 ml-2 focus:outline-none ${
                              getIn(errors, "phoneNumber") &&
                              getIn(touched, "phoneNumber")
                                ? "border-red-500 mb-0.5"
                                : ""
                            }`}
                          />
                        </div>
                        {getIn(errors, "phoneNumber") &&
                          getIn(touched, "phoneNumber") && (
                            <div className="text-red-500 font-medium">
                              {getIn(errors, "phoneNumber")}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full mb-3">
                    <Select
                      name="whoAmI"
                      required
                      label="Who am I?"
                      className={`flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium border border-gray-300 rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center ${
                        getIn(errors, "whoAmI") && getIn(touched, "whoAmI")
                          ? "border-red-500 mb-0.5"
                          : ""
                      }`}
                      options={whoOption}
                    />
                    {getIn(errors, "whoAmI") && getIn(touched, "whoAmI") && (
                      <div className="text-red-500 font-medium">
                        {getIn(errors, "whoAmI")}
                      </div>
                    )}
                  </div>
                  <div className="w-full mb-3 md:mb-6">
                    <Field
                      as={TextArea}
                      id="grid-information"
                      name="otherInformation"
                      label="Is there any other information you would like to share with us?"
                      required={false}
                      className={`block text-base w-full border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none ${
                        getIn(errors, "information") &&
                        getIn(touched, "information")
                          ? "border-red-500 mb-0.5"
                          : ""
                      }`}
                    />
                    {getIn(errors, "information") &&
                      getIn(touched, "information") && (
                        <div className="text-red-500 font-medium">
                          {getIn(errors, "information")}
                        </div>
                      )}
                  </div>
                  <div className="mb-3 md:mb-6">
                    <div className="flex items-center">
                      <Field
                        as={Checkbox}
                        id="grid-accept-terms"
                        name="acceptTerms"
                        className={`${
                          getIn(errors, "acceptTerms") &&
                          getIn(touched, "acceptTerms")
                            ? "border-red-500"
                            : ""
                        }`}
                        defaultChecked={true}
                      />
                      <label
                        htmlFor="grid-accept-terms"
                        className="font-semibold text-[12px]"
                      >
                        I agree to the{" "}
                        <Link
                          className="underline"
                          href="/term-conditions"
                          target="_blank"
                        >
                          Terms of Use
                        </Link>{" "}
                        and{" "}
                        <Link
                          className="underline"
                          href="/privacy-policy"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {getIn(errors, "acceptTerms") &&
                      getIn(touched, "acceptTerms") && (
                        <div className="text-sm text-red-500 font-medium my-1">
                          {getIn(errors, "acceptTerms")}
                        </div>
                      )}
                  </div>
                  <Button
                    variant="highlighted"
                    type="submit"
                    className="rounded-md w-full justify-center text-base font-semibold flex items-center !py-2 !px-5"
                  >
                    Submit
                  </Button>
                </Card>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
