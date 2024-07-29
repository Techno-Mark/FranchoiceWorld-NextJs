"use client";
import { AskExperts } from "@/api/contact";
import { getCity } from "@/api/dropdown";
import { Field, Form, Formik, FormikHelpers, getIn } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Checkbox from "../Fields/CheckBox";
import InputField from "../Fields/InputField";
import Button from "../button/button";
import Card from "../card/card";
import CountryDropdown from "../countryDropdown/countryDropdown";
import Select from "../select/Select";
import Title from "../title/title";
import styles from "./askBanner.module.css";

interface FormValues {
  fullName: string;
  countryCode: string;
  phoneNumber: string;
  emailId: string;
  city: number | null;
  acceptTerms: boolean;
}

const AskBanner = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [citiesOption, setCitiesOption] = useState([]);

  const fetchCity = async (cityId: []) => {
    try {
      const response = await getCity("/dropdown/cities", {
        stateId: cityId,
      });
      const formattedCity = response.map((city: any) => ({
        value: city.id,
        label: city.name,
      }));

      setCitiesOption(formattedCity);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCity([]);
    // fetchInvestmentRange();
  }, []);

  const initialValues: FormValues = {
    fullName: "",
    emailId: "",
    countryCode: "+91",
    phoneNumber: "",
    city: null,
    acceptTerms: true,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .max(250, "Full Name cannot be longer than 250 characters.")
      .matches(
        /^[a-zA-Z0-9\s]*$/,
        "Full Name cannot contain special characters"
      )
      .required("Full Name is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits")
      .required("Phone Number is required"),
    emailId: Yup.string()
      .max(250, "Email Address cannot be longer than 250 characters.")
      .email("Invalid email address")
      .required("Email ID is required"),
    city: Yup.number().required("City is required"),
    // companyName: Yup.string()
    //   .max(250, "Company Name cannot be longer than 250 characters.")
    //   .matches(
    //     /^[a-zA-Z0-9\s]*$/,
    //     "Company Name cannot contain special characters"
    //   )
    //   .required("Company Name is required"),
    // whoAmI: Yup.string().required("This field is required"),
    // otherInformation: Yup.string().max(
    //   350,
    //   "Information cannot be longer than 350 characters."
    // ),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldTouched, resetForm }: FormikHelpers<FormValues>
  ) => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    try {
      const response = await AskExperts({
        fullName: values.fullName,
        emailId: values.emailId,
        phoneNumber: values.phoneNumber.toString(),
        countryCode: "+91",
        city: values.city,
        acceptTerms: values.acceptTerms,
      });
      if (response.ResponseStatus === "success") {
        resetForm();
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 10000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <section className={`relative py-10 md:py-20 ${styles.contactBanner}`}>
      <Image
        className="absolute z-[-1] left-0 top-0 w-full object-cover h-4/5 max-h-[533px]"
        src="/images/askBanner.jpg"
        alt="banenr"
        width={1920}
        height={533}
      />
      <div className="container">
        <div className="flex flex-col lg:flex-row mt-8 md:mt-20">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="w-full relative">
                <Card
                  className={`bg-white rounded-lg p-5 lg:p-20 w-full mt-6 md:mt-0 ${styles.contactForm}`}
                >
                  <Title
                    title="Ask Our Experts"
                    desc="Enter Your Personal Details"
                    descClass="md:!px-0 pb-8 font-medium text-xl"
                    titleClass="md:!pb-2.5"
                  />
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:pr-1 mb-3">
                      <Field
                        as={InputField}
                        id="grid-first-name"
                        name="fullName"
                        type="text"
                        label="Full Name"
                        required={true}
                        className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none ${
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
                            className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 ml-2 focus:outline-none ${
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
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:pr-1 mb-3">
                      <Field
                        as={InputField}
                        id="emailId"
                        name="emailId"
                        type="email"
                        label="Email ID"
                        required={true}
                        className={`block w-full border border-[#73727366] rounded-lg py-2.5 px-4 focus:outline-none ${
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
                      <Select
                        name="city"
                        label="City"
                        searchable
                        className={`flex justify-between px-2 py-2 mb-0.5 leading-none bg-white text-[var(--text-color)] font-medium border border-gray-300 rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center ${
                          getIn(errors, "city") && getIn(touched, "city")
                            ? "border-red-500"
                            : ""
                        }`}
                        options={citiesOption}
                      />
                      {getIn(errors, "city") && getIn(touched, "city") && (
                        <div className="text-red-500 font-medium">
                          {getIn(errors, "city")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 mt-6 md:mb-6">
                    <div className="flex justify-center items-center">
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
                        className="font-semibold text-[12px] pl-2"
                      >
                        I agree to the{" "}
                        <Link
                          className="underline"
                          href="/term-conditions"
                          target="_blank"
                        >
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          className="underline"
                          href="/privacy-poilicy"
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
                  <div className="flex justify-center items-center">
                    <Button
                      variant="highlighted"
                      type="submit"
                      className="rounded-md justify-center text-base font-semibold flex items-center !py-2 !px-5"
                    >
                      Submit
                    </Button>
                  </div>
                  {showSuccessMessage && (
                    <div className="text-green-500 text-center mt-4">
                      Your inquiry has been submitted successfully!
                    </div>
                  )}
                </Card>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default AskBanner;
