"use client";
import Image from "next/image";
import Button from "../button/button";
import CountryDropdown from "../countryDropdown/countryDropdown";
import styles from "./listbrandbanner.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateStepProgress } from "@/utills/stepProgress";

interface listBrandProps {
  className?: String;
}

const ListBrandBanner: React.FC<listBrandProps> = ({ className }) => {
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
    localStorage.setItem("mobileNumber", mobileNumber);
    localStorage.setItem("selectedCountry", selectedCountry);
    updateStepProgress("/list-your-brand/step_1");
    router.push("/list-your-brand/step_1");
  };

  return (
    <section className={`py-8 ${className}`}>
      <div className="container !px-0 md:!px-[12px] lg:!px-[15px]">
        <div className={`grid md:grid-cols-3 ${styles.listBrandBanner}`}>
          <div className="hidden lg:block relative">
            <Image
              src={"/images/womenBrandBanner.png"}
              width={250}
              height={250}
              alt="List Brand"
              className={`absolute bottom-0 left-0 ${styles.brandWomenImg}`}
            />
          </div>
          <div className="flex flex-col col-span-3 lg:col-span-2">
            <div className="w-full lg:w-5/6 mx-auto">
              <h3 className={`text-center lg:text-left ${styles.brandTitle}`}>
                List Your Brand
              </h3>
              <form
                className={`relative flex gap-3 flex-wrap md:flex-nowrap md:flex-row md:items-normal justify-center lg:justify-start`}
                onSubmit={handleListBrandSubmit}
              >
                <CountryDropdown className="bg-white" />
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
                  className="flex items-center py-3 mt-2 md:mt-0 rounded-md"
                >
                  Start Now
                  <svg
                    className={`ml-2 ${styles.arrowIcn}`}
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
                </Button>
                {error && (
                  <p className="absolute text-red-500 left-0 bottom-[-25px] font-semibold">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListBrandBanner;
