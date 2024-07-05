"use client";
import React from "react";

import styles from "./step_2.module.css";
import Title from "@/components/title/title";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/select/dropdown";
import TextArea from "@/components/Fields/TextArea";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import Select from "@/components/select/Select";
import MultiSelect from "@/components/select/MultiSelect";
import StepLayout from "../layout";
import ArrowIcon from "@/assets/icons/arrowIcon";

interface FormValues {
  brandName: string;
  selectedIndustry: string;
  subCategory: string;
  serviceProduct: string;
  yearFounded: string;
  locationHeadquarters: string;
  outlets: string;
  description: string;
  sellingProposition: string;
  state: [];
  cities: [];
}

function SecondStep() {
  const router = useRouter();

  const Industry = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const initialValues: FormValues = {
    brandName: "",
    selectedIndustry: "",
    subCategory: "",
    serviceProduct: "",
    yearFounded: "",
    locationHeadquarters: "",
    outlets: "",
    description: "",
    sellingProposition: "",
    state: [],
    cities: [],
  };

  const validationSchema = Yup.object({
    brandName: Yup.string().required("Brand Name is required"),
    selectedIndustry: Yup.string().required("Industry is required"),
    subCategory: Yup.string().required("Sub-Category is required"),
    serviceProduct: Yup.string().required("Service/Product is required"),
    yearFounded: Yup.string().required("Year Founded is required"),
    locationHeadquarters: Yup.string().required(
      "Location of Headquarters is required"
    ),
    outlets: Yup.string().required(
      "Current Number of Locations/Outlets is required"
    ),
    description: Yup.string().required("Description is required"),
    sellingProposition: Yup.string().required(
      "Unique Selling Proposition is required"
    ),
    state: Yup.array().min(1, "Please select at least one option"),
    cities: Yup.array().min(1, "Please select at least one option"),
  });
  const handleSubmit = (
    values: typeof initialValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof initialValues>
  ) => {
    // Mark all fields as touched to trigger validation
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    // Call your submission logic here
    console.log("Form submitted:", values);
    router.push("/list-your-brand/step_3");

    // After submission logic, reset submitting state
    setSubmitting(false);
  };

  const handleBackButton = () => {
    router.push("/list-your-brand/step_1");
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
    "selectedIndustry",
    "subCategory",
    "serviceProduct",
    "yearFounded",
    "locationHeadquarters",
    "outlets",
  ];

  const getIn = <T extends object>(obj: T, key: string): any =>
    key.split(".").reduce((o, k) => (o || {})[k], obj as any);

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
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="mt-16">
              <div className="w-full mb-6 md:mb-0">
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
                      : "mb-8"
                  }`}
                />
                {getIn(errors, "brandName") && getIn(touched, "brandName") && (
                  <div className="text-red-500 font-medium mb-2">
                    {getIn(errors, "brandName")}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-2 mb-2 md:grid-cols-2">
                {fields.map((field, index) => (
                  <div className="w-full" key={field}>
                    <Field name={field}>
                      {({ field, form }: FieldProps) => (
                        <>
                          <Select
                            name={field.name}
                            className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center justify-between ${
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
              {["description", "sellingProposition"].map((field) => (
                <div key={field}>
                  <Field
                    as={TextArea}
                    id={field}
                    name={field}
                    label={
                      field === "sellingProposition"
                        ? "Unique Selling Proposition (USP)"
                        : "Description"
                    }
                    placeholder="Your Message"
                    required={true}
                    rows={4}
                    className={`block w-full border resize-none border-[#73727366] rounded-lg py-2 px-4  focus:bg-white focus:border-[#73727366] ${
                      getIn(errors, field) && getIn(touched, field)
                        ? "border-red-500 mb-0.5"
                        : "mb-8"
                    }`}
                  />
                  {getIn(errors, field) && getIn(touched, field) && (
                    <div className="text-red-500 font-medium mb-2">
                      {getIn(errors, field)}
                    </div>
                  )}
                </div>
              ))}
              {["state", "cities"].map((field) => (
                <div key={field}>
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
              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  className="rounded-md text-base font-medium flex items-center !py-4 !px-5"
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
                  className="rounded-md text-base font-medium flex items-center !py-4 !px-5"
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
