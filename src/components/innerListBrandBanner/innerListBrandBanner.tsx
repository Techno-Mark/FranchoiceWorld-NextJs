"use client";

// import { updateStepProgress } from "@/utills/stepProgress";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { GoCheckCircle } from "react-icons/go";
import Button from "../button/button";
import CountryDropdown from "../countryDropdown/countryDropdown";
import styles from "./innerlistbrandbanner.module.css";

const InnerListBrandBanner = () => {
  const router = useRouter();
  const handleListBrandSubmit = (e: FormEvent) => {
    e.preventDefault();
    // updateStepProgress("/list-your-brand/step_1");
    router.push("/list-your-brand/step_1");
    console.log(e.target);
  };

  return (
    <section className={`py-8 md:py-20 ${styles.innerListBrandBanner}`}>
      <div className="container">
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-8">
          <div className={`w-full ${styles.listBrandBannerText}`}>
            <h3 className={`font-extrabold ${styles.innerBrandTitle}`}>
              List Your Brand
            </h3>
            <h4 className={styles.innerBrandSubtitle}>
              Put your brand in the spotlight!
            </h4>
            <form
              className={`flex gap-1 md:gap-3 md:flex-row md:items-normal justify-center lg:justify-start w-full max-w-[565px]`}
              onSubmit={handleListBrandSubmit}
            >
              <CountryDropdown />
              <input
                type="number"
                placeholder="Enter Mobile No."
                className={`rounded-md w-full font-medium text-lg bg-white border border-gray-300 cursor-pointer focus:outline-none ${styles.InputStyle}`}
                pattern="[0-9]{5} [0-9]{5}"
                maxLength={11}
              />
              <Button
                variant="highlighted"
                className="rounded-md !px-2 md:!px-4"
              >
                <div className="flex whitespace-nowrap gap-1 md:gap-2 items-center text-[11px] md:text-base">
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
            </form>
            <ul className="pt-12 pb-8">
              <li className="flex items-center gap-2.5 pb-4">
                <GoCheckCircle size={20} className="text-[#33A6D1]" />
                <span className="font-bold w-[calc(100%-20px)]">
                  Gain access to a broad audience of potential franchisees.
                </span>
              </li>
              <li className="flex items-center gap-2.5 pb-4">
                <GoCheckCircle size={20} className="text-[#33A6D1]" />
                <span className="font-bold w-[calc(100%-20px)]">
                  Receive pre-screened, highly qualified leads from individuals.
                </span>
              </li>
              <li className="flex items-center gap-2.5 pb-4">
                <GoCheckCircle size={20} className="text-[#33A6D1]" />
                <span className="font-bold w-[calc(100%-20px)]">
                  Navigate expansion challenges and achieve sustainable growth.
                </span>
              </li>
            </ul>
            <p className={`pb-6 md:pb-12 ${styles.agreePolicy}`}>
              By continuing, you agree to our{" "}
              <Link className="underline decoration-current" href="#">
                Terms of Use
              </Link>
              ,{" "}
              <Link className="underline decoration-current" href="#">
                Privacy
              </Link>{" "}
              &{" "}
              <Link className="underline decoration-current" href="#">
                Infringement Policy
              </Link>
            </p>
          </div>
          <div className={`w-full`}>
            <Image
              className={`w-full object-contain max-w-[461px] ml-auto`}
              src="/images/innerListBrandBanner.png"
              alt="List your Brand"
              width={461}
              height={378}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnerListBrandBanner;
