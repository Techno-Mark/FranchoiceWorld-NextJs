"use client";
import React from "react";
import Image from "next/image";
import styles from "./listBrandBanner.module.css";
import Title from "@/components/title/title";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/select/dropdown";
import TextArea from "@/components/Fields/TextArea";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";

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
}

function SecondStep() {
  const router = useRouter();

  const props = {
    imgUrl: "/listStep/listYourBrand.png",
    imgAlt: "Banner image",
    bannerTitle: "Welcome to the World of Franchising",
  };

  const Industry = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
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

    // After submission logic, reset submitting state
    setSubmitting(false);
  };

  const handleBackButton = () => {
    router.push("/list-your-brand/step_1");
  };

  const getIn = <T extends object>(obj: T, key: string): any =>
    key.split(".").reduce((o, k) => (o || {})[k], obj as any);

  return (
    <>
      <section
        id="listBrandBanner"
        className={`relative ${styles.listBannerSection}`}
      >
        <Image
          src={props.imgUrl}
          alt={props.imgAlt}
          className={styles.listBannerImage}
          width={2000}
          height={500}
        />
        <div className="container absolute top-9 left-0 right-0 transform md:translate-y-[-50%] md:top-1/2">
          <h3
            className={`pt-1 md:pt-0 w-7/12 font-bold ${styles.listBannerTitle}`}
          >
            Hello
          </h3>
        </div>
      </section>
      <section className={`relative ${styles.halfBanner}`}>
        <div className="container w-full md:w-3/4">
          <div
            className={`bg-white gap-3 p-4  md:py-10 md:px-5 ${styles.halfBannerContent}`}
          >
            <div className={`${styles.formPart} px-3`}>
              <Title
                title="Showcase Your Brand's Identity"
                desc="Essential Details Required"
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
                        className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 mb-3 focus:bg-white focus:border-[#73727366] ${
                          getIn(errors, "brandName") &&
                          getIn(touched, "brandName")
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {getIn(errors, "brandName") &&
                        getIn(touched, "brandName") && (
                          <div className="text-red-500 text-sm">
                            {getIn(errors, "brandName")}
                          </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-2 md:grid-cols-2">
                      {[
                        "subCategory",
                        "selectedIndustry",
                        "serviceProduct",
                        "yearFounded",
                        "locationHeadquarters",
                        "outlets",
                      ].map((field) => (
                        <div key={field}>
                          <Field name={field}>
                            {({ field, form }: FieldProps) => (
                              <>
                                <Dropdown
                                  className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center ${
                                    field.value
                                      ? "justify-between"
                                      : "justify-end"
                                  } ${
                                    getIn(errors, field.name) &&
                                    getIn(touched, field.name)
                                      ? "border-red-500"
                                      : ""
                                  }`}
                                  options={Industry}
                                  label={
                                    field.name.charAt(0).toUpperCase() +
                                    field.name
                                      .slice(1)
                                      .replace(/([A-Z])/g, " $1")
                                  }
                                  required
                                  value={field.value}
                                  onChange={(name, value) => {
                                    if (name) {
                                      form.setFieldValue(name, value);
                                    }
                                  }}
                                  onBlur={(name) =>
                                    form.setFieldTouched(name, true)
                                  }
                                  name={field.name}
                                />
                                {getIn(errors, field.name) &&
                                  getIn(touched, field.name) && (
                                    <div className="text-red-500 text-sm">
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
                          className={`block w-full border resize-none border-[#73727366] rounded-lg py-2 px-4 mb-3 focus:bg-white focus:border-[#73727366] ${
                            getIn(errors, field) && getIn(touched, field)
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {getIn(errors, field) && getIn(touched, field) && (
                          <div className="text-red-500 text-sm">
                            {getIn(errors, field)}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <Button
                        className="border border-customBorder rounded-lg"
                        onClick={handleBackButton}
                        type="button"
                      >
                        <div className="flex whitespace-nowrap p-2 gap-2 items-center">
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.48872 0.547607C14.4059 0.547607 18.4761 4.54785 18.4761 9.46502C18.4761 14.3822 14.4059 18.4524 9.48872 18.4524C4.57156 18.4524 0.571314 14.3822 0.571314 9.46502C0.571314 4.54785 4.57156 0.547607 9.48872 0.547607ZM6.27423 9.92236L11.0425 14.6907C11.2721 14.9203 11.6443 14.9203 11.8739 14.6907L12.526 14.0386C12.7557 13.809 12.7557 13.4368 12.526 13.2072L8.72967 9.46502L12.4719 5.66864C12.7015 5.43906 12.7015 5.06687 12.4719 4.83729L11.8198 4.18518C11.5902 3.9556 11.218 3.9556 10.9884 4.18518L6.27423 8.89935C6.04465 9.12893 6.04465 9.5011 6.27423 9.73068Z"
                              fill="black"
                            />
                          </svg>
                          <span>Back</span>
                        </div>
                      </Button>
                      <Button
                        type="submit"
                        className="border border-customBorder rounded-lg"
                      >
                        <div className="flex whitespace-nowrap p-2 gap-2 items-center">
                          <span>Save & Continue</span>
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.48872 0.547607C4.57156 0.547607 0.501314 4.54785 0.501314 9.46502C0.501314 14.3822 4.57156 18.4524 9.48872 18.4524C14.4059 18.4524 18.4761 14.3822 18.4761 9.46502C18.4761 4.54785 14.4059 0.547607 9.48872 0.547607ZM12.7032 9.00785L7.93491 4.23949C7.70533 4.00991 7.33315 4.00991 7.10357 4.23949L6.45146 4.8916C6.22188 5.12118 6.22188 5.49336 6.45146 5.72294L10.2478 9.46502L6.50567 13.2614C6.27609 13.491 6.27609 13.8631 6.50567 14.0927L7.15778 14.7448C7.38736 14.9744 7.75953 14.9744 7.98911 14.7448L12.7032 10.0306C12.9328 9.80101 12.9328 9.42884 12.7032 9.19926Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SecondStep;
