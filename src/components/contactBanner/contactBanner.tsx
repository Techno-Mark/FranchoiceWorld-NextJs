"use client";
import { Field, Form, Formik, FormikHelpers, getIn } from "formik";
import { GoCheckCircle } from "react-icons/go";
import * as Yup from "yup";
import InputField from "../Fields/InputField";
import Card from "../card/card";
import CountryDropdown from "../countryDropdown/countryDropdown";
import Title from "../title/title";
import styles from "./contactBanner.module.css";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import Checkbox from "../Fields/CheckBox";
import TextArea from "../Fields/TextArea";
import Button from "../button/button";
import Select from "../select/Select";

interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  information: string;
  who: string;
  acceptTerms: boolean;
}
const whoOption = [
  { label: "Brand", value: "Brand" },
  { label: "Investor", value: "Investor" },
  {
    label: "Independent Franchise Partner",
    value: "Independent Franchise Partner",
  },
  { label: "Real Estate Developer", value: "Real Estate Developer" },
];
const ContactBanner = () => {
  // const router = useRouter();

  const initialValues: FormValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    information: "",
    who: "",
    acceptTerms: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    companyName: Yup.string().required("Company Name is required"),
    who: Yup.string().required("This field is required"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<FormValues>
  ) => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    console.log("Form submitted:", values);
    setSubmitting(false);
  };

  return (
    <section
      className={`relative py-10 md:py-20 md:mb-32 lg:mb-44 ${styles.contactBanner}`}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row">
          <div className={`w-full md:w-1/2 ${styles.contactContent}`}>
            <div className="max-w-[467px] w-full">
              <Title
                varient="white"
                title="Contact Our Team"
                titleClass="!pb-2"
              />
              <p className="text-white text-[12px] md:text-[16px] font-bold mb-5 md:mb-10">
                We are here to answer your queries, help you navigate the
                franchising journey, and be at your assistance at all times.
              </p>
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
                    Avail comprehensive services for planning, marketing, sales,
                    and after sales under one roof.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="w-full md:w-1/2 relative">
                <Card
                  className={`bg-white rounded-lg p-8 md:absolute w-full mt-6 md:mt-0 left-0 top-0 ${styles.contactForm}`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full pr-1 mb-3">
                      <Field
                        as={InputField}
                        id="grid-first-name"
                        name="fullName"
                        type="text"
                        label="Full name"
                        required={true}
                        className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
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
                    <div className="w-full pl-1 mb-3">
                      <Field
                        as={InputField}
                        id="grid-company-name"
                        name="companyName"
                        type="text"
                        label="Company Name"
                        required={true}
                        className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
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
                    <div className="w-full pr-1 mb-3">
                      <Field
                        as={InputField}
                        id="grid-email"
                        name="email"
                        type="email"
                        label="Email ID"
                        required={true}
                        className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
                          getIn(errors, "email") && getIn(touched, "email")
                            ? "border-red-500 mb-0.5"
                            : ""
                        }`}
                      />
                      {getIn(errors, "email") && getIn(touched, "email") && (
                        <div className="text-red-500 font-medium">
                          {getIn(errors, "email")}
                        </div>
                      )}
                    </div>
                    <div className="w-full pl-1 mb-3">
                      <label
                        className="block mb-2 font-semibold text-[rgba(115,114,115,1)]"
                        htmlFor="phoneNumber"
                      >
                        Phone Number{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="flex flex-col">
                        <div className="flex">
                          <div className="w-[100px] text-[12px] text-semibold">
                            <CountryDropdown
                              variant="small"
                              className="!border-[rgba(115,114,115,0.4)]"
                            />
                          </div>
                          <Field
                            as={InputField}
                            id="grid-phoneNumber"
                            name="phoneNumber"
                            type="number"
                            required={true}
                            className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 ml-2 focus:bg-white focus:border-[#73727366] ${
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
                  <div className="w-full mb-3 md:mb-6">
                    <Field
                      as={Select}
                      name="who"
                      label="Who am I?"
                      className={`flex  justify-between px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none min-h-[45px] items-center ${
                        getIn(errors, "who") && getIn(touched, "who")
                          ? "border-red-500 mb-0.5"
                          : ""
                      }`}
                      options={whoOption}
                    />
                    {getIn(errors, "who") && getIn(touched, "who") && (
                      <div className="text-red-500 font-medium">
                        {getIn(errors, "who")}
                      </div>
                    )}
                  </div>
                  <div className="w-full mb-3 md:mb-6">
                    <Field
                      as={TextArea}
                      id="grid-information"
                      name="information"
                      label="Is there any other information you would like yo share with us?"
                      required={false}
                      className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
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
                        <Link className="underline" href="#">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link className="underline" href="#">
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
