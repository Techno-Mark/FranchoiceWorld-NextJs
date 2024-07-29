"use client";

import {
  getAreaRequired,
  getFranchiseDuration,
  getInvestmentRange,
  getPaybackProvide,
  getSalesRevanue,
  getSupportProvide,
} from "@/api/dropdown";
import ArrowIcon from "@/assets/icons/arrowIcon";
import SpinnerLoader from "@/assets/icons/spinner";
import InputField from "@/components/Fields/InputField";
import TextArea from "@/components/Fields/TextArea";
import Button from "@/components/button/button";
import MultiSelect from "@/components/select/MultiSelect";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { updateStepProgress } from "@/utills/stepProgress";
import axios from "axios";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import styles from "./step_3.module.css";
import RadioButton from "@/components/Fields/RadioButton";

interface FormValues {
  phoneNumber: string | null;
  countryCode: string | null;
  areaRequired: number | null;
  investmentRange: number | null;
  franchiseFee: number | null;
  salesRevenueModel: [];
  // roi: number | null;
  paybackPeriod: number | null;
  supportProvided: [];
  otherApplicable: string;
  franchiseAgreement: number | null;
  franchiseDuration: number | null;
  isRenewable: number | null;
  isOperatingManual: boolean;
  trainingLocation: boolean;
  isAssistanceAvailable: boolean;
  isITSystemIncluded: boolean;
  isExpertGuidance: boolean;
  tenurePeriod: number | null;
}

interface OptionType {
  value: number;
  label: string;
}

interface OptionsMapType {
  [key: string]: OptionType[];
}

function SecondStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [areaRequiredOptions, setAreaRequiredOptions] = useState<OptionType[]>(
    []
  );
  const [invstmentRangeOptions, setInvstmentRangeOptions] = useState<
    OptionType[]
  >([]);

  const [salesRevanueOptions, setSalesRevanueOptions] = useState<OptionType[]>(
    []
  );

  const [paybackProvideOptions, setPaybackProvideOptions] = useState<
    OptionType[]
  >([]);

  const [supportProvideOptions, setSupportProvideOptions] = useState<
    OptionType[]
  >([]);

  const [franchiseOptions, setFranchiseDurationOptions] = useState<
    OptionType[]
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobileNumber(localStorage.getItem("mobileNumber"));
      setSelectedCountry(localStorage.getItem("selectedCountry"));
    }
  }, []);

  const Industry = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  const Options = [
    { value: 1, label: "Yes" },
    { value: 2, label: "No" },
  ];

  const [formValues, setFormValues] = useState<FormValues>({
    phoneNumber: mobileNumber,
    countryCode: selectedCountry,
    areaRequired: null,
    investmentRange: null,
    franchiseFee: null,
    salesRevenueModel: [],
    // roi: null,
    paybackPeriod: null,
    supportProvided: [],
    otherApplicable: "",
    franchiseAgreement: null,
    franchiseDuration: null,
    isRenewable: null,
    isOperatingManual: true,
    trainingLocation: true,
    isAssistanceAvailable: true,
    isITSystemIncluded: true,
    isExpertGuidance: true,
    tenurePeriod: null,
  });

  const OptionMap: OptionsMapType = {
    areaRequired: areaRequiredOptions,
    investmentRange: invstmentRangeOptions,
    franchiseFee: Industry,
    salesRevenueModel: salesRevanueOptions,
    roi: [],
    paybackPeriod: paybackProvideOptions,
    tenurePeriod: paybackProvideOptions,
    supportProvided: supportProvideOptions,
    franchiseAgreement: Options,
    franchiseDuration: franchiseOptions,
    isRenewable: Options,
  };

  const validationSchema = Yup.object({
    // areaRequired: Yup.number().nullable().required("Area Required is required"),
    // investmentRange: Yup.number()
    //   .nullable()
    //   .required("Total Initial Investment Range is required"),
    franchiseFee: Yup.number()
      .typeError("Franchise Fee must be a number")
      .nullable()
      // .required("Franchise Fee is required")
      .min(0, "Franchise Fee must be a positive number")
      .test(
        "maxDigits",
        "Franchise Fee cannot have more than 15 digits",
        (value) => !value || value.toString().replace(/\D/g, "").length <= 15
      ),
    // salesRevenueModel: Yup.array().min(1, "Please select at least one option"),
    // roi: Yup.number()
    //   .typeError("Anticipated % Return on Investment (ROI) must be a number")
    //   .nullable()
    //   .min(0, "ROI must be a positive number")
    //   .max(100, "ROI cannot be more than 100%"),
    // .required("Anticipated % Return on Investment (ROI) is required")
    paybackPeriod: Yup.number().nullable(),
    // .required("Likely Payback Period for a Unit Franchise is required"),
    // supportProvided: Yup.array().min(1, "Please select at least one option"),

    // franchiseAgreement: Yup.number()
    //   .nullable()
    //   .required("Do you have a franchise agreement? is required"),
    franchiseDuration: Yup.number()
      .typeError("How long is the franchise for must be a number")
      .nullable()
      .min(0, "How long is the franchise for must be a positive number"),
    // .required("How long is the franchise for? is required")
    isRenewable: Yup.number().nullable(),
    // .required("Is the term renewable? is required"),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
    setIsSubmitting(true);
    // Mark all fields as touched to trigger validation
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/form-details/create`,
        {
          ...values,
          franchiseAgreement: values.franchiseAgreement === 1 ? true : false,
          isRenewable: values.isRenewable === 1 ? true : false,
          phoneNumber: mobileNumber,
          countryCode: selectedCountry,
        }
      );
      updateStepProgress("/list-your-brand/step_4");
      router.push(`/list-your-brand/step_4`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  const handleBackButton = () => {
    router.push(`/list-your-brand/step_2`);
  };

  const getIn = <T extends object>(obj: T, key: string): any =>
    key.split(".").reduce((o, k) => (o || {})[k], obj as any);

  const label = [
    "Area Required( Sq.ft )",
    "Total Initial Investment Range",
    "Franchise Fee(in INR)",
    "Sales and Revenue Model",
    // "Anticipated % Return on Investment (ROI)",
    "Likely Payback Period for a Unit Franchise",
    "Lock In Tenure period",
  ];

  const fields = [
    "areaRequired",
    "investmentRange",
    "franchiseFee",
    "salesRevenueModel",
    // "roi",
    "paybackPeriod",
    "tenurePeriod",
  ];

  const multiselectLabel = [
    // "Do you have a franchise agreement?",
    "How long is the franchise for(in years)?",
    "Is the term renewable?",
  ];

  const multiselectFields = [
    // "franchiseAgreement",
    "franchiseDuration",
    "isRenewable",
  ];

  const fetchAreaRequiredTypes = async () => {
    try {
      const response = await getAreaRequired("/dropdown/area-required");
      const formattedAreaRequiredTypes = response.map((Area: any) => ({
        value: Area.id,
        label: Area.name,
      }));
      setAreaRequiredOptions(formattedAreaRequiredTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchInvestmentRangeTypes = async () => {
    try {
      const response = await getInvestmentRange(
        "/dropdown/investment-durations"
      );
      const formattedInvestmentRangeTypes = response.map(
        (InvestmentRange: any) => ({
          value: InvestmentRange.id,
          label: InvestmentRange.name,
        })
      );
      setInvstmentRangeOptions(formattedInvestmentRangeTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchSalaesRevanueTypes = async () => {
    try {
      const response = await getSalesRevanue(
        "/dropdown/sales-and-revenue-model"
      );
      const formattedSalesRevanueTypes = response.map((salesRevanue: any) => ({
        value: salesRevanue.id,
        label: salesRevanue.name,
      }));
      setSalesRevanueOptions(formattedSalesRevanueTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchPaybackProvideTypes = async () => {
    try {
      const response = await getPaybackProvide("/dropdown/payback-periods");
      const formattedPaybackProvideTypes = response.map((payback: any) => ({
        value: payback.id,
        label: payback.name,
      }));
      setPaybackProvideOptions(formattedPaybackProvideTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchSupportProvideTypes = async () => {
    try {
      const response = await getSupportProvide("/dropdown/provided-supports");
      const formattedSupportProvideTypes = response.map((support: any) => ({
        value: support.id,
        label: support.name,
      }));
      setSupportProvideOptions(formattedSupportProvideTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchFranchiseDurationTypes = async () => {
    try {
      const response = await getFranchiseDuration(
        "/dropdown/franchise-durations"
      );
      const formattedFranchiseDurationTypes = response.map((duration: any) => ({
        value: duration.id,
        label: duration.name,
      }));
      setFranchiseDurationOptions(formattedFranchiseDurationTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  useEffect(() => {
    fetchAreaRequiredTypes();
    fetchInvestmentRangeTypes();
    fetchSalaesRevanueTypes();
    fetchPaybackProvideTypes();
    fetchSupportProvideTypes();
    fetchFranchiseDurationTypes();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/form-details/get`,
        {
          phoneNumber: mobileNumber,
          countryCode: selectedCountry,
        }
      );
      const data = response.data.ResponseData;
      setFormValues((prevValues) => ({
        ...prevValues,
        email: "email@eemail.com",
        areaRequired: data?.areaRequired || null,
        investmentRange: data?.investmentRange || null,
        franchiseFee: Number(data?.franchiseFee) || null,
        salesRevenueModel: data?.salesRevenueModel || [],
        // roi: data?.roi || null,
        paybackPeriod: data?.paybackPeriod || null,
        supportProvided: data?.supportProvided || [],
        otherApplicable: data?.otherApplicable || "",
        franchiseAgreement: data.franchiseAgreement === true ? 1 : 2 || null,
        franchiseDuration: data.franchiseDuration || null,
        isRenewable: data.isRenewable === true ? 1 : 2 || null,
        isOperatingManual:
          data.isOperatingManual === true || data.isOperatingManual === "true",
        trainingLocation:
          data.trainingLocation === true || data.trainingLocation === "true",
        isAssistanceAvailable:
          data.isAssistanceAvailable === true ||
          data.isAssistanceAvailable === "true",
        isITSystemIncluded:
          data.isITSystemIncluded === true ||
          data.isITSystemIncluded === "true",
        isExpertGuidance:
          data.isExpertGuidance === true || data.isExpertGuidance === "true",
        tenurePeriod: data.tenurePeriod,
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
      <div className={`${styles.formPart} px-3`}>
        <Title
          title="What It Takes to Join Your Franchise"
          desc="Investment Details Needed"
          descClass="md:!px-0 pb-8 font-medium text-xl"
          titleClass="md:!pb-2.5"
        />
        <Formik<FormValues>
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="md:mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {fields.map((field, index) => (
                  <div
                    className={`w-full mb-8 md:even:pl-2 md:odd:pr-2 md:mb-7`}
                    key={field}
                  >
                    <Field name={field}>
                      {({ field: fieldProps, form }: FieldProps) => (
                        <>
                          {field === "franchiseFee" ? (
                            <Field name={field}>
                              {({ field, form, meta }: FieldProps) => (
                                <InputField
                                  label={label[index]}
                                  id={field.name}
                                  type="number"
                                  {...field}
                                  value={field.value ?? ""}
                                  onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    const value =
                                      e.target.value === ""
                                        ? null
                                        : Number(e.target.value);
                                    form.setFieldValue(field.name, value);
                                  }}
                                  className={`w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg focus:outline-none ${
                                    meta.touched && meta.error
                                      ? "border-red-500 mb-0.5"
                                      : ""
                                  }`}
                                />
                              )}
                            </Field>
                          ) : field === "salesRevenueModel" ? (
                            <MultiSelect
                              name="salesRevenueModel"
                              className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center ${
                                getIn(errors, field) && getIn(touched, field)
                                  ? "border-red-500 mb-0.5"
                                  : ""
                              }`}
                              label="Sales and Revenue Model"
                              options={OptionMap["salesRevenueModel"] || []}
                            />
                          ) : (
                            <Select
                              name={fieldProps.name}
                              className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-full items-center justify-between ${
                                getIn(errors, field) && getIn(touched, field)
                                  ? "border-red-500 mb-0.5"
                                  : ""
                              }`}
                              label={label[index]}
                              options={OptionMap[field] || []}
                            />
                          )}
                          {getIn(errors, field) && getIn(touched, field) && (
                            <div className="text-red-500 font-medium">
                              {getIn(errors, field)}
                            </div>
                          )}
                        </>
                      )}
                    </Field>
                  </div>
                ))}
              </div>
              <div className="w-full mb-8 md:mb-7">
                <MultiSelect
                  name="supportProvided"
                  label="Support Provided to Franchisees"
                  className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center ${
                    getIn(errors, "supportProvided") &&
                    getIn(touched, "supportProvided")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={OptionMap["supportProvided"] || []}
                />
                {getIn(errors, "supportProvided") &&
                  getIn(touched, "supportProvided") && (
                    <div className="text-red-500 font-medium mb-2">
                      {getIn(errors, "supportProvided")}
                    </div>
                  )}
              </div>
              <div className="w-full mb-8 md:mb-7">
                <Field
                  as={TextArea}
                  name="otherApplicable"
                  label="Others if applicable"
                  placeholder="Your Message"
                  rows={3}
                  className={`block w-full border border-[#73727366] rounded-lg py-2 px-4  focus:bg-white focus:outline-none`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {multiselectFields.map((field, index) => (
                  <div
                    className={`w-full mb-8 md:mb-7 md:even:pl-2 md:odd:pr-2 `}
                    key={field}
                  >
                    <Field name={field}>
                      {({ field, form }: FieldProps) => (
                        <>
                          {field.name === "franchiseDuration" ? (
                            <Field name="franchiseDuration">
                              {({ field, form, meta }: FieldProps) => (
                                <Select
                                  name={field.name}
                                  className={`flex  w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center justify-between ${
                                    getIn(errors, field.name) &&
                                    getIn(touched, field.name)
                                      ? "border-red-500 mb-0.5"
                                      : ""
                                  }`}
                                  label={multiselectLabel[index]}
                                  options={OptionMap["franchiseDuration"] || []}
                                />
                              )}
                            </Field>
                          ) : (
                            <Select
                              name={field.name}
                              className={`flex  w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center justify-between ${
                                getIn(errors, field.name) &&
                                getIn(touched, field.name)
                                  ? "border-red-500 mb-0.5"
                                  : ""
                              }`}
                              label={multiselectLabel[index]}
                              options={Options}
                            />
                          )}

                          {getIn(errors, field.name) &&
                            getIn(touched, field.name) && (
                              <div className="text-red-500 font-medium mb-2">
                                {getIn(errors, field.name)}
                              </div>
                            )}
                        </>
                      )}
                    </Field>
                  </div>
                ))}
              </div>

              {/* For radio button */}
              <div className=" mt-1 grid grid-cols-1 md:grid-cols-2">
                <div className={`w-full mb-8 md:even:pl-2 md:odd:pr-2 md:mb-7`}>
                  <label className="block mb-2 font-medium">
                    Detailed operating manuals for franchisees
                  </label>
                  <Field name="isOperatingManual">
                    {({ field }: FieldProps) => (
                      <>
                        <RadioButton
                          name={field.name}
                          label="Yes"
                          value="true"
                          labelClassName="inline-flex items-center mr-11"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === true || field.value === "true"
                          }
                          onChange={() =>
                            setFieldValue("isOperatingManual", true)
                          }
                        />
                        <RadioButton
                          name={field.name}
                          label="No"
                          value="false"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === false || field.value === "false"
                          }
                          onChange={() =>
                            setFieldValue("isOperatingManual", false)
                          }
                        />
                      </>
                    )}
                  </Field>
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Franchisee training location
                  </label>
                  <Field name="trainingLocation">
                    {({ field }: FieldProps) => (
                      <>
                        <RadioButton
                          name={field.name}
                          label="Head office"
                          value="true"
                          labelClassName="inline-flex items-center mr-11"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === true || field.value === "true"
                          }
                          onChange={() =>
                            setFieldValue("trainingLocation", true)
                          }
                        />
                        <RadioButton
                          name={field.name}
                          label="Online/HQ"
                          value="false"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === false || field.value === "false"
                          }
                          onChange={() =>
                            setFieldValue("trainingLocation", false)
                          }
                        />
                      </>
                    )}
                  </Field>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2">
                <div className={`w-full mb-8 md:even:pl-2 md:odd:pr-2 md:mb-7`}>
                  <label className="block mb-2 font-medium">
                    Is field assistance available for franchisee?
                  </label>
                  <Field name="isAssistanceAvailable">
                    {({ field }: FieldProps) => (
                      <>
                        <RadioButton
                          name={field.name}
                          label="Yes"
                          value="true"
                          labelClassName="inline-flex items-center mr-11"
                          className={`${styles.RadioBox} `}
                          checked={
                            field.value === true || field.value === "true"
                          }
                          onChange={() =>
                            setFieldValue("isAssistanceAvailable", true)
                          }
                        />
                        <RadioButton
                          name={field.name}
                          label="No"
                          value="false"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === false || field.value === "false"
                          }
                          onChange={() =>
                            setFieldValue("isAssistanceAvailable", false)
                          }
                        />
                      </>
                    )}
                  </Field>
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Current IT systems will be included in the franchise
                  </label>
                  <Field name="isITSystemIncluded">
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
                          onChange={() =>
                            setFieldValue("isITSystemIncluded", true)
                          }
                        />
                        <RadioButton
                          name={field.name}
                          label="No"
                          value="false"
                          className={`${styles.RadioBox}`}
                          checked={
                            field.value === false || field.value === "false"
                          }
                          onChange={() =>
                            setFieldValue("isITSystemIncluded", false)
                          }
                        />
                      </>
                    )}
                  </Field>
                </div>
              </div>

              <div className="w-full mt-3 mb-8 ">
                <label className="block mb-2 font-medium">
                  Expert guidance from Head Office to franchisee in opening the
                  franchise
                </label>
                <Field name="isExpertGuidance">
                  {({ field }: FieldProps) => (
                    <>
                      <RadioButton
                        name={field.name}
                        label="Yes"
                        value="true"
                        labelClassName="inline-flex items-center mr-11"
                        className={`${styles.RadioBox}`}
                        checked={field.value === true || field.value === "true"}
                        onChange={() => setFieldValue("isExpertGuidance", true)}
                      />
                      <RadioButton
                        name={field.name}
                        label="No"
                        value="false"
                        className={`${styles.RadioBox}`}
                        checked={
                          field.value === false || field.value === "false"
                        }
                        onChange={() =>
                          setFieldValue("isExpertGuidance", false)
                        }
                      />
                    </>
                  )}
                </Field>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  className="rounded-md text-base font-semibold flex items-center !py-4 !px-5"
                  onClick={handleBackButton}
                >
                  <ArrowIcon
                    color="rgba(115, 114, 115, 0.3)"
                    className="mr-2"
                  />
                  Back
                </Button>
                <Button
                  variant="highlighted"
                  type="submit"
                  className="rounded-md text-base font-semibold flex items-center !py-4 !px-5"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerLoader />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowIcon color="white" className="rotate-180 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SecondStep;
