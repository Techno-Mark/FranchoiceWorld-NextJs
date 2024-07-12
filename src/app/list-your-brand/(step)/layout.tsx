"use client";
import { useEffect } from "react";
import Stepper from "@/components/stepper/stepper";
import Title from "@/components/title/title";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./steps.module.css";
import { getStepProgress } from "@/utills/stepProgress";

const StepLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const stepPaths = [
    "/list-your-brand/step_1",
    "/list-your-brand/step_2",
    "/list-your-brand/step_3",
    "/list-your-brand/step_4",
  ];

  useEffect(() => {
    const allowedSteps = getStepProgress();
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
    title: [
      "Enter Your Confidential Information",
      "Essential Details Required",
      "Investment Details Needed",
      "Upload Brochures, Logos, and More",
    ][index],
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
          <div className="text-center py-6 md:pt-10 md:pb-12 w-full md:w-1/2 mx-auto">
            <Title
              title="You are currently in the process of listing your brand."
              varient="white"
            />
          </div>
          <div className="flex md:flex-row justify-between w-full md:w-[740px] lg:w-4/5 mx-auto">
            {steps.map((step, index) => (
              <div
                className="relative w-1/4 xl:w-auto xl:max-w-[170px]"
                key={index}
              >
                <Stepper
                  className={`!flex-col ${styles.stepperClass}`}
                  stepBoxClass="!w-auto md:!w-[170px]"
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
            className={`bg-white p-6 md:pt-16 md:pb-9 md:px-24 rounded mx-auto ${styles.formPart}`}
          >
            {children}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepLayout;
