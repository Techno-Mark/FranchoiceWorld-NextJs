"use client";

import ArrowIcon from "@/assets/icons/arrowIcon";
import InputField from "@/components/Fields/InputField";
import TextArea from "@/components/Fields/TextArea";
import Button from "@/components/button/button";
import MultiSelect from "@/components/select/MultiSelect";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";
import styles from "./step_2.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

interface FormValues {
  phoneNumber: string;
  countryCode: string;
  brandName: string;
  industry: number | null;
  subCategory: number | null;
  service: number | null;
  yearFounded: number | null;
  headquartersLocation: number | null;
  numberOfLocations: number | null;
  brandDescription: string;
  usp: string;
  state: [];
  city: [];
}

function SecondStep() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const Industry = [
    { value: 1, label: "Option 1" },
    { value: 2, label: "Option 2" },
    { value: 3, label: "Option 3" },
  ];

  const phoneNumber = searchParams.get("phoneNumber") || "";
  const countryCode = searchParams.get("countryCode") || "";
  const [formValues, setFormValues] = useState<FormValues>();

  const initialValues: FormValues = {
    phoneNumber: phoneNumber,
    countryCode: countryCode,
    brandName: "",
    industry: formValues.industry,
    subCategory: null,
    service: null,
    yearFounded: null,
    headquartersLocation: null,
    numberOfLocations: null,
    brandDescription: "",
    usp: "",
    state: [],
    city: [],
  };

  console.log("🚀 ~ ThirdStep ~ formValues:", formValues);

  useEffect(() => {
    const fetchData = async () => {
      const phoneNumber = searchParams.get("phoneNumber") || "";
      const countryCode = searchParams.get("countryCode") || "";
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/form-details/get`,
          {
            phoneNumber,
            countryCode,
          }
        );
        const data = response.data?.ResponseData;
        setFormValues((prevValues) => ({
          ...prevValues,
          brandName: data?.brandName || "",
          industry: data?.industry || null,
          email: data?.email || "",
          companyName: data?.companyName || "",
          websiteURL: data?.websiteURL || "",
          // Add other fields as needed
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchParams]);

  const validationSchema = Yup.object({
    brandName: Yup.string().required("Brand Name is required"),
    industry: Yup.number().required("Industry is required"),
    subCategory: Yup.string().required("Sub-Category is required"),
    service: Yup.string().required("Service/Product is required"),
    yearFounded: Yup.string().required("Year Founded is required"),
    headquartersLocation: Yup.string().required(
      "Location of Headquarters is required"
    ),
    numberOfLocations: Yup.string().required(
      "Current Number of Locations/Outlets is required"
    ),
    brandDescription: Yup.string().required("Description is required"),
    usp: Yup.string().required("Unique Selling Proposition is required"),
    state: Yup.array().min(1, "Please select at least one option"),
    city: Yup.array().min(1, "Please select at least one option"),
  });
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof initialValues>
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
          phoneNumber: values.phoneNumber,
          countryCode: values.countryCode,
        }
      );
      console.log("Form submitted successfully:", response.data);
      router.push(
        `/list-your-brand/step_3?phoneNumber=${encodeURIComponent(
          values.phoneNumber
        )}&countryCode=${encodeURIComponent(values.countryCode)}`
      );
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackButton = () => {
    router.push(
      `/list-your-brand/step_1?phoneNumber=${encodeURIComponent(
        phoneNumber
      )}&countryCode=${encodeURIComponent(countryCode)}`
    );
  };

  const label = [
    "Industry",
    "Sub-Category",
    "Service/Product",
    "Year Founded",
    "Location of Headquarters",
    "Current Number of Locations/Outlets",
  ];

  const fields = [
    "industry",
    "subCategory",
    "service",
    "yearFounded",
    "headquartersLocation",
    "numberOfLocations",
  ];

  const getIn = <T extends object>(obj: T, key: string): any =>
    key.split(".").reduce((o, k) => (o || {})[k], obj as any);

  useEffect(() => {
    const fetchData = async () => {
      const phoneNumber = searchParams.get("phoneNumber") || "";
      const countryCode = searchParams.get("countryCode") || "";
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/form-details/get`,
          {
            phoneNumber,
            countryCode,
          }
        );
        const data = response.data?.ResponseData;
        setFormValues((prevValues) => ({
          ...prevValues,
          brandName: data?.brandName || "",
          industry: data?.industry || 0,
          companyName: data?.companyName || "",
          websiteURL: data?.websiteURL || "",
          // Add other fields as needed
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call fetchData when component mounts or when phoneNumber or countryCode changes
    fetchData();
  }, [searchParams, setFormValues]);

  return (
    <>
      <div className={`${styles.formPart} px-3`}>
        <Title
          title="Showcase Your Brand's Identity"
          desc="Essential Details Required"
          descClass="md:!px-0"
          titleClass="md:!pb-2.5"
        />
        <Formik<FormValues>
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-16">
              <div className="w-full mb-3 md:mb-6">
                <Field
                  as={InputField}
                  id="brandName"
                  name="brandName"
                  type="text"
                  label="Brand Name"
                  required={true}
                  className={`block w-full border border-[#73727366] rounded-lg py-2 px-4  focus:bg-white focus:border-[#73727366] ${
                    getIn(errors, "brandName") && getIn(touched, "brandName")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {getIn(errors, "brandName") && getIn(touched, "brandName") && (
                  <div className="text-red-500 font-medium mb-2">
                    {getIn(errors, "brandName")}
                  </div>
                )}
              </div>
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
              {["brandDescription", "usp"].map((field) => (
                <div className="w-full mb-3 md:mb-6" key={field}>
                  <Field
                    as={TextArea}
                    id={field}
                    name={field}
                    label={
                      field === "usp"
                        ? "Unique Selling Proposition (USP)"
                        : "Description"
                    }
                    placeholder="Your Message"
                    required={true}
                    rows={4}
                    className={`block w-full border resize-none border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none ${
                      getIn(errors, field) && getIn(touched, field)
                        ? "border-red-500 mb-0.5"
                        : ""
                    }`}
                  />
                  {getIn(errors, field) && getIn(touched, field) && (
                    <div className="text-red-500 font-medium mb-2">
                      {getIn(errors, field)}
                    </div>
                  )}
                </div>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {["state", "city"].map((field) => (
                  <div
                    className={`w-full mb-3 md:even:pl-2 md:odd:pr-2 md:mb-6`}
                    key={field}
                  >
                    <Field name={field}>
                      {({ field, form }: FieldProps) => (
                        <>
                          <MultiSelect
                            name={field.name}
                            className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center ${
                              getIn(errors, field.name) &&
                              getIn(touched, field.name)
                                ? "border-red-500 mb-0.5"
                                : ""
                            }`}
                            label={
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1).replace(/([A-Z])/g, " $1")
                            }
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
