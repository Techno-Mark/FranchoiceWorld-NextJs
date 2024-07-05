import Link from "next/link";
import Image from "next/image";
import Card from "../card/card";
import Title from "../title/title";
import styles from "./whychoose.module.css";

interface CardItem {
  chooseImage: string;
  chooseTitle: string;
  hoverImage: string;
  list: string[];
}

const cardBox: CardItem[] = [
  {
    chooseImage: "/images/brandOwner.svg",
    hoverImage: "/brandOwner_gray.svg",
    chooseTitle: "Brand Owner",
    list: ["Increased Visibility", "Qualified Leads", "Expert Matching"],
  },
  {
    chooseImage: "/images/investor.svg",
    hoverImage: "/investor_gray.svg",
    chooseTitle: "Investor",
    list: ["Personalized Matching", "Expert Guidance", "Extensive Network"],
  },
  {
    chooseImage: "/images/independentPartner.svg",
    hoverImage: "/independentPartner_gray.svg",
    chooseTitle: "Independent Franchise Partner",
    list: ["Brand Recognition", "Operational Support", "Risk Mitigation"],
  },
  {
    chooseImage: "/images/realestate.svg",
    hoverImage: "/realestate_gray.svg",
    chooseTitle: "Real Estate Developer",
    list: [
      "Diversified Revenue Stream",
      "Steady Demand",
      "Long-term Lease Agreements",
    ],
  },
];

const WhyChoose: React.FC = () => {
  return (
    <section className={styles.whyChoose}>
      <div className="container">
        <div className={`text-center ${styles.titlePart}`}>
          <Title
            title="Why Choose Franchoice World?"
            desc="Access expert insights and tailored franchise opportunities that align with your goal, only with Franchoice World."
          />
        </div>
        <div className="flex flex-wrap gap-y-4">
          {cardBox.map(
            ({ chooseImage, chooseTitle, list, hoverImage }, index) => (
              <div key={index} className="px-2 md:px-3 w-1/2 lg:w-1/4">
                <Card className={`h-full mb-4 md:mb-0 ${styles.whyChooseCard}`}>
                  <Link
                    href="#"
                    className={`w-full flex flex-col justify-between h-full ${styles.cardItems}`}
                  >
                    <div className="flex justify-start md:justify-between flex-col h-full">
                      <div>
                        <Image
                          className={styles.chooseImg}
                          src={chooseImage}
                          alt={chooseTitle}
                          width={60}
                          height={60}
                        />
                        <h4 className={styles.chooseTitle}>{chooseTitle}</h4>
                      </div>
                      <ul className={styles.chooseBenifits}>
                        {list.map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`flex items-center gap-2 font-bold ${styles.knowMore}`}
                    >
                      Know More
                      <svg
                        width="19"
                        height="9"
                        viewBox="0 0 19 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className={styles.svgPath}
                          d="M18.3677 3.98622C18.3675 3.98601 18.3673 3.98575 18.3671 3.98553L14.5746 0.211352C14.2905 -0.0713852 13.8309 -0.070333 13.5481 0.213819C13.2653 0.497935 13.2664 0.957478 13.5505 1.24025L16.0968 3.77418H0.725804C0.324943 3.77418 0 4.09912 0 4.49998C0 4.90084 0.324943 5.22579 0.725804 5.22579H16.0968L13.5506 7.75971C13.2665 8.04249 13.2654 8.50203 13.5482 8.78615C13.831 9.07034 14.2905 9.07131 14.5746 8.78861L18.3671 5.01443C18.3673 5.01421 18.3675 5.01396 18.3677 5.01374C18.652 4.73003 18.6511 4.269 18.3677 3.98622Z"
                        />
                      </svg>
                    </div>
                  </Link>
                </Card>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
