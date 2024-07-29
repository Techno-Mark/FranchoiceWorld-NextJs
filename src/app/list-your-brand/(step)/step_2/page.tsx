"use client";

import {
  getCity,
  getHeadquarters,
  getIndustry,
  getOutlets,
  getService,
  getSubCategory,
} from "@/api/dropdown";
import ArrowIcon from "@/assets/icons/arrowIcon";
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
import styles from "./step_2.module.css";

import SpinnerLoader from "@/assets/icons/spinner";
import YearSelect from "@/components/Fields/yearSelect";

interface FormValues {
  phoneNumber: string | null;
  countryCode: string | null;
  companyName: string;
  industry: number | null;
  subCategory: number | null;
  service: number | null;
  yearFounded: number | null;
  headquartersLocation: number | null;
  numberOfLocations: number | null;
  brandDescription: string;
  usp: string;
  state: number[];
  city: number[];
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
  const [categorieOptions, setCategorieOptions] = useState<OptionType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subCategorieOptions, setSubCategorieOptions] = useState<OptionType[]>(
    []
  );
  const [serviceOptions, setServiceOptions] = useState<OptionType[]>([]);
  const [stateOptions, setStateOptions] = useState<OptionType[]>([]);
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [headquartersOptions, setHeadquartersOptions] = useState<OptionType[]>(
    []
  );
  const [outletsOptions, setOutletsOptions] = useState<OptionType[]>([]);

  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);
  const [selectedSubcat, setSelectedSubCat] = useState<number | null>(null);

  const [selectedState, setSelectedState] = useState<any[]>([]);

  const [cityStateMapping, setCityStateMapping] = useState<{
    [cityId: number]: number;
  }>({});

  const [formValues, setFormValues] = useState<FormValues>({
    phoneNumber: mobileNumber,
    countryCode: selectedCountry,
    companyName: "",
    industry: null,
    subCategory: null,
    service: null,
    yearFounded: null,
    headquartersLocation: null,
    numberOfLocations: null,
    brandDescription: "",
    usp: "",
    state: [],
    city: [],
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobileNumber(localStorage.getItem("mobileNumber"));
      setSelectedCountry(localStorage.getItem("selectedCountry"));
    }
  }, []);

  const OptionMap: OptionsMapType = {
    industry: categorieOptions,
    subCategory: subCategorieOptions,
    service: selectedSubcat != null ? serviceOptions : [],
    headquartersLocation: headquartersOptions,
    numberOfLocations: outletsOptions,
    state: stateOptions,
    city: selectedState?.length > 0 ? cityOptions : [],
  };

  const fetchCategoriesTypes = async () => {
    try {
      const response = await getIndustry("/dropdown/industry-types");
      const formattedcategoriesTypes = response.map((categorie: any) => ({
        value: categorie.id,
        label: categorie.name,
      }));
      setCategorieOptions(formattedcategoriesTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const fetchSubCategoriesTypes = async (industryId: number | null) => {
    try {
      const response = await getSubCategory("/dropdown/sector", {
        industryId: industryId,
      });
      const formattedSubCategoriesTypes = response.map((categorie: any) => ({
        value: categorie.id,
        label: categorie.name,
      }));
      setSubCategorieOptions(formattedSubCategoriesTypes);
    } catch (error) {
      console.error("Error fetching subcategories types:", error);
    }
  };

  const fetchHeadquartersTypes = async () => {
    try {
      const response = await getHeadquarters("/dropdown/headquarters");
      const formattedHeadquartersTypes = response.map((headquearters: any) => ({
        value: headquearters.id,
        label: headquearters.name,
      }));
      setHeadquartersOptions(formattedHeadquartersTypes);
    } catch (error) {
      console.error("Error fetching headquarters types:", error);
    }
  };

  const fetchOutletsTypes = async () => {
    try {
      const response = await getOutlets("/dropdown/outlets");
      const formattedOutletsTypes = response.map((outlets: any) => ({
        value: outlets.id,
        label: outlets.name,
      }));
      setOutletsOptions(formattedOutletsTypes);
    } catch (error) {
      console.error("Error fetching outlets types:", error);
    }
  };

  const fetchServiceTypes = async (subCatId: number | null) => {
    try {
      const response = await getService("/dropdown/services", {
        sectorId: subCatId,
      });
      const formattedServicesTypes = response.map((service: any) => ({
        value: service.id,
        label: service.name,
      }));
      setServiceOptions(formattedServicesTypes);
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  const fetchState = async () => {
    try {
      const response = await getIndustry("/dropdown/states");
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
      setCityStateMapping((prevMapping) => ({ ...prevMapping, ...newMapping }));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    if (selectedIndustry != null) {
      fetchSubCategoriesTypes(selectedIndustry);
    }
    if (selectedSubcat != null) {
      fetchServiceTypes(selectedSubcat);
    }

    if (selectedState?.length > 0) {
      fetchCity(selectedState);
    }
  }, [selectedIndustry, selectedState, selectedSubcat]);

  useEffect(() => {
    fetchCategoriesTypes();
    fetchState();
    fetchHeadquartersTypes();
    fetchOutletsTypes();
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
      const data = response.data?.ResponseData;
      setFormValues((prevValues) => ({
        ...prevValues,
        companyName: data?.companyName || "",
        industry: data?.industry || null,
        subCategory: data?.subCategory || null,
        service: data?.service || null,
        yearFounded: data?.yearFounded || null,
        headquartersLocation: data?.headquartersLocation || null,
        numberOfLocations: data?.numberOfLocations || null,
        brandDescription: data?.brandDescription || "",
        usp: data?.brandDescription || "",
        state: data?.state || [],
        city: data?.city || [],
      }));

      fetchSubCategoriesTypes(data?.industry);
      setSelectedSubCat(data?.subCategory);
      if (selectedSubcat != null) {
        fetchServiceTypes(data?.subCategory);
      }
      setSelectedState(data?.state);
      if (selectedState?.length > 0) {
        fetchCity(data?.state);
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

  const handleStateChange = (
    selectedStates: number[],
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue("state", selectedStates);

    if (selectedStates.length > 0) {
      fetchCity(selectedStates);
    }

    // Update cities based on selected states
    setFieldValue(
      "city",
      formValues.city.filter((cityId) =>
        selectedStates.includes(cityStateMapping[cityId])
      )
    );
  };

  const validationSchema = Yup.object({
    companyName: Yup.string().max(
      250,
      "Brand Name cannot be longer than 250 characters."
    ),
    // .required("Brand Name is required"),
    // industry: Yup.number().nullable().required("Industry is required"),
    // subCategory: Yup.number().nullable().required("Sub-Category is required"),
    // service: Yup.number().nullable().required("Service/Product is required"),
    // yearFounded: Yup.number().nullable().required("Year Founded is required"),
    // headquartersLocation: Yup.number()
    //   .nullable()
    //   .required("Location of Headquarters is required"),
    // numberOfLocations: Yup.number()
    //   .nullable()
    //   .required("Current Number of Locations/Outlets is required"),
    // brandDescription: Yup.string().required("Description is required"),
    // usp: Yup.string().required("Unique Selling Proposition is required"),
    // state: Yup.array().min(1, "Please select at least one option"),
    // city: Yup.array().min(1, "Please select at least one option"),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
    setIsSubmitting(true);
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/form-details/create`,
        {
          ...values,
          phoneNumber: mobileNumber,
          countryCode: selectedCountry,
        }
      );
      updateStepProgress("/list-your-brand/step_3");
      router.push(`/list-your-brand/step_3`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleBackButton = () => {
    router.push(`/list-your-brand/step_1`);
  };

  const label = [
    "Industry",
    "Sub-Category",
    "Service/Product",
    "Business Commenced On",
    "Franchise Commenced On",
    // "Year Founded",
    "Location of Headquarters",
    "Current Number of Locations/Outlets",
  ];

  const fields = [
    "industry",
    "subCategory",
    "service",
    "businessCommencedYear",
    "franchiseCommencedYear",
    // "yearFounded",
    "headquartersLocation",
    "numberOfLocations",
  ];
  const getIn = <T extends object>(obj: T, key: string): any =>
    key.split(".").reduce((o, k) => (o || {})[k], obj as any);

  return (
    <>
      <div className={`${styles.formPart} px-3`}>
        <Title
          title="Showcase Your Brand's Identity"
          desc="Essential Details Required"
          descClass="md:!px-0 pb-8 font-medium text-xl"
          titleClass="md:!pb-2.5"
        />
        <Formik<FormValues>
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="md:mt-8">
              <div className="w-full mb-8 md:mb-7">
                <Field
                  as={InputField}
                  id="companyName"
                  name="companyName"
                  type="text"
                  label="Company Name"
                  className={`block w-full border border-[#73727366] rounded-lg py-2 px-4  focus:bg-white focus:outline-none ${
                    getIn(errors, "companyName") &&
                    getIn(touched, "companyName")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {getIn(errors, "companyName") &&
                  getIn(touched, "companyName") && (
                    <div className="text-red-500 font-medium mb-2">
                      {getIn(errors, "companyName")}
                    </div>
                  )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {fields.map((field: string, index: number) => (
                  <div
                    className={`w-full mb-8 md:even:pl-2 md:odd:pr-2 md:mb-7`}
                    key={field}
                  >
                    <Field name={field}>
                      {({ field: fieldProps, form }: FieldProps) => (
                        <>
                          {field === "businessCommencedOn" ? (
                            <YearSelect
                              id="year-select"
                              name={field}
                              className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-full items-center justify-between ${
                                getIn(errors, field) && getIn(touched, field)
                                  ? "border-red-500 mb-0.5"
                                  : ""
                              }`}
                              label={label[index]}
                              // label="Year Founded"
                              // required
                              startYear={1900}
                            />
                          ) : field === "franchiseCommencedOn" ? (
                            <YearSelect
                              id="year-select"
                              name={field}
                              className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-full items-center justify-between ${
                                getIn(errors, field) && getIn(touched, field)
                                  ? "border-red-500 mb-0.5"
                                  : ""
                              }`}
                              label={label[index]}
                              startYear={1900}
                            />
                          ) : (
                            <Select
                              name={field}
                              className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-full items-center justify-between ${
                                getIn(errors, field) && getIn(touched, field)
                                  ? "border-red-500 mb-0.5"
                                  : ""
                              }`}
                              onChange={(value) => {
                                if (field === "industry") {
                                  setSelectedIndustry(value);
                                  setFieldValue("industry", value);
                                  setFieldValue("subCategory", null);
                                  setFieldValue("service", null);
                                  setSelectedSubCat(null);
                                } else if (field === "subCategory") {
                                  setSelectedSubCat(value);
                                  setFieldValue("subCategory", value);
                                  setFieldValue("service", null);
                                } else {
                                  setFieldValue(field, value);
                                }
                              }}
                              searchable={true}
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
              {["brandDescription", "usp"].map((field) => (
                <div className="w-full mb-8 md:mb-7" key={field}>
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
                    // required={true}
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
              <p className="text-[var(--footer-bg)] text-base font-bold pb-4">
                Please Select Your Brand expansion plan Across States and City
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {["state", "city"].map((field) => (
                  <div
                    className={`w-full mb-8 md:mb-7 md:even:pl-2 md:odd:pr-2 `}
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
                            onChange={(value) => {
                              if (field.name === "state") {
                                handleStateChange(value, setFieldValue);
                                setSelectedState(value);
                              }
                              if (selectedState?.length > 0) {
                              }
                              setFieldValue(field.name, value);
                            }}
                            options={OptionMap[field.name] || []}
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
