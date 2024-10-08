import Stepper from "../stepper/stepper";
import Title from "../title/title";
import styles from "./listingsimplesteps.module.css";
const steps = [
  {
    icon: "/images/listStep/step1.gif",
    title: "Confidential Information",
    description:
      "Personal information like name, email address, and contact details",
  },
  {
    icon: "/images/listStep/step2.gif",
    title: "Essential Details",
    description: "Brand details like name, industry, location, and others",
  },
  {
    icon: "/images/listStep/step3.gif",
    title: "Investment Details",
    description: "Investment details like franchise fee, investment range",
  },
  {
    icon: "/images/listStep/step4.gif",
    title: "Upload Brochures, Logos, and More",
    description: "Brand details like brochure, logo, and images",
  },
];

const ListingSimpleSteps = () => {
  return (
    <section className="pt-6 md:pb-12">
      <div className="container">
        <div className="text-center w-full md:w-3/5 mx-auto pb-10 md:pb-4">
          <Title
            title="Brand Listing in Four Simple Steps"
            desc="Maximum visibility and reach, just a few clicks away! Effortlessly showcase your brand with our easy-to-follow listing steps."
            descClass="font-medium"
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start lg:space-x-4">
          {steps.map((step, index) => (
            <div className="relative lg:max-w-[180px]" key={index}>
              <Stepper
                className={styles.stepperClass}
                icon={step.icon}
                title={step.title}
                description={step.description}
                stepBoxClass="ml-4 md:ml-0 !text-left lg:!text-center"
              />
              {index < steps.length - 1 && (
                <div
                  className={`h-px bg-black w-1/2 lg:w-full absolute ${styles.stepDivider}`}
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
