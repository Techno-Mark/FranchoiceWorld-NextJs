import Image from "next/image";
import styles from "./ourservice.module.css";
const OurService = () => {
  const serviceItem = [
    {
      id: "first",
      serviceIcon: "/franchiseListing.svg",
      serviceText: "Franchise Listing",
    },
    {
      id: "second",
      serviceIcon: "/franchiseAdvisor.svg",
      serviceText: "Franchise Advisor",
    },
    {
      id: "third",
      serviceIcon: "/franchiseGrowth.svg",
      serviceText: "Franchise Growth",
    },
  ];
  return (
    <section className={`py-20 ${styles.ourService}`}>
      <div className="container">
        <h3 className="text-3xl font-bold text-white text-center mb-8">
          Our Services
        </h3>
        <ul className="flex gap-4 flex-col md:flex-row ">
          {serviceItem.map((x) => (
            <>
              <li
                key={x.id}
                className={`flex w-full items-center justify-around px-6 py-4 ${styles.serviceBox}`}
              >
                <Image
                  src={x.serviceIcon}
                  alt={x.serviceText}
                  width={73}
                  height={73}
                />
                <h4 className="text-white font-semibold text-lg w-2/5">
                  {x.serviceText}
                </h4>
              </li>
            </>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurService;
