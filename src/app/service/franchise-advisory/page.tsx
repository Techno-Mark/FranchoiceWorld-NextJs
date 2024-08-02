import AdvisoryService from "@/components/advisoryService/advisoryService";
import AskBanner from "@/components/exportAsk/askBanner";
import FranchiseBanner from "@/components/franchiseBanner/franchiseBanner";
import FranchiseService from "@/components/franchiseServices/franchiseService";
import InquireForm from "@/components/inquireForm/inquireForm";

const innerBanner = {
  bannerImage: "/images/franchise-advisoryBanner.png",

  SectionTitle: "Franchise Advisory Services",
  desc: "An Insight into the Current Franchise Industry",
  items: [
    {
      text: "Franchising is a rapidly growing business that has taken over the global market.",
    },
    {
      text: "Global franchise market hits $100.7 billion in 2021-22, and is projected to grow at a CAGR of 9.73% by 2030.",
      boldParts: ["$100.7 billion in 2021-22,", "CAGR of 9.73% by 2030."],
    },
    {
      text: "India is one of the leading global franchise markets, ranking second in the world.",
    },
  ],
};

const serviceItems = [
  {
    id: "first",
    serviceIcon: "/images/franchise-advisory/Brand.svg",
    serviceText: "Brand Development ",
    // redirectURL: "/service/franchise-listing",
  },
  {
    id: "second",
    serviceIcon: "/images/franchise-advisory/Find.svg",
    serviceText: "Finding Franchisees",
    // redirectURL: "/service/franchise-advisor",
  },
  {
    id: "third",
    serviceIcon: "/images/franchise-advisory/Presentation.svg",
    serviceText: "Training and Guidance",
    // redirectURL: "/service/franchise-growth",
  },
  {
    id: "fourth",
    serviceIcon: "/images/franchise-advisory/Legal.svg",
    serviceText: "Legal Support",
    // redirectURL: "/service/franchise-growth",
  },
  {
    id: "fifth",
    serviceIcon: "/images/franchise-advisory/Usa.svg",
    serviceText: "Territory Management",
    // redirectURL: "/service/franchise-growth",
  },
  {
    id: "sixth",
    serviceIcon: "/images/franchise-advisory/Hierarchical.svg",
    serviceText: "Operational Structure Evaluation",
    // redirectURL: "/service/franchise-growth",
  },
  {
    id: "seventh",
    serviceIcon: "/images/franchise-advisory/Marketing.svg",
    serviceText: "Marketing and Collaterals",
    // redirectURL: "/service/franchise-growth",
  },
  {
    id: "eighth",
    serviceIcon: "/images/franchise-advisory/Plan.svg",
    serviceText: "Financial Modelling ",
    // redirectURL: "/service/franchise-growth",
  },
];

const advisoryServiceData = {
  title:
    "Our comprehensive Franchise Advisory Services are designed to assist you overcome these problems and challenges to achieve smooth operations with desired growth.",
  subtitle: "We offer the following advisory services:",
  listItems: [
    { text: "Brand Audit and Development" },
    { text: "Current Franchise Model Assessment" },
    { text: "Latest Franchise Industry Trends" },
    { text: "Competition Assessment" },
    { text: "Case Study" },
    { text: "Capex and Modeling" },
    { text: "Strategy" },
    { text: "Brand Identity" },
  ],
  imageSrc: "/images/franchise-advisory/Layer_1.png",
  imageAlt: "Franchise Advisory Services",
};
const FranchiseAdvisory = () => {
  return (
    <>
      <FranchiseBanner props={innerBanner} />
      <div className="relative">
        <FranchiseService
          title="While this is a booming industry,"
          title1="there are several challenges that franchises face."
          subtitle=""
          services={serviceItems}
        />
        <AdvisoryService props={advisoryServiceData} />
        <AskBanner />
        <InquireForm />
      </div>
    </>
  );
};

export default FranchiseAdvisory;
