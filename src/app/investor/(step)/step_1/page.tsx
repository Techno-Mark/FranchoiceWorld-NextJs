"use client";

import ArrowIcon from "@/assets/icons/arrowIcon";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import CountryDropdown from "@/components/countryDropdown/countryDropdown";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
// import { updateStepProgress } from "@/utills/stepProgress";
import { Field, Form, Formik, FormikHelpers, getIn } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface FormValues {
  fullName: string;
  phoneNumber: string;
  email: string;
  cities: string;
  pinCode: string;
  investmentRange: string;
}
const Cities = [
  { value: 1, label: "Agra" },
  { value: 2, label: "Ahmedabad" },
  { value: 3, label: "Aizwal" },
  { value: 4, label: "Ajmer" },
  { value: 5, label: "Allahabad" },
  { value: 6, label: "Alleppey" },
];

const investmentRange = [
  { value: 1, label: "Less then 1,00,000" },
  { value: 2, label: "1,00,000 - 2,00,000" },
  { value: 3, label: "2,00,000 - 5,00,000" },
  { value: 4, label: "5,00,000 - 10,00,000" },
  { value: 5, label: "10,00,000 - 15,00,000" },
  { value: 6, label: "More then 15,00,000" },
];
function InvestorFirstStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const initialValues: FormValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    cities: "",
    pinCode: "",
    investmentRange: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    cities: Yup.string().required("City is required"),
    pinCode: Yup.string().required("Pin Code is required"),
    investmentRange: Yup.string().required("Pin Code is required"),
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

  useEffect(() => {
    // This runs only on the client side
    setMobileNumber(localStorage.getItem("mobileNumber") || "");
    setSelectedCountry(localStorage.getItem("selectedCountry") || "");
  }, []);
  // const fetchData = async () => {
  //   // updateStepProgress("/investor/step_1");
  //   try {
  //     let params = {
  //       data: {
  //         phoneNumber: mobileNumber,
  //         countryCode: selectedCountry,
  //       },
  //     };
  //     const response = await getInvestorData(params);
  //     console.log("resp", response);

  //     // formik.setValues({
  //     //   fullName: response.fullName || "",
  //     //   phoneNumber: mobileNumber,
  //     //   countryCode: selectedCountry,
  //     //   email: data.email || "",
  //     //   companyName: data.companyName || "",
  //     //   websiteURL: data.websiteURL || "",
  //     // });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (mobileNumber && selectedCountry) {
  //     fetchData();
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [mobileNumber, selectedCountry]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Title
        title="Your Details Stay Secure With Us"
        desc="Enter Your Confidential Information"
        descClass="md:!px-0 font-medium text-lg"
        titleClass="md:!pb-2.5"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="md:mt-16">
            <div className="flex flex-col md:flex-row">
              <div className="w-full pr-2 mb-3 md:mb-6">
                <Field
                  as={InputField}
                  id="grid-first-name"
                  name="fullName"
                  type="text"
                  label="Full Name"
                  required={true}
                  className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
                    getIn(errors, "fullName") && getIn(touched, "fullName")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {getIn(errors, "fullName") && getIn(touched, "fullName") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "fullName")}
                  </div>
                )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
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
                  <Field
                    as={InputField}
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
            <div className="inline-block w-full mb-3 md:mb-6">
              <Field
                as={InputField}
                id="grid-email"
                name="email"
                label="Email Address"
                type="email"
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

            <div className="flex flex-col md:flex-row">
              <div className="w-full pr-2 mb-3 md:mb-6">
                <Field
                  as={Select}
                  name="cities"
                  label="City"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "cities") && getIn(touched, "cities")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={Cities}
                />
                {getIn(errors, "cities") && getIn(touched, "cities") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "cities")}
                  </div>
                )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
                <Field
                  as={InputField}
                  id="grid-pincode"
                  name="pinCode"
                  type="number"
                  label="Pin Code"
                  required={true}
                  className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
                    getIn(errors, "pinCode") && getIn(touched, "pinCode")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {getIn(errors, "pinCode") && getIn(touched, "pinCode") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "pinCode")}
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 pr-2 mb-3 md:mb-6">
              <Field
                as={Select}
                name="investmentRange"
                label="Investment Range"
                className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                  getIn(errors, "investmentRange") &&
                  getIn(touched, "investmentRange")
                    ? "border-red-500 mb-0.5"
                    : ""
                }`}
                options={investmentRange}
              />
              {getIn(errors, "investmentRange") &&
                getIn(touched, "investmentRange") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "investmentRange")}
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
          </Form>
        )}
      </Formik>
    </>
  );
}

export default InvestorFirstStep;
