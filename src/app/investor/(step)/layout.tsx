"use client";
import { useEffect } from "react";
import Stepper from "@/components/stepper/stepper";
import Title from "@/components/title/title";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./investorsteps.module.css";
import { getInvestorStepProgress } from "@/utills/stepProgress";
import Faq from "@/components/faq/faq";

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
      <Faq />
    </div>
  );
};

export default InvestorStepLayout;
