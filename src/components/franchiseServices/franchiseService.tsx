import Image from "next/image";
import styles from "./franchiseService.module.css";
import Link from "next/link";
import Title from "../title/title";

// Define the type for a service item
interface ServiceItem {
  id: string;
  serviceIcon: string;
  serviceText: string;
  redirectURL: string;
}

// Define the props for the OurServiceGrid component
interface OurServiceGridProps {
  title: string;
  subtitle?: string;
  bottomDesc?: string;
  services: ServiceItem[];
}

const FranchiseService: React.FC<OurServiceGridProps> = ({
  title = "Our Services",
  subtitle,
  services,
  bottomDesc,
}) => {
  return (
    <section className={`py-10 md:pt-20 ${styles.ourService}`}>
      <div className="container">
        <Title
          title={title}
          desc={subtitle ? subtitle : ""}
          descClass="md:!px-0 pb-8 font-medium text-xl !text-center text-[var(--white-color)]"
          titleClass="md:!pb-2.5 !text-center !text-[var(--white-color)]"
        />
        <div className="flex justify-center flex-wrap">
          {services.map((service) => (
            <div
              key={service.id}
              className={`${styles.serviceBox} min-h-[56px] mx-2 mb-4 w-full max-w-[156px] md:max-w-[270px] md:min-h-[114px] group p-4`}
            >
              <Link
                className="flex  items-center justify-center h-full"
                href={service.redirectURL}
              >
                <Image
                  src={service.serviceIcon}
                  alt={service.serviceText}
                  width={42}
                  height={42}
                  className={`${styles.serviceIcn} `}
                />
                <h4 className="text-white font-normal text-xs md:text-xl text-center group-hover:text-xl group-hover:text-[var(--footer-bg)]">
                  {service.serviceText}
                </h4>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-14 flex justify-center items-center">
          <span className="text-[var(--white-color)] text-xl ">
            {bottomDesc}
          </span>
        </div>
      </div>
    </section>
  );
};

export default FranchiseService;
