"use client";

import ArrowIcon from "@/assets/icons/arrowIcon";
import TextArea from "@/components/Fields/TextArea";
import Button from "@/components/button/button";
import MultiSelect from "@/components/select/MultiSelect";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import styles from "./step_3.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useListBrand } from "@/contexts/ListBrandContext";
import { updateStepProgress } from "@/utills/stepProgress";
import {
  getAreaRequired,
  getInvestmentRange,
  getPaybackProvide,
  getSalesRevanue,
  getSupportProvide,
} from "@/api/dropdown";
import InputField from "@/components/Fields/InputField";

interface FormValues {
  phoneNumber: string | null;
  countryCode: string | null;
  areaRequired: number | null;
  investmentRange: number | null;
  franchiseFee: number | null;
  salesRevenueModel: number | null;
  roi: number | null;
  paybackPeriod: number | null;
  supportProvided: [];

  othersApplicable: string;
  franchiseAgreement: number | null;
  franchiseDuration: number | null;
  isRenewable: number | null;
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
    { value: 0, label: "No" },
  ];

  const [formValues, setFormValues] = useState<FormValues>({
    phoneNumber: mobileNumber,
    countryCode: selectedCountry,
    areaRequired: null,
    investmentRange: null,
    franchiseFee: null,
    salesRevenueModel: null,
    roi: null,
    paybackPeriod: null,
    supportProvided: [],
    othersApplicable: "",
    franchiseAgreement: null,
    franchiseDuration: null,
    isRenewable: null,
  });

  const OptionMap: OptionsMapType = {
    areaRequired: areaRequiredOptions,
    investmentRange: invstmentRangeOptions,
    franchiseFee: Industry,
    salesRevenueModel: salesRevanueOptions,
    roi: [],
    paybackPeriod: paybackProvideOptions,
    supportProvided: supportProvideOptions,
    franchiseAgreement: [],
    franchiseDuration: [],
    isRenewable: [],
  };

  const validationSchema = Yup.object({
    areaRequired: Yup.number().nullable().required("Area Required is required"),
    investmentRange: Yup.number()
      .nullable()
      .required("Total Initial Investment Range is required"),
    franchiseFee: Yup.number()
      .typeError("Franchise Fee must be a number")
      .nullable()
      .required("Franchise Fee is required")
      .min(0, "Franchise Fee must be a positive number"),
    salesRevenueModel: Yup.number()
      .nullable()
      .required("Sales and Revenue Model is required"),
    roi: Yup.number()
      .typeError("Anticipated % Return on Investment (ROI) must be a number")
      .nullable()
      .required("Anticipated % Return on Investment (ROI) is required"),
    paybackPeriod: Yup.number()
      .nullable()
      .required("Likely Payback Period for a Unit Franchise is required"),
    supportProvided: Yup.array().min(1, "Please select at least one option"),

    franchiseAgreement: Yup.number()
      .nullable()
      .required("Do you have a franchise agreement? is required"),
    franchiseDuration: Yup.number()
      .typeError("How long is the franchise for must be a number")
      .nullable()
      .required("How long is the franchise for? is required")
      .min(0, "How long is the franchise for must be a positive number"),
    isRenewable: Yup.number()
      .nullable()
      .required("Is the term renewable? is required"),
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
        `${process.env.NEXT_PUBLIC_API_URL}/form-details/create`,
        {
          ...values,
          franchiseAgreement:
            values.franchiseAgreement === 1 ? "true" : "false",
          isRenewable: values.isRenewable === 1 ? "true" : "false",
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
    "Area Required",
    "Total Initial Investment Range",
    "Franchise Fee",
    "Sales and Revenue Model",
    "Anticipated % Return on Investment (ROI)",
    "Likely Payback Period for a Unit Franchise",
  ];

  const fields = [
    "areaRequired",
    "investmentRange",
    "franchiseFee",
    "salesRevenueModel",
    "roi",
    "paybackPeriod",
  ];

  const multiselectLabel = [
    "Do you have a franchise agreement?",
    "How long is the franchise for?",
    "Is the term renewable?",
  ];

  const multiselectFields = [
    "franchiseAgreement",
    "franchiseDuration",
    "isRenewable",
  ];

  const fetchAreaRequiredTypes = async () => {
    try {
      const response = await getAreaRequired("/dropdown/area-required");
      // Convert the fetched data to the format expected by your Select component
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
      // Convert the fetched data to the format expected by your Select component
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
      // Convert the fetched data to the format expected by your Select component
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
      // Convert the fetched data to the format expected by your Select component
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
      // Convert the fetched data to the format expected by your Select component
      const formattedSupportProvideTypes = response.map((support: any) => ({
        value: support.id,
        label: support.name,
      }));
      setSupportProvideOptions(formattedSupportProvideTypes);
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
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/form-details/get`,
          {
            phoneNumber: mobileNumber,
            countryCode: selectedCountry,
          }
        );
        const data = response.data?.ResponseData;
        setFormValues((prevValues) => ({
          ...prevValues,
          areaRequired: data?.areaRequired || null,
          investmentRange: data?.investmentRange || null,
          franchiseFee: Number(data?.franchiseFee) || null,
          salesRevenueModel: data?.salesRevenueModel || null,
          roi: data?.roi || null,
          paybackPeriod: data?.paybackPeriod || null,
          supportProvided: data?.supportProvided || [],
          otherApplicable: data?.otherApplicable || "",
          franchiseAgreement: data?.franchiseAgreement === true ? 1 : 0 || null,
          franchiseDuration: data?.franchiseDuration || null,
          isRenewable: data?.isRenewable === true ? 1 : 0 || null,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
          descClass="md:!px-0"
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
            <Form className="mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {fields.map((field, index) => (
                  <div
                    className={`w-full mb-3 md:even:pl-2 md:odd:pr-2 md:mb-6`}
                    key={field}
                  >
                    <Field name={field}>
                      {({ field: fieldProps, form }: FieldProps) => (
                        <>
                          {field === "franchiseFee" || field === "roi" ? (
                            <Field name={field}>
                              {({ field, form, meta }: FieldProps) => (
                                <InputField
                                  label={label[index]}
                                  id={field.name}
                                  required
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
              <div className="w-full mb-3 md:mb-6">
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
              <div className="w-full mb-3 md:mb-6">
                <Field
                  as={TextArea}
                  name="otherApplicable"
                  label="Others if applicable"
                  placeholder="Your Message"
                  rows={3}
                  className={`block w-full border resize-none border-[#73727366] rounded-lg py-2 px-4 mb-3 focus:bg-white focus:border-[#73727366]`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {multiselectFields.map((field, index) => (
                  <div
                    className={`w-full mb-3 md:even:pl-2 md:odd:pr-2 md:mb-6`}
                    key={field}
                  >
                    <Field name={field}>
                      {({ field, form }: FieldProps) => (
                        <>
                          {field.name === "franchiseDuration" ? (
                            <Field name="franchiseDuration">
                              {({ field, form, meta }: FieldProps) => (
                                <InputField
                                  label={label[index]}
                                  id="franchiseDuration"
                                  required
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
                                    form.setFieldValue(
                                      "franchiseDuration",
                                      value
                                    );
                                  }}
                                  className={`w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg focus:outline-none ${
                                    meta.touched && meta.error
                                      ? "border-red-500 mb-0.5"
                                      : ""
                                  }`}
                                />
                              )}
                            </Field>
                          ) : (
                            <Select
                              name={field.name}
                              className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center justify-between ${
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
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
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
