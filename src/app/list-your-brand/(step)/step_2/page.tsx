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
                <Button className="border border-customBorder rounded-lg">
                  <div className="flex whitespace-nowrap p-2 gap-2 items-center">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.48872 0.547607C14.4059 0.547607 18.4761 4.54785 18.4761 9.46502C18.4761 14.3822 14.4059 18.4524 9.48872 18.4524C4.57156 18.4524 0.571314 14.3822 0.571314 9.46502C0.571314 4.54785 4.57156 0.547607 9.48872 0.547607ZM6.27423 9.92236L11.0425 14.6907C11.2721 14.9203 11.6443 14.9203 11.8739 14.6907L12.526 14.0385C12.7556 13.8089 12.7556 13.4368 12.526 13.2072L9.24225 9.92341C8.98973 9.67089 8.99145 9.2609 9.24613 9.01054L12.519 5.79276C12.7519 5.56377 12.7534 5.18886 12.5225 4.95791L11.8713 4.3067C11.6427 4.07813 11.2725 4.07698 11.0426 4.30411L6.27706 9.01051C6.02335 9.26107 6.02209 9.67022 6.27423 9.92236Z"
                        fill="#737273"
                        fill-opacity="0.3"
                      />
                    </svg>{" "}
                    Back
                  </div>
                </Button>
                <Button
                  variant="highlighted"
                  type="submit"
                  className="border rounded-lg"
                >
                  <div className="flex whitespace-nowrap p-2 gap-2 items-center">
                    Next{" "}
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.52068 0.380981C4.60351 0.380981 0.533325 4.38123 0.533325 9.29839C0.533325 14.2156 4.60351 18.2857 9.52068 18.2857C14.4378 18.2857 18.4381 14.2156 18.4381 9.29839C18.4381 4.38123 14.4378 0.380981 9.52068 0.380981ZM12.7352 9.75573L7.96688 14.5241C7.7373 14.7536 7.36511 14.7536 7.13553 14.5241L6.48337 13.8719C6.25379 13.6423 6.25379 13.2701 6.48337 13.0406L9.76715 9.75678C10.0197 9.50426 10.018 9.09427 9.76326 8.84392L6.49044 5.62613C6.25753 5.39715 6.25596 5.02223 6.4869 4.79129L7.13812 4.14007C7.36668 3.91151 7.73688 3.91035 7.96684 4.13748L12.7323 8.84388C12.9861 9.09445 12.9873 9.5036 12.7352 9.75573Z"
                        fill="white"
                      />
                    </svg>
                  </div>
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
