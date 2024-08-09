import AskBanner from "@/components/exportAsk/askBanner";
import FranchiseBanner from "@/components/franchiseBanner/franchiseBanner";
import FranchiseService from "@/components/franchiseServices/franchiseService";
import InquireForm from "@/components/inquireForm/inquireForm";
import WhyChoose from "@/components/whyChoose/whyChoose";

const innerBanner = {
  bannerImage: "/images/franchise-groth/franchise-grothBanner.png",
  SectionTitle: "Franchise Growth Services",
  desc: "",
  items: [
    {
      text: "Indian franchise industry, currently valued at Rs. 800 billion, is growing at the rate of 30-35% annually.",
      boldParts: [
        "Rs. 800 billion, is growing at the rate of 30-35% annually.",
      ],
    },
    {
      text: "It is a fast-paced industry that is growing significantly. With our expert guidance and assistance, you can kickstart a smooth franchising journey!",
    },
  ],
};

const serviceItems = [
  {
    id: "first",
    serviceIcon: "/images/franchise-groth/Blue-Franchise.svg",
    serviceText: "Franchise Modelling",
  },
  {
    id: "second",
    serviceIcon: "/images/franchise-groth/Financial.svg",
    serviceText: "Financial Modelling",
  },
  {
    id: "third",
    serviceIcon: "/images/franchise-groth/Blue-FranchiseDevelopment.svg",
    serviceText: "Franchise Development ",
  },
];

const cardBox = [
  {
    chooseImage: "/images/franchise-groth/Experience.svg",
    chooseTitle: "Expertise and Experience",
    list: [
      "Proven strategies as an outcome of extensive experience and extraordinary expertise, thus reducing trial and error.",
    ],
  },
  {
    chooseImage: "/images/franchise-groth/selfGrowth.svg",
    chooseTitle: "Faster Market Penetration",
    list: [
      "Accelerated growth through our established network of top-notch brands, franchises, and entrepreneurs.",
    ],
  },
  {
    chooseImage: "/images/franchise-groth/AdvancedTool.svg",
    chooseTitle: "Advanced Tools and Technologies",
    list: [
      "Access to state-of-the-art franchise management software, marketing tools, and futuristic technologies.",
    ],
  },
  {
    chooseImage: "/images/franchise-groth/Honesty.svg",
    hoverImage: "/realestate_gray.svg",
    chooseTitle: "Trust and Credibility",
    list: [
      "Well-established trust and credibility of the parent company in the market. ",
    ],
  },
];

const FranchiseGroth = () => {
  return (
    <>
      <FranchiseBanner props={innerBanner} />
      <div className="relative">
        <FranchiseService
          title="Our Franchise Growth Services"
          subtitle="We at Franchoice World, offer franchise growth services that provide the right momentum for your brand's franchising business."
          services={serviceItems}
          bottomDesc="Make your brand franchising experience seamless and rewarding with us."
          className="min-h-[56px] mx-1 w-1/2 mb-4 md:mb-8 max-w-[156px] md:mx-7 md:w-full lg:w-1/4 md:max-w-[270px] md:h-[114px] p-4"
        />
        <div className="my-20">
          <WhyChoose
            title="Benefits of Growing with Franchoice World "
            cardBox={cardBox}
            hideKnowMore
            disableLi
          />
        </div>
        <AskBanner />
        <InquireForm pageForm="Franchise Growth"/>
      </div>
    </>
  );
};

export default FranchiseGroth;
