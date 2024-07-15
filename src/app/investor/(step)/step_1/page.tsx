"use client";

import { getCity, getInvestmentRange } from "@/api/dropdown";
import { CreateInvestorData, getInvestorData } from "@/api/investor";
import ArrowIcon from "@/assets/icons/arrowIcon";
import InputField from "@/components/Fields/InputField";
import Button from "@/components/button/button";
import CountryDropdown from "@/components/countryDropdown/countryDropdown";
import Select from "@/components/select/Select";
import Title from "@/components/title/title";
import { updateStepProgress } from "@/utills/stepProgress";
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
      setMobileNumber(localStorage.getItem("mobileNumber"));
      setSelectedCountry(localStorage.getItem("selectedCountry"));
    }
    console.log("Investment Range State:", investmentRange);
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
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    city: Yup.number().required("City is required"),
    pincode: Yup.string().required("Pin Code is required"),
    investmentRange: Yup.number().required("Investment Range is required"),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
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
      updateStepProgress("/investor/step_2");
      router.push(`/investor/step_2`);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchData = async () => {
    updateStepProgress("/investor/step_1");
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
        descClass="md:!px-0 font-medium text-lg"
        titleClass="md:!pb-2.5"
      />
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="md:mt-16">
            <div className="flex flex-col md:flex-row">
              <div className="w-full pr-2 mb-3 md:mb-6">
                <Field
                  as={InputField}
                  id="grid-first-name"
                  name="fullName"
                  type="text"
                  label="Full Name"
                  required={true}
                  className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
                    getIn(errors, "fullName") && getIn(touched, "fullName")
                      ? "border-red-500 mb-0.5"
                      : ""
                  }`}
                />
                {getIn(errors, "fullName") && getIn(touched, "fullName") && (
                  <div className="text-red-500 font-medium">
                    {getIn(errors, "fullName")}
                  </div>
                )}
              </div>
              <div className="w-full pl-2 mb-3 md:mb-6">
                <label
                  className="block mb-2 font-medium text-[var(--text-color)]"
                  htmlFor="phoneNumber"
                >
                  Phone Number <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex">
                  <div className="w-[100px] pb-3">
                    <CountryDropdown
                      variant="small"
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
                    className={`mb-3`}
                  />
                </div>
              </div>
            </div>
            <div className="inline-block w-full mb-3 md:mb-6">
              <Field
                as={InputField}
                id="grid-email"
                name="email"
                label="Email Address"
                type="email"
                required={true}
                className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
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
              <div className="w-full pr-2 mb-3 md:mb-6">
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
              <div className="w-full pl-2 mb-3 md:mb-6">
                <Field
                  as={InputField}
                  id="grid-pincode"
                  name="pincode"
                  type="number"
                  label="Pin Code"
                  required={true}
                  className={`block w-full border border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:border-[#73727366] ${
                    getIn(errors, "pincode") && getIn(touched, "pincode")
                      ? "border-red-500 mb-0.5"
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
            <div className="w-full md:w-1/2 pr-2 mb-3 md:mb-6">
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
                Next
                <ArrowIcon color="white" className="rotate-180 ml-2" />
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default InvestorFirstStep;
