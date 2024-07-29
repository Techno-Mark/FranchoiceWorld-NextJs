import Image from "next/image";
import styles from "./franchiseService.module.css";
import Link from "next/link";
import Title from "../title/title";
interface ServiceItem {
  id: string;
  serviceIcon: string;
  serviceText: string;
  redirectURL?: string;
}

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
          titleClass="!text-center !text-[var(--white-color)]"
        />
        <div className="flex justify-center flex-wrap mt-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`${styles.serviceBox} min-h-[56px] mx-1 w-1/2 mb-4 max-w-[156px] md:mx-2 md:w-full md:max-w-[270px] md:h-[114px] group p-4`}
            >
              <Link
                className="flex items-center justify-center h-full"
                href={
                  (service.redirectURL && service.redirectURL) ||
                  "javascript:void(0);"
                }
              >
                <Image
                  src={service.serviceIcon}
                  alt={service.serviceText}
                  width={42}
                  height={42}
                  className={`${styles.serviceIcn}`}
                />
                <h4 className="text-white font-normal text-xs md:text-xl pl-2 md:pl-4 group-hover:text-xl group-hover:text-[var(--footer-bg)]">
                  {service.serviceText}
                </h4>
              </Link>
            </div>
          ))}
        </div>
        {bottomDesc && (
          <div className="mt-14 flex justify-center items-center">
            <span className="text-[var(--white-color)] text-xl ">
              {bottomDesc}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default FranchiseService;
