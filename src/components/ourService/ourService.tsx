import Image from "next/image";
import styles from "./ourservice.module.css";
import Link from "next/link";

// Define the type for a service item
interface ServiceItem {
  id: string;
  serviceIcon: string;
  serviceText: string;
  redirectURL: string;
}

// Define the props for the OurService component
interface OurServiceProps {
  title?: string;
  services: ServiceItem[];
}

const OurService: React.FC<OurServiceProps> = ({
  title = "Our Services",
  services,
}) => {
  return (
    <section className={`py-10 md:py-20 ${styles.ourService}`}>
      <div className="container">
        <h3 className="text-3xl font-bold text-white text-center mb-8">
          {title}
        </h3>
        <ul className="flex gap-4 flex-col md:flex-row">
          {services.map((service) => (
            <li
              key={service.id}
              className={`flex w-full items-center justify-around md:justify-between ${styles.serviceBox} group px-3 md:px-6`}
            >
              <Link
                className="flex items-center justify-around px-6 py-4"
                href={service.redirectURL}
              >
                <Image
                  src={service.serviceIcon}
                  alt={service.serviceText}
                  width={73}
                  height={73}
                  className={styles.serviceIcn}
                />
                <h4 className="text-white font-semibold text-lg w-2/5 group-hover:text-[var(--footer-bg)]">
                  {service.serviceText}
                </h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurService;
