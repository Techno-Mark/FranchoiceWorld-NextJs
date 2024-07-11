"use client";
import ArrowIcon from "@/assets/icons/arrowIcon";
import Button from "@/components/button/button";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { Field, Form, Formik, FormikHelpers, getIn } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "./step_2.module.css";
import MultiSelect from "@/components/select/MultiSelect";
import Checkbox from "@/components/Fields/CheckBox";
import { useRouter } from "next/navigation";

interface FormValues {
  industryType: string;
  availableCapital: string;
  soonInvest: string;
  loan: boolean;
  lookingFor: string;
  bussinessState: string[];
  bussinessCity: string[];
  ownPropety: boolean;
}

const industry = [
  { value: 1, label: "Food" },
  { value: 2, label: "Automobile" },
  { value: 3, label: "Education" },
  { value: 4, label: "Beauty & Health" },
  { value: 5, label: "Sports" },
  { value: 6, label: "Fashion" },
];

const capital = [
  { value: 1, label: "Less then 1,00,000" },
  { value: 2, label: "1,00,000 - 2,00,000" },
  { value: 3, label: "2,00,000 - 5,00,000" },
  { value: 4, label: "5,00,000 - 10,00,000" },
  { value: 5, label: "10,00,000 - 15,00,000" },
  { value: 6, label: "More then 15,00,000" },
];
const investSoon = [
  { value: 1, label: "Less then 1 Month" },
  { value: 2, label: "2-4 Month" },
  { value: 3, label: "4-8 Month" },
  { value: 4, label: "8-12 Month" },
];
const state = [
  { value: 1, label: "Andhra Pradesh" },
  { value: 2, label: "Arunachal Pradesh" },
  { value: 3, label: "Assam" },
  { value: 4, label: "Bihar" },
  { value: 5, label: "Chhattisgarh" },
  { value: 6, label: "Goa" },
];

const city = [
  { value: 1, label: "Agra" },
  { value: 2, label: "Ahmedabad" },
  { value: 3, label: "Aizwal" },
  { value: 4, label: "Ajmer" },
  { value: 5, label: "Allahabad" },
  { value: 6, label: "Alleppey" },
];

function InvestorSecondStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const handleBackButton = () => {
    router.push(`/investor/step_1`);
  };
  const initialValues: FormValues = {
    industryType: "",
    availableCapital: "",
    soonInvest: "",
    loan: true,
    lookingFor: "",
    bussinessState: [],
    bussinessCity: [],
    ownPropety: true,
  };

  const validationSchema = Yup.object({
    industryType: Yup.string().required("Industry is required"),
    availableCapital: Yup.string().required("Available Capital is required"),
    soonInvest: Yup.string().required("Investment Time is required"),
    lookingFor: Yup.string().required("Looking For is required"),
    bussinessState: Yup.array().required("State is required"),
    bussinessCity: Yup.array().required("City is required"),
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

  return (
    <>
      <Title
        title="Tell Us What You Are Looking For"
        desc="Enter Your Investment Details"
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
                  as={Select}
                  name="industryType"
                  label="Industry Type"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "industryType") &&
                    getIn(touched, "industryType")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={industry}
                />
                {getIn(errors, "industryType") &&
                  getIn(touched, "industryType") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "industryType")}
                    </div>
                  )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
                <Field
                  as={Select}
                  name="availableCapital"
                  label="Available Capital"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "availableCapital") &&
                    getIn(touched, "availableCapital")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={capital}
                />
                {getIn(errors, "availableCapital") &&
                  getIn(touched, "availableCapital") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "availableCapital")}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full pr-2 mb-3 md:mb-6">
                <Field
                  as={Select}
                  name="soonInvest"
                  label="How soon would you like to invest?"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "soonInvest") && getIn(touched, "soonInvest")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={investSoon}
                />
                {getIn(errors, "soonInvest") &&
                  getIn(touched, "soonInvest") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "soonInvest")}
                    </div>
                  )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
                <label className="block mb-2 font-medium">Need for Loan?</label>
                <div className="flex items-center pt-2">
                  <div className="flex items-center mr-3">
                    <input
                      id="loanYes"
                      type="radio"
                      name="loan"
                      className={`mr-2 ${styles.RadioBox}`}
                      value={1}
                      checked
                    />
                    <label htmlFor="loanYes">Yes</label>
                  </div>
                  <div className="flex">
                    <input
                      id="loanNo"
                      name="loan"
                      type="radio"
                      className={`mr-2 ${styles.RadioBox}`}
                      value={0}
                    />
                    <label htmlFor="loanNo">No</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full pr-2 mb-3 md:mb-6">
                <Field
                  as={Select}
                  name="lookingFor"
                  label="Looking For"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "lookingFor") && getIn(touched, "lookingFor")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={capital}
                />
                {getIn(errors, "lookingFor") &&
                  getIn(touched, "lookingFor") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "lookingFor")}
                    </div>
                  )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
                <Field
                  as={MultiSelect}
                  name="bussinessState"
                  label="Looking For Business in (State)"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "bussinessState") &&
                    getIn(touched, "bussinessState")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={state}
                />
                {getIn(errors, "bussinessState") &&
                  getIn(touched, "bussinessState") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "bussinessState")}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full pr-2 mb-3 md:mb-6">
                <Field
                  as={MultiSelect}
                  name="bussinessCity"
                  label="Looking For Business in (City)"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "bussinessCity") &&
                    getIn(touched, "bussinessCity")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={city}
                />
                {getIn(errors, "bussinessCity") &&
                  getIn(touched, "bussinessCity") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "bussinessCity")}
                    </div>
                  )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
                <label className="block mb-2 font-medium">
                  Do you own a property?
                </label>
                <div className="flex items-center pt-2">
                  <div className="flex items-center mr-3">
                    <input
                      id="ownYes"
                      type="radio"
                      name="ownPropety"
                      className={`mr-2 ${styles.RadioBox}`}
                      value={1}
                      checked
                    />
                    <label htmlFor="ownYes">Yes</label>
                  </div>
                  <div className="flex">
                    <input
                      id="ownNo"
                      name="ownPropety"
                      type="radio"
                      className={`mr-2 ${styles.RadioBox}`}
                      value={0}
                    />
                    <label htmlFor="ownNo">No</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Title
                title="Agree and Submit Your Information"
                titleClass="!text-base"
              />
              <Checkbox
                className="mb-3"
                name="submitInfo"
                id="aggreetosubmit"
                label="Agree and Submit Your Information ? "
                defaultChecked={true}
              />
              <Checkbox
                className="mb-3"
                name="submitInfo"
                id="aggreetosubmit"
                label="I hereby consent to the future processing of my data for marketing and operational purposes. "
                defaultChecked={true}
              />
            </div>
            <small>
              Please note that we do not sell your data to any third party.
            </small>
            <div className="flex justify-between pt-8">
              <Button
                variant="secondary"
                className="rounded-md text-base font-semibold flex items-center !py-4 !px-5"
                onClick={handleBackButton}
              >
                <ArrowIcon color="rgba(115, 114, 115, 0.3)" className="mr-2" />
                Back
              </Button>
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

export default InvestorSecondStep;
