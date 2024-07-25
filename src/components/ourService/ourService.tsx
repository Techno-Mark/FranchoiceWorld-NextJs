import Image from "next/image";
import styles from "./ourservice.module.css";
import Link from "next/link";
const OurService = () => {
  const serviceItem = [
    {
      id: "first",
      serviceIcon: "/images/franchiseListing.svg",
      serviceText: "Franchise Listing",
      redirectURL: "/service/franchise-listing",
    },
    {
      id: "second",
      serviceIcon: "/images/franchiseAdvisor.svg",
      serviceText: "Franchise Advisory",
      redirectURL: "/service/franchise-advisor",
    },
    {
      id: "third",
      serviceIcon: "/images/franchiseGrowth.svg",
      serviceText: "Franchise Growth",
      redirectURL: "/service/franchise-growth",
    },
  ];
  return (
    <section className={`py-10 md:py-20 ${styles.ourService}`}>
      <div className="container">
        <h3 className="text-3xl font-bold text-white text-center mb-8">
          Our Services
        </h3>
        <ul className="flex gap-4 flex-col md:flex-row">
          {serviceItem.map((x) => (
            <>
              <li
                key={x.id}
                className={`flex w-full items-center justify-around md:justify-between ${styles.serviceBox} group px-3 md:px-6`}
              >
                <Link
                  className="flex items-center justify-around px-6 py-4"
                  href={x.redirectURL}
                >
                  <Image
                    src={x.serviceIcon}
                    alt={x.serviceText}
                    width={73}
                    height={73}
                    className={styles.serviceIcn}
                  />
                  <h4 className="text-white font-semibold text-lg w-2/5 group-hover:text-[var(--footer-bg)]">
                    {x.serviceText}
                  </h4>
                </Link>
              </li>
            </>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurService;
