"use client";

import { getCity, getInvestmentRange } from "@/api/dropdown";
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

  const fetchCity = async (cityId: []) => {
    try {
      const response = await getCity("/dropdown/cities", {
        stateId: cityId,
      });
      const formattedCity = response.map((city: any) => ({
        value: city.id,
        label: city.name,
      }));

      setCitiesOption(formattedCity);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  useEffect(() => {
    fetchInvestmentRange();
    fetchCity([]);
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
    city: Yup.number().required("City is required"),
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
        city: response?.city || null,
        pincode: response?.pincode || "",
        investmentRange: response?.investmentRange || null,
      }));
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
                  className={`block w-full  rounded-lg py-2 px-4 focus:outline-none font-medium !border-[1px] !border-[rgba(115,114,115,0.4)] ${
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
                className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] focus:outline-none ${
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
                  name="city"
                  label="City"
                  className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                    getIn(errors, "city") && getIn(touched, "city")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                  options={citiesOption}
                />
                {getIn(errors, "city") && getIn(touched, "city") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "city")}
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
            </div>
            <div className="w-full md:w-1/2 md:pr-2 mb-6 md:mb-7">
              <Select
                name="investmentRange"
                label="Investment Range"
                className={`flex items-center justify-between border border-[#73727366] rounded-lg py-2 px-4 cursor-pointer focus:outline-none ${
                  getIn(errors, "investmentRange") &&
                  getIn(touched, "investmentRange")
                    ? "border-red-500 mb-0.5"
                    : ""
                }`}
                options={investmentRange}
              />
              {getIn(errors, "investmentRange") &&
                getIn(touched, "investmentRange") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "investmentRange")}
                  </div>
                )}
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
