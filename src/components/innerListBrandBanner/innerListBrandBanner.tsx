"use client";

// import { updateStepProgress } from "@/utills/stepProgress";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { GoCheckCircle } from "react-icons/go";
import Button from "../button/button";
import CountryDropdown from "../countryDropdown/countryDropdown";
import styles from "./innerlistbrandbanner.module.css";
import {
  updateInvestorStepProgress,
  updateStepProgress,
} from "@/utills/stepProgress";
interface InnerBannerProps {
  props: {
    bannerImage?: string;
    submitURL: string;
    SectionTitle: string;
    desc?: string;
    items: string[];
    noborder?: boolean;
    imageOnLeft?: boolean;
    bannerImageTxt?: string;
  };
}

const InnerListBrandBanner: React.FC<InnerBannerProps> = ({ props }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleListBrandSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (mobileNumber.trim() === "") {
      setError("Mobile number is required.");
      return;
    }
    if (mobileNumber.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    setError(null); // Clear any existing error messages
    if (props.submitURL === "/investor/step_1") {
      localStorage.setItem("investorMobileNumber", mobileNumber);
      localStorage.setItem("investorSelectedCountry", selectedCountry);
      updateInvestorStepProgress("/investor/step_1");
    } else {
      localStorage.setItem("mobileNumber", mobileNumber);
      localStorage.setItem("selectedCountry", selectedCountry);
      updateStepProgress("/list-your-brand/step_1");
    }
    router.push(props.submitURL);
  };

  return (
    <section className={`py-8 md:py-20 ${styles.innerListBrandBanner}`}>
      <div className="container">
        <div
          className={`flex items-start flex-wrap lg:flex-nowrap gap-8 ${
            props.imageOnLeft ? "" : "flex-row-reverse"
          }`}
        >
          <div
            className={`w-full max-w-[250px] mx-auto md:max-w-full ${
              props.imageOnLeft ? "lg:ml-auto" : "lg:mr-auto"
            }`}
          >
            {props.bannerImage && (
              <Image
                className={`w-full object-contain max-w-[461px] ml-auto md:mr-auto lg:mr-0  ${
                  props.imageOnLeft ? "lg:mr-auto lg:ml-0" : "lg:ml-auto"
                }`}
                src={props.bannerImage}
                alt="List your Brand"
                width={461}
                height={378}
              />
            )}
            {props.bannerImageTxt && (
              <h3 className="text-3xl md:text-5xl font-light text-right ml-auto max-w-[400px] mt-8 md:mt-20">
                {props.bannerImageTxt}
              </h3>
            )}
          </div>
          <div
            className={`w-full ${styles.listBrandBannerText} ${
              props.imageOnLeft ? "lg:pl-8" : "lg:pr-8"
            }`}
          >
            <h3
              className={`font-extrabold ${styles.innerBrandTitle}  ${
                props.imageOnLeft ? styles.innerBrandTitleHome : ""
              }`}
            >
              {props.SectionTitle}
            </h3>
            <h4
              className={
                props.imageOnLeft
                  ? styles.innerBrandDescHome
                  : styles.innerBrandSubtitle
              }
            >
              {props.desc}
            </h4>
            <form
              className={`relative flex gap-1 md:gap-3 md:flex-row md:items-normal justify-center lg:justify-start w-full md:max-w-[565px]`}
              onSubmit={handleListBrandSubmit}
            >
              <CountryDropdown
                value={selectedCountry} // Optional: remove if you don't want to control it
                onChange={setSelectedCountry}
              />
              <input
                type="number"
                placeholder="Enter Mobile No."
                className={`rounded-md w-full font-medium text-lg bg-white border border-gray-300 cursor-pointer focus:outline-none ${styles.InputStyle}`}
                pattern="[0-9]{5} [0-9]{5}"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only numbers and limit to 10 digits
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setMobileNumber(value);
                  }
                }}
                onKeyDown={(e) => {
                  // Prevent entering non-numeric characters
                  if (
                    e.key === "." ||
                    e.key === "-" ||
                    e.key === "e" ||
                    e.key === "E"
                  ) {
                    e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const pastedData = e.clipboardData.getData("Text");
                  // Allow only numbers and limit to 10 digits
                  if (
                    !/^\d*$/.test(pastedData) ||
                    mobileNumber.length + pastedData.length > 10
                  ) {
                    e.preventDefault();
                  }
                }}
                maxLength={10}
              />
              <Button
                variant="highlighted"
                type="submit"
                className="rounded-md !px-2 md:!px-4"
              >
                <div className="flex whitespace-nowrap gap-1 md:gap-2 items-center text-[11px] md:text-[14px]">
                  Start Now{" "}
                  <svg
                    className={styles.arrowIcn}
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
              {error && (
                <p className="absolute text-red-500 left-0 bottom-[-25px] font-semibold">
                  {error}
                </p>
              )}
            </form>
            <ul className="pt-12 pb-8">
              {props.items.map((x, index) => (
                <li key={index} className="flex items-center gap-2.5 pb-4">
                  <GoCheckCircle size={20} className="text-[#33A6D1]" />
                  <span className="font-bold w-[calc(100%-20px)]">{x}</span>
                </li>
              ))}
            </ul>
            <p
              className={`pb-6 md:pb-12 text-[12px] ${styles.agreePolicy} ${
                props.noborder ? "!border-b-0" : ""
              }`}
            >
              By continuing, you agree to our{" "}
              <Link
                className="underline decoration-current"
                href="/term-conditions"
                target="_blank"
              >
                Terms of Use
              </Link>
              ,{" "}
              <Link
                className="underline decoration-current"
                href="/privacy-policy"
                target="_blank"
              >
                Privacy
              </Link>{" "}
              &{" "}
              <Link
                className="underline decoration-current"
                href="/legal"
                target="_blank"
              >
                Infringement Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerListBrandBanner;
