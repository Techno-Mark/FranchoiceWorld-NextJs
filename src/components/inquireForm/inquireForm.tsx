"use client";
import { Field, FieldProps, Form, Formik, FormikHelpers, getIn } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import InputField from "../Fields/InputField";
import CountryDropdown from "../countryDropdown/countryDropdown";
import Select from "../select/Select";
import styles from "./inquireform.module.css";
import { getCity, getInvestmentRange } from "@/api/dropdown";
import Button from "../button/button";
import Checkbox from "../Fields/CheckBox";
import { CreateInquiry } from "@/api/contact";

interface FormValues {
  fullName: string;
  countryCode: string;
  phoneNumber: string;
  emailId: string;
  companyName: string;
  whoAmI: string;
  city: number | null;
  acceptTerms: boolean;
}

const InquireForm = () => {
  const [citiesOption, setCitiesOption] = useState([]);
  // const [investmentRange, setInvstmentRange] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // const fetchInvestmentRange = async () => {
  //   try {
  //     const response = await getInvestmentRange(
  //       "/dropdown/min-max-investments"
  //     );
  //     const formattedInvestmentRangeTypes = response.map(
  //       (InvestmentRange: any) => ({
  //         value: InvestmentRange.id,
  //         label: InvestmentRange.range,
  //       })
  //     );
  //     setInvstmentRange(formattedInvestmentRangeTypes);
  //   } catch (error) {
  //     console.error("Error fetching investment ranges:", error);
  //   }
  // };

  const whoOption = [
    { label: "Brand", value: 1 },
    { label: "Investor", value: 2 },
    {
      label: "Independent Franchise Partner",
      value: 3,
    },
    { label: "Real Estate Developer", value: 4 },
  ];

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
    companyName: "",
    countryCode: "+91",
    emailId: "",
    whoAmI: "",
    phoneNumber: "",
    acceptTerms: true,
    city: null,
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
      .matches(/^\d{10}$/, "Number must be exactly 10 digits")
      .required("Phone Number is required"),
    emailId: Yup.string()
      .max(250, "Email Address cannot be longer than 250 characters.")
      .email("Invalid email address")
      .required("Email ID is required"),
    whoAmI: Yup.string().required("This field is required"),
    city: Yup.number().required("City Range is required"),
    // acceptTerms: Yup.boolean().oneOf(
    //   [true],
    //   "You must accept the terms and conditions"
    // ),
  });

  const handleSubmit = async (
    values: FormValues,
    { setFieldTouched, resetForm }: FormikHelpers<FormValues>
  ) => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    try {
      const params = {
        fullName: values.fullName,
        email: values.emailId,
        countryCode: values.countryCode,
        phoneNumber: values.phoneNumber.toString(),
        city: values.city,
        whoAmI: values.whoAmI,
        termsAggrement: values.acceptTerms,
      };
      const response = await CreateInquiry(params);
      if (response.ResponseStatus === "success") {
        resetForm();
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 10000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section
      className={`bg-[var(--footer-bg)] py-2 lg:sticky lg:bottom-0 ${styles.inquiryForm}`}
    >
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="w-full">
              <div className="flex flex-col items-center md:items-start md:flex-row whitespace-nowrap">
                <div className="w-full md:mr-2 mb-2 lg:max-w-[180px]">
                  <Field
                    as={InputField}
                    id="grid-first-name"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    required={true}
                    className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:outline-none text-[12px] font-medium${
                      getIn(errors, "fullName") && getIn(touched, "fullName")
                        ? "!border-red-500"
                        : ""
                    }`}
                  />
                  {getIn(errors, "fullName") && getIn(touched, "fullName") && (
                    <div className="text-red-500 font-medium text-[12px]">
                      {getIn(errors, "fullName")}
                    </div>
                  )}
                </div>
                <div className="w-full md:mr-2 mb-2 lg:max-w-[215px]">
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="w-[80px] text-[12px]">
                        <CountryDropdown
                          variant="small"
                          className="!border-[rgba(115,114,115,0.4)] rounded-lg bg-white !py-2 font-medium"
                        />
                      </div>
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
                        className={`block w-full border border-[#73727366] text-[12px] font-medium rounded-lg py-2 px-4 ml-2 focus:outline-none ${
                          getIn(errors, "phoneNumber") &&
                          getIn(touched, "phoneNumber")
                            ? "border-red-500 mb-0.5"
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
                <div className="w-full md:mr-2 mb-2 lg:max-w-[180px]">
                  <Field
                    as={InputField}
                    id="emailId"
                    name="emailId"
                    type="email"
                    placeholder="Email ID"
                    required={true}
                    className={`block w-full border border-[#73727366] rounded-lg text-[12px] font-medium py-2 px-4 focus:outline-none ${
                      getIn(errors, "emailId") && getIn(touched, "emailId")
                        ? "border-red-500 mb-0.5"
                        : ""
                    }`}
                  />
                  {getIn(errors, "emailId") && getIn(touched, "emailId") && (
                    <div className="text-red-500 font-medium text-[12px]">
                      {getIn(errors, "emailId")}
                    </div>
                  )}
                </div>
                <div className="w-full md:mr-2 mb-2 lg:max-w-[180px]">
                  <Select
                    name="city"
                    placeholder="City"
                    className={`flex items-center justify-between text-[12px] font-medium border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer bg-white focus:outline-none ${
                      getIn(errors, "city") && getIn(touched, "city")
                        ? "border-red-500 mb-0.5"
                        : ""
                    }`}
                    options={citiesOption}
                  />
                  {getIn(errors, "city") && getIn(touched, "city") && (
                    <div className="text-red-500 font-medium text-[12px]">
                      {getIn(errors, "city")}
                    </div>
                  )}
                </div>
                <div className="w-full md:mr-2 mb-2 lg:max-w-[180px]">
                  <Select
                    name="whoAmI"
                    placeholder="Who Am I ?"
                    className={`flex items-center justify-between text-[12px] font-medium border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer bg-white focus:outline-none ${
                      getIn(errors, "whoAmI") && getIn(touched, "whoAmI")
                        ? "border-red-500 mb-0.5"
                        : ""
                    }`}
                    options={whoOption}
                  />
                  {getIn(errors, "whoAmI") && getIn(touched, "whoAmI") && (
                    <div className="text-red-500 font-medium text-[12px]">
                      {getIn(errors, "whoAmI")}
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="highlighted"
                  className="rounded-lg mb-2 text-[12px] border border-[var(--highlighted-color)]"
                >
                  Enquire Now!
                </Button>
              </div>
              <div className="text-center">
                <div className="flex items-base justify-center mb-2">
                  <Field name="acceptTerms">
                    {({ field }: FieldProps) => (
                      <>
                        <Field
                          as={Checkbox}
                          id="acceptTerms"
                          name="acceptTerms"
                          variant="White"
                          defaultChecked={field.value === true}
                          className={`${
                            getIn(errors, "acceptTerms") &&
                            getIn(touched, "acceptTerms")
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </>
                    )}
                  </Field>
                  <label
                    htmlFor="acceptTerms"
                    className="pl-2 leading-none font-medium text-white"
                  >
                    I agree to receive promotional calls/ SMS/ WhatsApp/ Email
                    from Franchoice World
                  </label>
                </div>
                {/* {getIn(errors, "acceptTerms") &&
               getIn(touched, "acceptTerms") && (
                 <div className="text-red-500 font-medium text-[12px]">
                   {getIn(errors, "acceptTerms")}
                 </div>
               )} */}
              </div>
              {showSuccessMessage && (
                <div className="text-green-500 text-center mt-4">
                  Your inquiry has been submitted successfully!
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default InquireForm;
