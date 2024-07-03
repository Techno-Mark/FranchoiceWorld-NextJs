import Stepper from "../stepper/stepper";
import Title from "../title/title";
import styles from "./listingsimplesteps.module.css";
const steps = [
  {
    icon: "/listStep/step1.gif",
    title: "Confidential Information",
    description:
      "Personal information like name, email address, and contact details",
  },
  {
    icon: "/listStep/step2.gif",
    title: "Essential Details",
    description: "Brand details like name, industry, location, and others",
  },
  {
    icon: "/listStep/step3.gif",
    title: "Investment Details",
    description: "Investment details like franchise fee, investment range",
  },
  {
    icon: "/listStep/step4.gif",
    title: "Upload Brochures, Logos, and More",
    description: "Brand details like brochure, logo, and images",
  },
];

const ListingSimpleSteps = () => {
  return (
    <section className="pt-6 md:pb-12">
      <div className="container">
        <div className="text-center w-3/5 mx-auto pb-10 md:pb-4">
          <Title
            title="Brand Listing in Four Simple Steps"
            desc="Maximum visibility and reach, just a few clicks away! Effortlessly showcase your brand with our easy-to-follow listing steps."
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center md:space-x-4">
          {steps.map((step, index) => (
            <div className="relative md:max-w-[180px]" key={index}>
              <Stepper
                className={styles.stepperClass}
                icon={step.icon}
                title={step.title}
                description={step.description}
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
  );
};

export default ListingSimpleSteps;
