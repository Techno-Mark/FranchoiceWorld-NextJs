"use client";
import {
  getCity,
  getIndustry,
  getInvestmentDuration,
  getInvestmentRange,
  getLookingFor,
  getState,
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
import Link from "next/link";
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
  lookingForState: [];
  lookingForCity: [];
  ownProperty: boolean;
  acceptTerms: boolean;
  submitInfo: boolean;
}

function InvestorSecondStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string | null>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>("");
  const [industryOptions, setIndustryOptions] = useState([]);
  const [capitalOptions, setCapitalOptions] = useState([]);
  const [lookingForOptions, setLookingForOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedState, setSelectedState] = useState<any[]>([]);

  const [cityStateMapping, setCityStateMapping] = useState<{
    [cityId: number]: number;
  }>({});
  const fetchDurationOption = async () => {
    try {
      const response = await getInvestmentDuration();
      const formattedInvestedDuration = response.map((duration: any) => ({
        value: duration.id,
        label: duration.name,
      }));
      setDurationOptions(formattedInvestedDuration);
    } catch (error) {
      console.error("Error fetching Investment Duration:", error);
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
      console.error("Error fetching Available Capital:", error);
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
      console.error("Error fetching Industry types:", error);
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
      console.error("Error fetching Looking For:", error);
    }
  };

  const fetchState = async () => {
    try {
      const response = await getState("/dropdown/states");
      const formattedstate = response.map((state: any) => ({
        value: state.id,
        label: state.name,
      }));
      setStateOptions(formattedstate);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCity = async (stateIds: number[]) => {
    try {
      const response = await getCity("/dropdown/cities", {
        stateId: stateIds,
      });
      const formattedCity = response.map((city: any) => ({
        value: city.id,
        label: city.name,
      }));
      setCityOptions(formattedCity);

      const newMapping: { [cityId: number]: number } = {};
      response.forEach((city: any) => {
        newMapping[city.id] = city.stateId;
      });
      setCityStateMapping(newMapping);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchIndustryTypes();
    fetchAvailableCapital();
    fetchLookingFor();
    fetchDurationOption();
    fetchState();
    if (typeof window !== "undefined") {
      setMobileNumber(localStorage.getItem("investorMobileNumber"));
      setSelectedCountry(localStorage.getItem("investorSelectedCountry"));
    }
  }, []);

  const [formValues, setFormValues] = useState<FormValues>({
    countryCode: selectedCountry,
    phoneNumber: mobileNumber,
    industryType: null,
    availableCapital: null,
    needForLoan: false,
    likeToInvest: null,
    lookingFor: null,
    lookingForState: [],
    lookingForCity: [],
    ownProperty: true,
    acceptTerms: true,
    submitInfo: true,
  });

  const handleBackButton = () => {
    router.push(`/investor/step_1`);
  };

  const validationSchema = Yup.object({
    // industryType: Yup.number().required("Industry is required"),
    // availableCapital: Yup.number().required("Available Capital is required"),
    // likeToInvest: Yup.number().required("Investment Time is required"),
    // lookingFor: Yup.number().required("Looking For is required"),
    // lookingForState: Yup.array().min(1, "State is required"),
    // lookingForCity: Yup.array().min(1, "City is required"),
    // acceptTerms: Yup.boolean()
    //   .oneOf([true], "You must agree to submit your form")
    //   .required("You must accept the Terms & Conditions."),
    // submitInfo: Yup.boolean()
    //   .oneOf([true], "You must accept the T&C for future processing data")
    //   .required("You must accept the Terms & Conditions."),
  });

  const handleStateChange = (
    selectedStates: number[],
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue("lookingForState", selectedStates);

    if (selectedStates.length > 0) {
      fetchCity(selectedStates);
    }

    // Update cities based on selected states
    setFieldValue(
      "lookingForCity",
      formValues.lookingForCity?.filter((cityId: any) =>
        selectedStates.includes(cityStateMapping[cityId])
      )
    );
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<FormValues>
  ) => {
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });
    let params = {
      ...values,
      phoneNumber: mobileNumber,
      countryCode: selectedCountry,
      finalSubmit: true,
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
        needForLoan:
          response.needForLoan === true || response.needForLoan === "true",
        availableCapital: response.availableCapital || null,
        likeToInvest: response.likeToInvest || null,
        lookingFor: response.lookingFor || null,
        lookingForState: response.lookingForState || [],
        lookingForCity: response.lookingForCity || [],
        ownProperty:
          response.ownProperty === true || response.ownProperty === "true",
      }));
      setSelectedState([response?.lookingForState]);
      if (selectedState?.length > 0) {
        fetchCity(response?.lookingForState);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (mobileNumber && selectedCountry) {
      fetchData();
    }
  }, [mobileNumber, selectedCountry]);

  useEffect(() => {
    if (selectedState?.length > 0) {
      fetchCity(selectedState);
    }
  }, [selectedState]);

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
              <div className="w-full md:pr-2 mb-6 md:mb-7">
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
              <div className="w-full md:pl-2 mb-6 md:mb-7">
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
              <div className="w-full md:pr-2 mb-6 md:mb-7">
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
              <div className="w-full md:pl-2 mb-6 md:mb-7">
                <label className="block mb-2 font-medium">Need for Loan?</label>
                <div className="mt-4">
                  <Field name="needForLoan">
                    {({ field }: FieldProps) => (
                      <>
                        <RadioButton
                          name={field.name}
                          label="Yes"
                          value="true"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === true || field.value === "true"
                          }
                          onChange={() => setFieldValue("needForLoan", true)}
                        />
                        <RadioButton
                          name={field.name}
                          label="No"
                          value="false"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === false || field.value === "false"
                          }
                          onChange={() => setFieldValue("needForLoan", false)}
                        />
                      </>
                    )}
                  </Field>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="w-full md:pr-2 mb-6 md:mb-7">
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
              <div className="w-full md:pl-2 mb-6 md:mb-7">
                <MultiSelect
                  name="lookingForState"
                  label="Looking For Business in (State)"
                  className={`border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "lookingForState") &&
                    getIn(touched, "lookingForState")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  onChange={(value) => {
                    handleStateChange(value, setFieldValue);
                    setSelectedState(value);
                  }}
                  options={stateOptions}
                />
                {getIn(errors, "lookingForState") &&
                  getIn(touched, "lookingForState") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "lookingForState")}
                    </div>
                  )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="w-full md:pr-2 mb-6 md:mb-7">
                <MultiSelect
                  name="lookingForCity"
                  label="Looking For Business in (City)"
                  className={`border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "lookingForCity") &&
                    getIn(touched, "lookingForCity")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={selectedState?.length > 0 ? cityOptions : []}
                />
                {getIn(errors, "lookingForCity") &&
                  getIn(touched, "lookingForCity") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "lookingForCity")}
                    </div>
                  )}
              </div>
              <div className="w-full md:pl-2 mb-6 md:mb-7">
                <label className="block mb-2 font-medium">
                  Do you own a property?
                </label>
                <div className="mt-4">
                  <Field name="ownProperty">
                    {({ field }: FieldProps) => (
                      <>
                        <RadioButton
                          name={field.name}
                          label="Yes"
                          value="true"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === true || field.value === "true"
                          }
                          onChange={() => setFieldValue("ownProperty", true)}
                        />
                        <RadioButton
                          name={field.name}
                          label="No"
                          value="false"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === false || field.value === "false"
                          }
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
              <div className="flex items-base mb-3">
                <Field name="acceptTerms">
                  {({ field }: FieldProps) => (
                    <>
                      <Field
                        as={Checkbox}
                        id="acceptTerms"
                        name="acceptTerms"
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
                  className="pl-2 leading-none font-semibold"
                >
                  I agree to the{" "}
                  <Link className="underline" href="/term-conditions">
                    Terms & Conditions.
                  </Link>
                </label>
              </div>
              <div className="flex items-base mb-3">
                <Field name="submitInfo">
                  {({ field }: FieldProps) => (
                    <>
                      <Field
                        as={Checkbox}
                        className={`${
                          getIn(errors, "submitInfo") &&
                          getIn(touched, "submitInfo")
                            ? "border-red-500"
                            : ""
                        }`}
                        name="submitInfo"
                        id="submitInfo"
                        defaultChecked={field.value === true}
                      />
                    </>
                  )}
                </Field>
                <label
                  htmlFor="submitInfo"
                  className="pl-2 leading-none font-semibold"
                >
                  I hereby consent to the future processing of my data for
                  marketing and operational purposes.
                </label>
              </div>
              {getIn(errors, "acceptTerms") &&
                getIn(touched, "acceptTerms") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "acceptTerms")}
                  </div>
                )}
              {getIn(errors, "submitInfo") && getIn(touched, "submitInfo") && (
                <div className="text-red-500 font-medium">
                  {getIn(errors, "submitInfo")}
                </div>
              )}
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
                Submit
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
