import Image from "next/image";
import styles from "./steps.module.css";
import Title from "@/components/title/title";
import Stepper from "@/components/stepper/stepper";
const steps = [
  {
    icon: "/listStep/step1.gif",
    title: "Confidential Information",
  },
  {
    icon: "/listStep/step2.gif",
    title: "Essential Details",
  },
  {
    icon: "/listStep/step3.gif",
    title: "Investment Details",
  },
  {
    icon: "/listStep/step4.gif",
    title: "Upload Brochures, Logos, and More",
  },
];
function StepLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className={`relative pb-20 ${styles.stepBanner}`}>
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover z-[-2]"
          src="/listStep/listYourBrand.png"
          alt="stepBanner"
          width={1920}
          height={700}
        />
        <div className="container">
          <div className="text-center pt-8 w-full md:w-1/2 mx-auto">
            <Title
              title="You are currently in the process of listing your brand."
              varient="white"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4">
            {steps.map((step, index) => (
              <div className="relative md:max-w-[180px]" key={index}>
                <Stepper
                  className={styles.stepperClass}
                  icon={step.icon}
                  title={step.title}
                />
                {index < steps.length - 1 && (
                  <div
                    className={`h-px bg-gray-300 w-1/2 md:w-full absolute ${styles.stepDivider}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {children}
    </>
  );
}

export default StepLayout;
