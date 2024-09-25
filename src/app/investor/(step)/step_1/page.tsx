"use client";

import {
  getCity,
  getCountry,
  getInvestmentRange,
  getState,
} from "@/api/dropdown";
import { CreateInvestorData, getInvestorData } from "@/api/investor";
import ArrowIcon from "@/assets/icons/arrowIcon";
import SpinnerLoader from "@/assets/icons/spinner";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import CountryDropdown from "@/components/countryDropdown/countryDropdown";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { updateInvestorStepProgress } from "@/utills/stepProgress";
import { Field, Form, Formik, FormikHelpers, getIn } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface FormValues {
  fullName: string | null;
  email: string | null;
  countryCode: string | null;
  phoneNumber: string | null;
  country: number | null;
  state: number | null;
  city: number | null;
  pincode: string | null;
  investmentRange: number | null;
}

function InvestorFirstStep() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState<string | null>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>("");
  const [investmentRange, setInvstmentRange] = useState([]);
  const [citiesOption, setCitiesOption] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchInvestmentRange = async () => {
    try {
      const response = await getInvestmentRange(
        "/dropdown/min-max-investments"
      );
      const formattedInvestmentRangeTypes = response.map(
        (InvestmentRange: any) => ({
          value: InvestmentRange.id,
          label: InvestmentRange.range,
        })
      );
      setInvstmentRange(formattedInvestmentRangeTypes);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

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
  const fetchCity = async (stateIds: (string | number)[]) => {
    try {
      const response = await getCity("/dropdown/cities", {
        stateId: stateIds,
      });
      const formattedCity = response.map((city: any) => ({
        value: city.id,
        label: city.name,
      }));
      setCitiesOption(formattedCity);

      const newMapping: { [cityId: number]: number } = {};
      response.forEach((city: any) => {
        newMapping[city.id] = city.stateId;
      });
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchInvestmentRange();
    fetchCountries();
    fetchStates();
    if (typeof window !== "undefined") {
      setMobileNumber(localStorage.getItem("investorMobileNumber"));
      setSelectedCountry(localStorage.getItem("investorSelectedCountry"));
    }
  }, []);

  const [formValues, setFormValues] = useState<FormValues>({
    fullName: "",
    email: "",
    countryCode: selectedCountry,
    phoneNumber: mobileNumber,
    country: null,
    state: null,
    city: null,
    pincode: "",
    investmentRange: null,
  });

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .max(250, "Full Name cannot be longer than 250 characters.")
      .required("Full Name is required"),
    email: Yup.string()
      .max(250, "Email Address cannot be longer than 250 characters.")
      .email("Invalid email address")
      .required("Email Adress is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string()
      .min(4, "Pin code must be atleast 4 characters")
      .max(12, "Pin Code cannot be longer than 12 characters.")
      .required("Pin Code is required"),
    investmentRange: Yup.number().required("Investment Range is required"),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
    setIsSubmitting(true);
    setSubmitting(true);
    Object.keys(values).forEach((fieldName) => {
      setFieldTouched(fieldName, true);
    });
    let params = {
      ...values,
      phoneNumber: mobileNumber,
      countryCode: selectedCountry,
    };
    try {
      const response = await CreateInvestorData(params);
      if (response.ResponseStatus === "success") {
        updateInvestorStepProgress("/investor/step_2");
        router.push(`/investor/step_2`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
      setIsSubmitting(false);
    }
  };

  const fetchData = async () => {
    try {
      let params = {
        phoneNumber: mobileNumber,
        countryCode: selectedCountry,
      };
      const response = await getInvestorData(params);
      setFormValues((prevValues) => ({
        ...prevValues,
        fullName: response?.fullName || "",
        email: response?.email || "",
        country: response?.country || null,
        state: response?.state || null,
        city: response?.city || null,
        pincode: response?.pincode || "",
        investmentRange: response?.investmentRange || null,
      }));

      if (response?.state) {
        fetchCity([response?.state]);
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

  return (
    <>
      <Title
        title="Your Details Stay Secure With Us"
        desc="Enter Your Confidential Information"
        descClass="md:!px-0 font-medium text-lg pb-6 md:pb-0"
        titleClass="md:!pb-2.5"
      />
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="md:mt-12">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:pr-2 mb-6 md:mb-7">
                <Field
                  as={InputField}
                  id="grid-first-name"
                  name="fullName"
                  type="text"
                  label="Full Name"
                  required={true}
                  className={`block w-full text-base rounded-lg py-2 px-4 focus:outline-none font-medium !border-[1px] !border-[rgba(115,114,115,0.4)] ${
                    getIn(errors, "fullName") && getIn(touched, "fullName")
                      ? "!border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {getIn(errors, "fullName") && getIn(touched, "fullName") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "fullName")}
                  </div>
                )}
              </div>
              <div className="w-full md:pl-2 mb-6 md:mb-7">
                <label
                  className="block mb-2 font-medium text-[var(--text-color)]"
                  htmlFor="phoneNumber"
                >
                  Phone Number <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex">
                  <div className="w-[100px] mr-2">
                    <CountryDropdown
                      variant="formDropdown"
                      className="!border-[rgba(115,114,115,0.4)]"
                      disabled={true}
                    />
                  </div>
                  <Field
                    as={InputField}
                    id="grid-phoneNumber"
                    name="phoneNumber"
                    disabled={true}
                    type="text"
                    value={mobileNumber}
                    className={`block w-full rounded-lg py-2 px-4 focus:outline-none font-medium !border-[1px] !border-[rgba(115,114,115,0.4)] bg-[rgba(115,114,115,0.2)]`}
                  />
                </div>
              </div>
            </div>
            <div className="inline-block w-full mb-6 md:mb-7">
              <Field
                as={InputField}
                id="grid-email"
                name="email"
                label="Email Address"
                type="email"
                required={true}
                className={`block w-full text-base border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] focus:outline-none ${
                  getIn(errors, "email") && getIn(touched, "email")
                    ? "border-red-500 mb-0.5"
                    : ""
                }`}
              />
              {getIn(errors, "email") && getIn(touched, "email") && (
                <div className="text-red-500 font-medium">
                  {getIn(errors, "email")}
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:pr-2 mb-6 md:mb-7">
                <Select
                  name="country"
                  label="Country"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "country") && getIn(touched, "country")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={countryOptions}
                  required={true}
                  searchable={true}
                />
                {getIn(errors, "country") && getIn(touched, "country") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "country")}
                  </div>
                )}
              </div>
              <div className="w-full md:pr-2 mb-6 md:mb-7">
                <Select
                  name="state"
                  label="State"
                  required={true}
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "state") && getIn(touched, "state")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  onChange={(value) => {
                    fetchCity([value]);
                  }}
                  options={stateOptions}
                  searchable={true}
                />
                {getIn(errors, "state") && getIn(touched, "state") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "state")}
                  </div>
                )}
              </div>
              <div className="w-full md:pr-2 mb-6 md:mb-7">
                <Select
                  name="city"
                  label="City"
                  required={true}
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "city") && getIn(touched, "city")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={citiesOption}
                  searchable={true}
                />
                {getIn(errors, "city") && getIn(touched, "city") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "city")}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 md:pr-2 mb-6 md:mb-7">
                <Field
                  as={InputField}
                  id="grid-pincode"
                  name="pincode"
                  type="number"
                  label="Pin Code"
                  required={true}
                  className={`block w-full text-base rounded-lg py-2 px-4 focus:outline-none font-medium !border-[1px] !border-[rgba(115,114,115,0.4)] ${
                    getIn(errors, "pincode") && getIn(touched, "pincode")
                      ? "!border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {getIn(errors, "pincode") && getIn(touched, "pincode") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "pincode")}
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/3 md:pl-2 mb-6 md:mb-7">
                <Select
                  name="investmentRange"
                  label="Investment Range"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "investmentRange") &&
                    getIn(touched, "investmentRange")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  required={true}
                  options={investmentRange}
                />
                {getIn(errors, "investmentRange") &&
                  getIn(touched, "investmentRange") && (
                    <div className="text-red-500 font-medium">
                      {getIn(errors, "investmentRange")}
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
    </>
  );
}

export default InvestorFirstStep;
