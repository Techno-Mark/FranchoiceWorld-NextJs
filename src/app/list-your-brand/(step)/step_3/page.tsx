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

function SecondStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

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

  const validationSchema = Yup.object({
    areaRequired: Yup.number().nullable().required("Area Required is required"),
    investmentRange: Yup.number()
      .nullable()
      .required("Total Initial Investment Range is required"),
    franchiseFee: Yup.number().nullable().required("Franchise Fee is required"),
    salesRevenueModel: Yup.number()
      .nullable()
      .required("Sales and Revenue Model is required"),
    roi: Yup.number()
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
      .nullable()
      .required("How long is the franchise for? is required"),
    isRenewable: Yup.number()
      .nullable()
      .required("Is the term renewable? is required"),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
    // Mark all fields as touched to trigger validation
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/form-details/create`,
        {
          ...values,
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
          franchiseFee: data?.franchiseFee || null,
          salesRevenueModel: data?.salesRevenueModel || null,
          roi: data?.roi || null,
          paybackPeriod: data?.paybackPeriod || null,
          supportProvided: data?.supportProvided || [],
          otherApplicable: data?.otherApplicable || "",
          franchiseAgreement: data?.franchiseAgreement || null,
          franchiseDuration: data?.franchiseDuration || null,
          isRenewable: data?.isRenewable || null,
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
                      {({ field, form }: FieldProps) => (
                        <>
                          <Select
                            name={field.name}
                            className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-full items-center justify-between ${
                              getIn(errors, field.name) &&
                              getIn(touched, field.name)
                                ? "border-red-500 mb-0.5"
                                : ""
                            }`}
                            label={label[index]}
                            options={Industry}
                          />
                          {getIn(errors, field.name) &&
                            getIn(touched, field.name) && (
                              <div className="text-red-500 font-medium">
                                {getIn(errors, field.name)}
                              </div>
                            )}
                        </>
                      )}
                    </Field>
                  </div>
                ))}
              </div>
              <div className="w-full mb-3 md:mb-6">
                <Field
                  as={MultiSelect}
                  name="supportProvided"
                  label="Support Provided to Franchisees"
                  className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center ${
                    getIn(errors, "supportProvided") &&
                    getIn(touched, "supportProvided")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={Industry}
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
                          <Select
                            name={field.name}
                            className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center justify-between ${
                              getIn(errors, field.name) &&
                              getIn(touched, field.name)
                                ? "border-red-500 mb-0.5"
                                : ""
                            }`}
                            label={multiselectLabel[index]}
                            options={Industry}
                          />
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
                  Next
                  <ArrowIcon color="white" className="rotate-180 ml-2" />
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
