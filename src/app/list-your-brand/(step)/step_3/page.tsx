"use client";

import TextArea from "@/components/Fields/TextArea";
import Button from "@/components/button/button";
import MultiSelect from "@/components/select/MultiSelect";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import styles from "./step_3.module.css";
import ArrowIcon from "@/assets/icons/arrowIcon";

interface FormValues {
  areaRequired: string;
  investmentRange: string;
  franchiseFee: string;
  salesModel: string;
  returnInvestment: string;
  unitFranchise: string;
  providedFranchisees: [];
  othersApplicable: string;
  franchiseAgreement: string;
  longFranchise: string;
  termRenewable: string;
}

function SecondStep() {
  const router = useRouter();

  const Industry = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const initialValues: FormValues = {
    areaRequired: "",
    investmentRange: "",
    franchiseFee: "",
    salesModel: "",
    returnInvestment: "",
    unitFranchise: "",
    providedFranchisees: [],
    othersApplicable: "",
    franchiseAgreement: "",
    longFranchise: "",
    termRenewable: "",
  };

  const validationSchema = Yup.object({
    areaRequired: Yup.string().required("Area Required is required"),
    investmentRange: Yup.string().required(
      "Total Initial Investment Range is required"
    ),
    franchiseFee: Yup.string().required("Franchise Fee is required"),
    salesModel: Yup.string().required("Sales and Revenue Model is required"),
    returnInvestment: Yup.string().required(
      "Anticipated % Return on Investment (ROI) is required"
    ),
    unitFranchise: Yup.string().required(
      "Likely Payback Period for a Unit Franchise is required"
    ),
    providedFranchisees: Yup.array().min(
      1,
      "Please select at least one option"
    ),

    franchiseAgreement: Yup.string().required(
      "Do you have a franchise agreement? is required"
    ),
    longFranchise: Yup.string().required(
      "How long is the franchise for? is required"
    ),
    termRenewable: Yup.string().required("Is the term renewable? is required"),
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
    // router.push("/list-your-brand/step_4");

    // After submission logic, reset submitting state
    setSubmitting(false);
  };

  const handleBackButton = () => {
    router.push("/list-your-brand/step_2");
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
    "salesModel",
    "returnInvestment",
    "unitFranchise",
  ];

  const multiselectLabel = [
    "Do you have a franchise agreement?",
    "How long is the franchise for?",
    "Is the term renewable?",
  ];

  const multiselectFields = [
    "franchiseAgreement",
    "longFranchise",
    "termRenewable",
  ];

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
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="mt-16">
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
              <div className="w-full mb-6 md:mb-0">
                <Field
                  as={MultiSelect}
                  name="providedFranchisees"
                  label="Support Provided to Franchisees"
                  className={`flex flex-wrap w-full px-2 py-2 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[45px] items-center ${
                    getIn(errors, "providedFranchisees") &&
                    getIn(touched, "providedFranchisees")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={Industry}
                />
                {getIn(errors, "providedFranchisees") &&
                  getIn(touched, "providedFranchisees") && (
                    <div className="text-red-500 font-medium mb-2">
                      {getIn(errors, "providedFranchisees")}
                    </div>
                  )}
              </div>
              <div className="w-full mb-6 md:mb-0">
                <Field
                  as={TextArea}
                  name="othersApplicable"
                  label="Others if applicable"
                  placeholder="Your Message"
                  rows={3}
                  className={`block w-full border resize-none border-[#73727366] rounded-lg py-2 px-4 mb-3 focus:bg-white focus:border-[#73727366]`}
                />
              </div>
              <div className="grid grid-cols-1 gap-2 mb-2 md:grid-cols-2">
                {multiselectFields.map((field, index) => (
                  <div key={field}>
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
