"use client";
import styles from "./contactBanner.module.css";
import Title from "../title/title";
import { GoCheckCircle } from "react-icons/go";
import Card from "../card/card";
import CountryDropdown from "../countryDropdown/countryDropdown";
import InputField from "../Fields/InputField";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  getIn,
  useFormik,
} from "formik";

import * as Yup from "yup";
import { useRouter } from "next/navigation";
import TextArea from "../Fields/TextArea";
import Select from "../select/Select";
import Button from "../button/button";
import Checkbox from "../Fields/CheckBox";
interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  companyName: string;
  information: string;
  who: string;
  acceptTerms: string;
}
const ContactBanner = () => {
  const router = useRouter();

  const initialValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    information: "",
    who: "",
    acceptTerms: "",
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
    values: typeof initialValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof initialValues>
  ) => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    // Call your submission logic here
    console.log("Form submitted:", values);
    // router.push("/list-your-brand/step_4");

    // After submission logic, reset submitting state
    setSubmitting(false);
  };

  return (
    <>
      <section className={`relative py-10 md:py-20 ${styles.contactBanner}`}>
        <div className="container">
          <div className="flex flex-col md:flex-row">
            <div className={`w-full md:w-1/2 ${styles.contactContent}`}>
              <div className="max-w-[467px] w-full">
                <Title
                  varient="white"
                  title="Contact Our Team"
                  titleClass="!pb-2"
                />
                <p className="text-white text-base font-bold mb-4.5 md:mb-10">
                  We are here to answer your queries, help you navigate the
                  franchising journey, and be at your assistance at all times.
                </p>
                <ul className="text-white text-base">
                  <li className="flex items-baseline pb-4">
                    <GoCheckCircle size={14} className="w-6 mr-2" />
                    <span className="w-11/12">
                      List and grow your brand through thriving franchises.
                    </span>
                  </li>
                  <li className="flex items-baseline pb-4">
                    <GoCheckCircle size={14} className="w-6 mr-2" />
                    <span className="w-11/12">
                      Get quality advisory service from brand audit and
                      development to competitive and franchise model assessment,
                      and industry insights.
                    </span>
                  </li>
                  <li className="flex items-baseline pb-4">
                    <GoCheckCircle size={14} className="w-6 mr-2" />
                    <span className="w-11/12">
                      Avail comprehensive services for planning, marketing,
                      sales, and after sales under one roof.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <Formik<FormValues>
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className="w-full md:w-1/2 relative">
                  <Card
                    className={`bg-white rounded-lg p-8 ${styles.contactForm}`}
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
                          className={`block w-full border border-[#73727366] rounded-lg py-2 px-4  focus:bg-white focus:border-[#73727366] ${
                            getIn(errors, "fullName") &&
                            getIn(touched, "fullName")
                              ? "border-red-500 mb-0.5"
                              : ""
                          }`}
                        />
                        {getIn(errors, "fullName") &&
                          getIn(touched, "fullName") && (
                            <div className="text-red-500 font-medium mb-2">
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
                            <div className="text-red-500 font-medium mb-2">
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
                          <div className="text-red-500 font-medium mb-2">
                            {getIn(errors, "email")}
                          </div>
                        )}
                      </div>
                      <div className="w-full pl-1 mb-3">
                        <label
                          className="block mb-2 font-medium text-[var(--text-color)]"
                          htmlFor="phoneNumber"
                        >
                          Phone Number{" "}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="flex">
                          <div className="w-[100px] pb-3 pr-1">
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
                            className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
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
                    </div>
                    <div className="w-full mb-3 md:mb-6">
                      <Field
                        as={Select}
                        name="who"
                        label="Who am I?"
                        className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none min-h-[45px] items-center ${
                          getIn(errors, "who") && getIn(touched, "who")
                            ? "border-red-500 mb-0.5"
                            : ""
                        }`}
                        options={[]}
                      />
                      {getIn(errors, "who") && getIn(touched, "who") && (
                        <div className="text-red-500 font-medium mb-2">
                          {getIn(errors, "who")}
                        </div>
                      )}
                    </div>
                    <div className="w-full mb-3">
                      <Field
                        as={TextArea}
                        id="information"
                        name="information"
                        label="Is there any other information you would like to share with us?"
                        placeholder="Your Message"
                        rows={4}
                        className="block w-full border resize-none border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div className="w-full mb-3">
                      <Field
                        id="acceptTerms"
                        name="acceptTerms"
                        label="Accept Terms and Conditions"
                        component={Checkbox}
                        checked
                        formik={true}
                      />
                      <ErrorMessage
                        name="acceptTerms"
                        component="div"
                        className="error"
                      />
                    </div>
                    <Button
                      variant="highlighted"
                      type="submit"
                      className="rounded-md text-base font-semibold flex items-center !py-4 !px-5"
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
    </>
  );
};

export default ContactBanner;
