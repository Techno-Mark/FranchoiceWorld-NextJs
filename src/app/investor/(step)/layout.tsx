"use client";
import { useEffect } from "react";
import Stepper from "@/components/stepper/stepper";
import Title from "@/components/title/title";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./investorsteps.module.css";
import { getInvestorStepProgress } from "@/utills/stepProgress";
import Faq from "@/components/faq/faq";
import Link from "next/link"

const InvestorStepLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const stepPaths = ["/investor/step_1", "/investor/step_2"];

  useEffect(() => {
    const allowedSteps = getInvestorStepProgress();
    if (!allowedSteps.includes(pathname)) {
      const lastAllowedStep =
        allowedSteps[allowedSteps.length - 1] || stepPaths[0];
      router.replace(lastAllowedStep);
    }
  }, [pathname, router]);

  const steps = stepPaths.map((path, index) => ({
    children: (
      <div
        className={`w-3 h-3 md:w-5 md:h-5 lg:w-9 lg:h-9 mb-2 ${
          stepPaths.indexOf(pathname) >= index
            ? "bg-white border border-white"
            : "border border-white"
        } rounded-full`}
      ></div>
    ),
    title: ["Personal Details", "Investment Details"][index],
    active: stepPaths.indexOf(pathname) >= index,
  }));

  const faqItems = [
    {
      title: "How can I find franchises for investment on your portal?",
      content: (
        <>
          <p>
            You can go to the &apos;Find Your Franchise&apos; tab on Home Page
            and select the brand as per your required category, in terms of
            industry, sector, and products/services. You can further filter
            based on your desired location and investment criteria.
          </p>
        </>
      ),
    },
    {
      title:
        "What benefits would I receive by investing in a franchise on your portal?",
      content: (
        <>
          <p>
            Investing in a franchise from Franchoice World would help you avail
            ample benefits like:
          </p>
          <ul className="list-disc">
            <li className="ml-4">Expert Guidance</li>
            <li className="ml-4">Wide Range of Selection</li>
            <li className="ml-4">End-to-End Support</li>
            <li className="ml-4">Market Insights</li>
          </ul>
        </>
      ),
    },
    {
      title:
        "What are the terms and conditions of investing in a franchise on your portal?",
      content: (
        <p>
          To know about our policies and terms and conditions, head to our{" "}
          <Link href="/term-conditions">Terms of Use </Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>{" "} pages before
          filling the investor form.
        </p>
      ),
    },
    {
      title: "How can I benefit from franchise growth services on your portal?",
      content: (
        <p>
          Our Franchise Growth services consist of franchise modelling,
          financial modelling, and franchise development that would help
          nurture, develop, and expand your brand.
        </p>
      ),
    },
    {
      title:
        "How can I look for franchise investment opportunities in my location?",
      content: (
        <p>
          Our &apos;Find Your Franchise&apos; section on Home Page allows you to
          filter out your franchises as per the categories, investment, and
          location of your choice.
        </p>
      ),
    },
  ];

  return (
    <div>
      <section className={`relative pb-24 md:pb-36 ${styles.stepBanner}`}>
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
          src="/images/listStep/listYourBrand.png"
          alt="stepBanner"
          width={1920}
          height={700}
        />
        <div className="container">
          <div className="text-center py-6 md:pt-10 md:pb-12 w-full lg:w-1/2 mx-auto">
            <Title
              title="You are currently in the process of filling investment form."
              varient="white"
            />
          </div>
          <div className="flex md:flex-row justify-center lg:justify-between w-full md:w-[390px] lg:w-1/3 mx-auto">
            {steps.map((step, index) => (
              <div
                className="relative w-1/4 xl:w-full md:max-w-[154px]"
                key={index}
              >
                <Stepper
                  className={`!flex-col ${styles.stepperClass}`}
                  stepBoxClass="!w-[80px] md:!w-[130px]"
                  title={step.title}
                  titleClass={`!text-white w-full w-4/5 mx-auto !text-[10px] lg:!text-[16px] ${
                    stepPaths.indexOf(pathname) >= index
                      ? "opacity-100"
                      : "opacity-50"
                  }`}
                >
                  {step.children}
                </Stepper>
                {index < steps.length - 1 && (
                  <div
                    className={`h-px bg-gray-300 w-1/2 md:w-2/3 lg:w-full absolute ${styles.stepDivider}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={`relative ${styles.halfBanner}`}>
        <div className="container">
          <div
            className={`bg-white p-6 md:p-10 lg:pt-16 lg:pb-9 lg:px-24 rounded mx-auto ${styles.formPart}`}
          >
            {children}
          </div>
        </div>
      </section>
      <Faq
        title="FAQs"
        description="Let us answer some of your most common queries."
        additionalMessage="Feel free to contact us in case of any more questions!"
        items={faqItems}
      />
    </div>
  );
};

export default InvestorStepLayout;
