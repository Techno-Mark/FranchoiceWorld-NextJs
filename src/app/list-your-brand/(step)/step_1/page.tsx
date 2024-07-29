"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";

import ArrowIcon from "@/assets/icons/arrowIcon";
import SpinnerLoader from "@/assets/icons/spinner";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { updateStepProgress } from "@/utills/stepProgress";
import { getCity, getCountry, getState } from "@/api/dropdown";

const FirstStep = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    countryCode: "",
    email: "",
    brandName: "",
    websiteURL: "",
    country: null,
    state: null,
    city: null,
    pincode: "",
  });

  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const mobileNumber = localStorage.getItem("mobileNumber") || "";
    const selectedCountry = localStorage.getItem("selectedCountry") || "";
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: mobileNumber,
      countryCode: selectedCountry,
    }));
    fetchCountries();
    fetchStates();
    fetchData(mobileNumber, selectedCountry);
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await getCountry("/dropdown/countries");
      const formattedstate = response.map((country: any) => ({
        value: country.id,
        label: country.name,
      }));
      setCountryOptions(formattedstate);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchStates = async () => {
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

  const fetchCities = async (stateId: number[]) => {
    try {
      const response = await getCity("/dropdown/cities", {
        stateId: stateId,
      });
      const formattedCity = response.map((city: any) => ({
        value: city.id,
        label: city.name,
      }));

      setCityOptions(formattedCity);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .max(250, "Full Name cannot be longer than 250 characters.")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .max(250, "Email Address cannot be longer than 250 characters.")
      .required("Email Address is required"),
    brandName: Yup.string()
      .max(250, "Brand Name cannot be longer than 250 characters.")
      .required("Brand Name is required"),
    websiteURL: Yup.string().matches(
      /[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Invalid WebsiteURL!"
    ),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .min(4, "Pin code must be atleast 4 characters")
      .max(12, "Pin Code cannot be longer than 12 characters.")
      .required("Pin Code is required"),
  });

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/form-details/create`,
        values
      );
      updateStepProgress("/list-your-brand/step_2");
      router.push(`/list-your-brand/step_2`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchData = async (mobileNumber: any, selectedCountry: any) => {
    updateStepProgress("/list-your-brand/step_1");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/form-details/get`,
        {
          phoneNumber: mobileNumber,
          countryCode: selectedCountry,
        }
      );
      const data = response.data?.ResponseData;
      setFormData((prevData) => ({
        ...prevData,
        ...data,
        phoneNumber: mobileNumber,
        countryCode: selectedCountry,
      }));
      if (data.state) {
        fetchCities(data.state);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title
        title="Your Details Stay Secure With Us"
        desc="Enter Your Confidential Information"
        descClass="md:!px-0 pb-8 font-medium text-xl"
        titleClass="md:!pb-2.5"
      />
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          errors,
          touched,
          setFieldValue,
          values,
          handleChange,
          handleBlur,
        }) => (
          <Form className="md:mt-8">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:pr-2 mb-8 md:mb-7">
                <InputField
                  id="fullName"
                  name="fullName"
                  type="text"
                  label="Full Name"
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={true}
                  className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none text-base font-medium ${
                    touched.fullName && errors.fullName
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {touched.fullName && errors.fullName && (
                  <div className="text-red-500 font-medium mb-4">
                    {errors.fullName}
                  </div>
                )}
              </div>
              <div className="w-full mb-8 md:mb-7 md:pl-2">
                <InputField
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  label="Phone Number"
                  value={values.phoneNumber}
                  disabled={true}
                  className={`block w-full bg-[rgba(115,114,115,0.2)] rounded-lg py-2 px-4 focus:outline-none text-base font-medium !border-[1px] !border-[rgba(115,114,115,0.4)]`}
                />
              </div>
            </div>
            <div className="inline-block w-full md:mb-7 mb-8">
              <InputField
                id="email"
                name="email"
                type="email"
                value={values.email}
                label="Email Address"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none text-base font-medium ${
                  touched.email && errors.email
                    ? "border-red-500 mb-0.5"
                    : "mb-3"
                }`}
              />
              {touched.email && errors.email && (
                <div className="text-red-500 font-medium mb-4">
                  {errors.email}
                </div>
              )}
            </div>
            <div className="inline-block w-full md:mb-7 mb-8">
              <InputField
                id="brandName"
                name="brandName"
                type="text"
                value={values.brandName}
                label="Brand Name"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none text-base font-medium ${
                  touched.brandName && errors.brandName
                    ? "border-red-500 mb-0.5"
                    : "mb-3"
                }`}
              />
              {touched.brandName && errors.brandName && (
                <div className="text-red-500 font-medium mb-4">
                  {errors.brandName}
                </div>
              )}
            </div>
            <div className="inline-block w-full md:mb-7 mb-8">
              <InputField
                id="websiteURL"
                name="websiteURL"
                type="text"
                value={values.websiteURL}
                label="Website URL"
                onChange={handleChange}
                onBlur={handleBlur}
                className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none text-base font-medium ${
                  touched.websiteURL && errors.websiteURL
                    ? "border-red-500 mb-0.5"
                    : "mb-3"
                }`}
              />
              {touched.websiteURL && errors.websiteURL && (
                <div className="text-red-500 font-medium mb-4">
                  {errors.websiteURL}
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mb-8 pr-2 md:mb-7">
                <Field name="country">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      id="country"
                      name="country"
                      label="Country"
                      options={countryOptions}
                      onChange={(option) => {
                        form.setFieldValue("country", option);
                        fetchStates();
                      }}
                      onBlur={form.handleBlur}
                      required
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-full items-center justify-between ${
                        form.touched.country && form.errors.country
                          ? "border-red-500 mb-0.5"
                          : "mb-3"
                      }`}
                    />
                  )}
                </Field>
                {touched.country && errors.country && (
                  <div className="text-red-500 font-medium mb-4">
                    {errors.country}
                  </div>
                )}
              </div>
              <div className="w-full mb-8 pl-2 md:mb-7">
                <Field name="state">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      id="state"
                      name="state"
                      label="State"
                      options={stateOptions}
                      onChange={(option) => {
                        form.setFieldValue("state", option);
                        fetchCities([option]);
                      }}
                      onBlur={form.handleBlur}
                      required
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-full items-center justify-between ${
                        form.touched.state && form.errors.state
                          ? "border-red-500 mb-0.5"
                          : "mb-3"
                      }`}
                    />
                  )}
                </Field>
                {touched.state && errors.state && (
                  <div className="text-red-500 font-medium mb-4">
                    {errors.state}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mb-8 pr-2 md:mb-7">
                <Field name="city">
                  {({ field, form }: any) => (
                    <Select
                      {...field}
                      id="city"
                      name="city"
                      label="City"
                      options={cityOptions}
                      onChange={(option) => {
                        form.setFieldValue("city", option);
                      }}
                      onBlur={form.handleBlur}
                      required
                      className={`flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none h-full items-center justify-between ${
                        form.touched.city && form.errors.city
                          ? "border-red-500 mb-0.5"
                          : "mb-3"
                      }`}
                    />
                  )}
                </Field>
                {touched.city && errors.city && (
                  <div className="text-red-500 font-medium mb-4">
                    {errors.city}
                  </div>
                )}
              </div>
              <div className="w-full md:pl-2 mb-6 md:mb-7">
                <Field
                  as={InputField}
                  id="grid-pincode"
                  name="pincode"
                  type="number"
                  label="Pin Code"
                  required={true}
                  className={`block w-full rounded-lg py-2 px-4 focus:outline-none font-medium !border-[1px] !border-[rgba(115,114,115,0.4)] ${
                    errors.pincode && touched.pincode
                      ? "!border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {errors.pincode && touched.pincode && (
                  <div className="text-red-500 font-medium">
                    {errors.pincode}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="highlighted"
                type="submit"
                className="rounded-md text-base font-medium flex items-center !py-4 !px-5"
              >
                {isSubmitting ? (
                  <SpinnerLoader />
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
    </>
  );
};

export default FirstStep;
