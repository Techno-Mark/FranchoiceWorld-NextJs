"use client";
import {
  getIndustry,
  getInvestmentDuration,
  getInvestmentRange,
  getLookingFor,
} from "@/api/dropdown";
import { CreateInvestorData, getInvestorData } from "@/api/investor";
import ArrowIcon from "@/assets/icons/arrowIcon";
import Button from "@/components/button/button";
import Checkbox from "@/components/Fields/CheckBox";
import RadioButton from "@/components/Fields/RadioButton";
import MultiSelect from "@/components/select/MultiSelect";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { Field, FieldProps, Form, Formik, FormikHelpers, getIn } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "./step_2.module.css";

interface FormValues {
  countryCode: string | null;
  phoneNumber: string | null;
  industryType: number | null;
  availableCapital: number | null;
  likeToInvest: number | null;
  needForLoan: boolean;
  lookingFor: number | null;
  lookingForState: number[] | null;
  lookingForCity: number[] | null;
  ownProperty: boolean;
}

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
  const [mobileNumber, setMobileNumber] = useState<string | null>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>("");
  const [industryOptions, setIndustryOptions] = useState([]);
  const [capitalOptions, setCapitalOptions] = useState([]);
  const [lookingForOptions, setLookingForOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);

  const fetchDurationOption = async () => {
    try {
      const response = await getInvestmentDuration();
      const formattedInvestedDuration = response.map((duration: any) => ({
        value: duration.id,
        label: duration.name,
      }));
      setDurationOptions(formattedInvestedDuration);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchAvailableCapital = async () => {
    try {
      const response = await getInvestmentRange(
        "/dropdown/min-max-investments"
      );
      const formattedInvestmentRangeTypes = response.map(
        (InvestmentRange: any) => ({
          value: InvestmentRange.id,
          label: InvestmentRange.range,
        })
      );
      setCapitalOptions(formattedInvestmentRangeTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchIndustryTypes = async () => {
    try {
      const response = await getIndustry("/dropdown/categories");
      const formattedIndustryTypes = response.map((industry: any) => ({
        value: industry.id,
        label: industry.name,
      }));
      setIndustryOptions(formattedIndustryTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchLookingFor = async () => {
    try {
      const response = await getLookingFor();
      const fromattedLookingFor = response.map((looking: any) => ({
        value: looking.id,
        label: looking.name,
      }));
      setLookingForOptions(fromattedLookingFor);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  useEffect(() => {
    fetchIndustryTypes();
    fetchAvailableCapital();
    fetchLookingFor();
    fetchDurationOption();
    if (typeof window !== "undefined") {
      setMobileNumber(localStorage.getItem("mobileNumber"));
      setSelectedCountry(localStorage.getItem("selectedCountry"));
    }
  }, []);

  const [formValues, setFormValues] = useState<FormValues>({
    countryCode: selectedCountry,
    phoneNumber: mobileNumber,
    industryType: null,
    availableCapital: null,
    needForLoan: true,
    likeToInvest: null,
    lookingFor: null,
    lookingForState: null,
    lookingForCity: null,
    ownProperty: true,
  });

  const handleBackButton = () => {
    router.push(`/investor/step_1`);
  };

  const validationSchema = Yup.object({
    industryType: Yup.number().required("Industry is required"),
    availableCapital: Yup.number().required("Available Capital is required"),
    likeToInvest: Yup.number().required("Investment Time is required"),
    lookingFor: Yup.number().required("Looking For is required"),
    lookingForState: Yup.number().required("State is required"),
    lookingForCity: Yup.number().required("City is required"),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });
    let params = {
      ...values,
      phoneNumber: mobileNumber,
      countryCode: selectedCountry,
    };
    try {
      const response = await CreateInvestorData(params);
      if (response.ResponseStatus === "success") {
        localStorage.clear();
        router.push(`/thankyou`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchData = async () => {
    try {
      let params = {
        phoneNumber: mobileNumber,
        countryCode: selectedCountry,
      };
      const response = await getInvestorData(params);
      setFormValues((prevValues) => ({
        ...prevValues,
        industryType: response.industryType || null,
        needForLoan: response.needForLoan || true,
        availableCapital: response.availableCapital || null,
        likeToInvest: response.likeToInvest || null,
        lookingFor: response.lookingFor || null,
        lookingForState: response.lookingForState || null,
        lookingForCity: response.lookingForCity || null,
        ownProperty: response.ownProperty || true,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (mobileNumber && selectedCountry) {
      fetchData();
    }
  }, [mobileNumber, selectedCountry]);

  return (
    <>
      <Title
        title="Tell Us What You Are Looking For"
        desc="Enter Your Investment Details"
        descClass="md:!px-0 font-medium text-lg"
        titleClass="md:!pb-2.5"
      />
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="md:mt-16">
            <div className="flex flex-col md:flex-row">
              <div className="w-full pr-2 mb-3 md:mb-6">
                <Select
                  name="industryType"
                  label="Industry Type"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "industryType") &&
                    getIn(touched, "industryType")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={industryOptions}
                />
                {getIn(errors, "industryType") &&
                  getIn(touched, "industryType") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "industryType")}
                    </div>
                  )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
                <Select
                  name="availableCapital"
                  label="Available Capital"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "availableCapital") &&
                    getIn(touched, "availableCapital")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={capitalOptions}
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
                <Select
                  name="likeToInvest"
                  label="How soon would you like to invest?"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "likeToInvest") &&
                    getIn(touched, "likeToInvest")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={durationOptions}
                />
                {getIn(errors, "likeToInvest") &&
                  getIn(touched, "likeToInvest") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "likeToInvest")}
                    </div>
                  )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
                <label className="block mb-2 font-medium">
                  Need for Loan?<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-2">
                  <Field name="needForLoan">
                    {({ field }: FieldProps) => (
                      <>
                        <RadioButton
                          name={field.name}
                          label="Yes"
                          value="true"
                          className={`${styles.RadioBox}`}
                          checked={field.value === true}
                          onChange={() => setFieldValue("needForLoan", true)}
                        />
                        <RadioButton
                          name={field.name}
                          label="No"
                          value="false"
                          className={`${styles.RadioBox}`}
                          checked={field.value === false}
                          onChange={() => setFieldValue("needForLoan", false)}
                        />
                      </>
                    )}
                  </Field>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-half pr-2 mb-3 md:mb-6">
                <Select
                  name="lookingFor"
                  label="Looking For"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "lookingFor") && getIn(touched, "lookingFor")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={lookingForOptions}
                />
                {getIn(errors, "lookingFor") &&
                  getIn(touched, "lookingFor") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "lookingFor")}
                    </div>
                  )}
              </div>
              <div className="w-half pl-2 mb-3 md:mb-6">
                <MultiSelect
                  name="lookingForState"
                  label="Looking For Business in (State)"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "lookingForState") &&
                    getIn(touched, "lookingForState")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={state}
                />
                {getIn(errors, "lookingForState") &&
                  getIn(touched, "lookingForState") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "lookingForState")}
                    </div>
                  )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-half pr-2 mb-3 md:mb-6">
                <MultiSelect
                  name="lookingForCity"
                  label="Looking For Business in (City)"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "lookingForCity") &&
                    getIn(touched, "lookingForCity")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={city}
                />
                {getIn(errors, "lookingForCity") &&
                  getIn(touched, "lookingForCity") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "lookingForCity")}
                    </div>
                  )}
              </div>
              <div className="w-half pl-2 mb-3 md:mb-6">
                <label className="block mb-2 font-medium">
                  Do you own a property?
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="mt-2">
                  <Field name="ownProperty">
                    {({ field }: FieldProps) => (
                      <>
                        <RadioButton
                          name={field.name}
                          label="Yes"
                          value="true"
                          className={`${styles.RadioBox}`}
                          checked={field.value === true}
                          onChange={() => setFieldValue("ownProperty", true)}
                        />
                        <RadioButton
                          name={field.name}
                          label="No"
                          value="false"
                          className={`${styles.RadioBox}`}
                          checked={field.value === false}
                          onChange={() => setFieldValue("ownProperty", false)}
                        />
                      </>
                    )}
                  </Field>
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
