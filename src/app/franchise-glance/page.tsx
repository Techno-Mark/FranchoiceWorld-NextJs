import AboutFranchoice from "@/components/aboutFranchoice/aboutFranchoice";
import FranchiseIndustry from "@/components/franchiseIndustry/franchiseIndustry";
import Link from "next/link";
import { Paragraph } from "@/components/franchiseIndustry/franchiseIndustry";
import React from "react";
import InquireForm from "@/components/inquireForm/inquireForm";

type FranchiseData = {
  title: { text: string; style: string };
  paragraphs: Paragraph[];
  linkText: string;
  linkHref: string;
};

const franchiseData: FranchiseData = {
  title: {
    text: "$150 billion in five years",
    style: "font-normal", // Dynamic font style for the title
  },
  paragraphs: [
    {
      text: "Franchoice World is here to help you discover and nurture your ideal franchise brand for growth.",
      style: "font-normal", // Dynamic font style for the paragraph
    },
    {
      text: [
        "Franchise industry has been a driving force for the economy that fuels employment opportunities and offers more than just an upward mobility. It offers flexibility and work-life balance that individuals are looking for, now, more than ever. According to Forbes, more individuals chose starting their own franchise business over corporate work in 2023.",
      ],
      style: "font-normal",
    },
  ],
  linkText: "Know More",
  linkHref: "/franchise-glance",
};

const aboutContent = (
  <>
    <p className="text-left md:pt-0 pt-5">
      McKinsey & Well Company&apos;s Global Franchise Market 2023-2027 report
      forecasts that the franchise market is likely to grow at a CAGR of 9.58%,
      i.e., an increase of USD 1634.71 billion during 2022-27.
    </p>
    <p className="pt-8 text-left">
      Franchising is gradually becoming an omnipresent industry that encompasses
      multiple sectors across all corners of the world. According to Global
      Council for the Promotion of International Trade, the global franchise
      industry holds a staggering valuation of $5 trillion promising an
      excellent future with numerous advantages. These advantages include brand
      recognition, established business model, and franchisor support, amongst
      the others. Entrepreneurs and investors find these particularly
      benefitting over conventional businesses.
    </p>
    <p className="text-sm italic pt-8 text-left">
      Source: Forbes, McKinsey & Well Company, Global Council for the Promotion
      of International Trade (GCPIT)
    </p>
  </>
);

const FranchiseGlance = () => {
  return (
    <>
      <AboutFranchoice
        title="Franchise Industry at a Glance"
        titleClass="md:!text-5xl md:pb-0 !pb-4 !text-left max-w-[520px]"
        content="Entrepreneurs today wish to replicate a successful business model, use brand recognition and get thorough training to skyrocket towards growth. Franchise business is one of the most attractive entrepreneurial prospects in contemporary times. It is booming in India, 2nd largest in the world and growing at over 15% annually."
        contentClass=" md:border-none  border-b text-left "
        className="md:pt-20 md:pb-10"
        imageSrc="/images/franchise-glance/GlanceBanner.png"
        imageAlt="Franchoice Team"
        imageClass="!h-auto  object-contain "
        imageWidth={475}
        imageHeight={364}
        responsiveClass={true}
      />
      <div className="relative">
        <FranchiseIndustry
          title={franchiseData.title}
          topTitle=" Indian franchise market is expected to reach"
          topTitleClass="font-extrabold text-left md:text-lg !text-lg"
          mainTitle="$150 billion in five years"
          mainTitleClass="!relative md:!text-5xl md:pb-0 !pb-5 !text-2xl  text-left !font-extrabold !max-w-[450px] after:bg-[--text-color] after:w-[156px] mb-4 md:after:w-[170px] after:h-[1px] after:absolute after:left-0 after:bottom-0  after:mx-auto"
          paragraphs={franchiseData.paragraphs}
          paraStyle="pb-5 md:border-none  last:border-b  text-left"
          image="/images/franchise-glance/FiveYear.png"
          imagewidth={465}
          imageHeight={400}
        />
        <AboutFranchoice
          title="Global Franchise Industry Forecast"
          titleClass="md:!text-5xl md:!pb-10 !text-left !font-bold max-w-[520px]"
          content={aboutContent}
          imageSrc="/images/franchise-glance/ForeCast.png"
          imageAlt="Franchoice Team"
          imageWidth={378}
          className="py-6 md:pb-16"
          imageClass="!h-auto  object-contain "
          imageHeight={400}
          responsiveClass={true}
        />
        <InquireForm pageForm="Franchise Glance" />
      </div>
    </>
  );
};

export default FranchiseGlance;
