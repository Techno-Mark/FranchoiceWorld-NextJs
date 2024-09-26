"use client";
import CloseIcon from "@/assets/icons/closeIcon";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import InputField from "../Fields/InputField";
import PopupLogo from "@/assets/icons/popupLogo";
import Image from "next/image";
import Button from "../button/button";
import SpinnerLoader from "@/assets/icons/spinner";
import ArrowIcon from "@/assets/icons/arrowIcon";
import Select from "../select/Select";
import { getCity, getIndustry } from "@/api/dropdown";
import { useRouter } from "next/navigation";
import { eventRegister } from "@/api/home";
import localFont from "next/font/local";
import styles from "./pop-up.module.css";
import ThankYou from "@/app/thankyou/page";
import CountryDropdown from "../countryDropdown/countryDropdown";
import NumberField from "../Fields/CustomNumberBox";

const myFont = localFont({
  src: "../../../public/font/impact-webfont.woff",
  variable: "--font-impact",
});

interface FormValues {
  name: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  investmentCapital: number[];
}

const option = [
  { label: "20L - 30L", value: "20L - 30L" },
  { label: "31L - 40L", value: "31L - 40L" },
  { label: "41L - 55L", value: "41L - 55L" },
  { label: "56L and above", value: "56L and above" },
];

const MainPopup = () => {
  const router = useRouter();
  const [showConsent, setShowConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string>("");

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    jobTitle: "",
    email: "",
    phoneNumber: "",
    investmentCapital: [],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConsent(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .trim()
      .max(250, "Name cannot be longer than 250 characters.")
      .required("Name is required")
      .test(
        "no-only-spaces",
        "Name cannot consist only of spaces",
        (value) => (value ? value.trim().length > 0 : false) // Return boolean
      ),
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // Custom regex for stricter email format
        "Please enter a valid email address"
      ),
    jobTitle: Yup.string()
      .trim()
      .max(250, "Job Title cannot be longer than 250 characters.")
      .required("Job Title is required")
      .test(
        "no-only-spaces",
        "Job Title cannot consist only of spaces",
        (value) => (value ? value.trim().length > 0 : false) // Return boolean
      ),
    investmentCapital: Yup.mixed().test(
      "is-not-empty",
      "Investment Capital is required",
      (value) => {
        return (
          value &&
          (typeof value === "string" ||
            (Array.isArray(value) && value.length > 0))
        );
      }
    ),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Contact Number must be exactly 10 digits")
      .required("Contact No is required"),
  });

  const handleSubmit = async (
    values: typeof formValues,
    { setSubmitting, setFieldTouched }: FormikHelpers<typeof formValues>
  ) => {
    setIsSubmitting(true);

    try {
      const response = await eventRegister(values);
      if (response.success) {
        router.push(`/registerThankyou`);
        setShowConsent(false);
      } else {
        setShowSuccessMessage(response.message);
      }
    } catch (error: any) {
      const errorMessage = error.message || "An unknown error occurred";
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  const handleAction = () => {
    setShowConsent(false);
  };

  if (!showConsent) return null;

  const getIn = <T extends object>(obj: T, key: string): any =>
    key.split(".").reduce((o, k) => (o || {})[k], obj as any);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
        <div
          className={`bg-white w-auto max-h-[600px] md:max-h-[650px] mx-3   overflow-auto inline-block ${styles.businessReg} ${styles.custom_scrollbar}`}
        >
          <div className="flex relative">
            <button
              className="bg-transparent absolute right-3 top-3 border-none text-2xl cursor-pointer"
              onClick={handleAction}
            >
              <CloseIcon />
            </button>
            <div className="bg-footer-bg hidden md:flex p-8 justify-between flex-col">
              {/* <div> */}
              <PopupLogo />
              {/* </div> */}
              <div className="absolute bottom-0 left-5">
                <Image
                  alt="lady_img"
                  src="/images/Lady.png"
                  height={413}
                  width={188}
                />
              </div>
            </div>
            <div className="w-auto md:max-w-[700px]  md:px-8 ">
              <div className="flex flex-col py-5 px-3 md:px-7">
                <div>
                  <div className="text-footer-bg text-center uppercase">
                    <p
                      className={`${myFont.className} text-5xl md:text-[80px] font-impact`}
                    >
                      Success ka
                    </p>
                    <p
                      className={`${myFont.className} text-[26px] md:text-[43px]  font-impact`}
                    >
                      ultimate destination
                    </p>
                  </div>

                  <div className="py-3 md:max-w-[500px]">
                    <div className="flex justify-center items-center">
                      <div className="h-1 w-8 md:w-16 bg-[var(--highlighted-color)]"></div>
                      <p className="md:mx-4 mx-2 text-gray-600 font-bold text-base md:text-lg">
                        Kickstart your business
                      </p>
                      <div className="h-1 w-8 md:w-16 bg-[var(--highlighted-color)]"></div>
                    </div>
                    <p className="text-gray-600 text-center font-bold text-base md:text-lg">
                      with top franchise opportunities
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <div>
                      <p className="bg-footer-bg text-white text-sm md:text-lg text-center font-bold px-6">
                        Franchoice World Business Summit{" "}
                      </p>
                      <p className="font-bold text-[10px] md:text-base p-2">
                        19th Oct | 9:30am - 6:00pm | Andheri East, Mumbai
                      </p>
                    </div>
                  </div>

                  <div className="max-w-[440px]">
                    <Formik<FormValues>
                      initialValues={formValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                      enableReinitialize={true}
                    >
                      {({ errors, touched, setFieldValue }) => (
                        <Form>
                          <div className="grid grid-cols-2 gap-2 md:gap-10">
                            <div className="w-full mb-2">
                              <Field
                                as={InputField}
                                id="name"
                                name="name"
                                type="text"
                                required
                                label="Your Name"
                                className={`block w-full border text-base border-[#73727366] rounded-lg py-2 px-4  focus:bg-white focus:outline-none ${
                                  getIn(errors, "name") &&
                                  getIn(touched, "name")
                                    ? "border-red-500 mb-0.5"
                                    : ""
                                }`}
                              />
                              {getIn(errors, "name") &&
                                getIn(touched, "name") && (
                                  <div className="text-red-500 font-medium mb-2">
                                    {getIn(errors, "name")}
                                  </div>
                                )}
                            </div>
                            <div className="w-full mb-2">
                              <Field
                                as={InputField}
                                id="jobTitle"
                                name="jobTitle"
                                type="text"
                                label="Job Title"
                                required
                                className={`block w-full border text-base border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none ${
                                  getIn(errors, "jobTitle") &&
                                  getIn(touched, "jobTitle")
                                    ? "border-red-500 mb-0.5"
                                    : ""
                                }`}
                              />
                              {getIn(errors, "jobTitle") &&
                                getIn(touched, "jobTitle") && (
                                  <div className="text-red-500 font-medium mb-2">
                                    {getIn(errors, "jobTitle")}
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="w-full mb-2">
                            <div className="w-full">
                              <label
                                className="text-sm font-medium  text-[var(--text-color)]"
                                htmlFor="investmentCapital"
                              >
                                Investment Capital (INR in Lakhs)
                                <sup className="text-red-500">*</sup>
                              </label>
                              <Select
                                name="investmentCapital"
                                placeholder=" "
                                className={`flex justify-between mt-2 px-2 py-2 mb-0.5 leading-none bg-white text-[var(--text-color)] font-medium border border-[#73727366] rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center ${
                                  getIn(errors, "investmentCapital") &&
                                  getIn(touched, "investmentCapital")
                                    ? "border-red-500 mb-0.5"
                                    : ""
                                }`}
                                options={option}
                              />
                              {getIn(errors, "investmentCapital") &&
                                getIn(touched, "investmentCapital") && (
                                  <div className="text-red-500 font-medium mb-2">
                                    {getIn(errors, "investmentCapital")}
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="grid  gap-2 md:gap-10 grid-cols-2">
                            <div className="w-full mb-3 md:mb-4">
                              <Field
                                as={InputField}
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                required
                                className={`block w-full border text-base border-[#73727366] rounded-lg py-2 px-4  focus:bg-white focus:outline-none ${
                                  getIn(errors, "email") &&
                                  getIn(touched, "email")
                                    ? "border-red-500 mb-0.5"
                                    : ""
                                }`}
                              />
                              {getIn(errors, "email") &&
                                getIn(touched, "email") && (
                                  <div className="text-red-500 font-medium mb-2">
                                    {getIn(errors, "email")}
                                  </div>
                                )}
                            </div>
                            <div className="w-full mb-2 md:mb-3">
                              <label
                                className="block mb-2 font-medium text-[var(--text-color)]"
                                htmlFor="phoneNumber"
                              >
                                Contact No{" "}
                                <span className="text-red-500 ml-1">*</span>
                              </label>

                              <Field
                                as={NumberField}
                                id="phoneNumber"
                                name="phoneNumber"
                                type="Number"
                                required
                                maxLength={10}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const { value } = e.target;
                                  if (/^\d{0,10}$/.test(value)) {
                                    // Update formik value if it passes validation
                                    setFieldValue("phoneNumber", value);
                                  }
                                }}
                                className={`block w-full !pl-14 border text-base border-[#73727366] rounded-lg py-2 px-4 focus:bg-white focus:outline-none ${
                                  getIn(errors, "phoneNumber") &&
                                  getIn(touched, "phoneNumber")
                                    ? "border-red-500 mb-0.5"
                                    : ""
                                }`}
                              />
                              {getIn(errors, "phoneNumber") &&
                                getIn(touched, "phoneNumber") && (
                                  <div className="text-red-500 font-medium mb-2">
                                    {getIn(errors, "phoneNumber")}
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className="flex justify-center ">
                            <Button
                              variant="highlighted"
                              type="submit"
                              className="rounded-lg text-sm font-bold flex items-center !py-4 !px-7"
                            >
                              {isSubmitting ? (
                                <>
                                  <SpinnerLoader />
                                </>
                              ) : (
                                <>
                                  Get special VIP pass | Register Now
                                  <ArrowIcon
                                    color="white"
                                    className="rotate-180 ml-2"
                                  />
                                </>
                              )}
                            </Button>
                          </div>
                          {showSuccessMessage && (
                            <div className="text-red-500 text-center md:mb-2 font-bold">
                              {showSuccessMessage}
                            </div>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPopup;
