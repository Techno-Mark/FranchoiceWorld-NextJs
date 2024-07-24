import AboutBrand from "@/components/aboutBrand/aboutBrand";
import ExpansionPlan from "@/components/expansionPlan/expansionPlan";
import FranchiseTraining from "@/components/franchiseTraining/franchiseTraining";
import FranchiseCostInvestment from "@/components/frCostInvestment/franchiseCostInvestment";
import InquireForm from "@/components/inquireForm/inquireForm";
import UspPoint from "@/components/uspPoint/uspPoint";
import Link from "next/link";
import React from "react";

const FranchiseDetails: React.FC = () => {
  const aboutBrandContent = {
    title: "<Brand Name>",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    media: [
      { type: "image" as const, src: "/images/brands/brandImage.jpg" },
      { type: "image" as const, src: "/images/brands/brandImage2.jpg" },
      { type: "image" as const, src: "/images/brands/brandImage3.jpg" },
      { type: "image" as const, src: "/images/brands/brandImage.jpg" },
      { type: "video" as const, src: "/images/brands/video-1.mp4" },
    ],
  };

  const expansionPlan = [
    {
      planTitle: "North",
      planDesc: "Haryana, Himachal Pradesh, Punjab, Uttarakhand, Uttar Pradesh",
    },
    {
      planTitle: "South",
      planDesc: "Kerala, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana",
    },
    {
      planTitle: "East",
      planDesc:
        "Assam, Meghalaya, Mizoram, Tripura, Arunachal Pradesh, Manipur, Nagaland, West Bengal, Sikkim, Odisha",
    },
    {
      planTitle: "West",
      planDesc: "Gujarat, Rajasthan, Maharashtra, Goa",
    },
    {
      planTitle: "Central",
      planDesc: "Chhattisgarh, Madhya Pradesh, Bihar, Jharkhand",
    },
    {
      planTitle: "Union Territories",
      planDesc:
        "Andaman and Nicobar, Pondicherry, Chandigarh, Lakshadweep, Daman and Diu",
    },
  ];

  const trainingItems = [
    {
      label: "Detailed operating manuals for franchisees",
      value: "Yes",
    },
    {
      label: "Franchisee training location",
      value: "Head office",
    },
    {
      label: "Is field assistance available for franchisee ?",
      value: "Yes",
    },
    {
      label:
        "Expert guidance from Head Office to franchisee in opening the franchise",
      value: "Yes",
    },
    {
      label: "Current IT systems will be included in the franchise",
      value: "Yes",
    },
  ];

  return (
    <>
      <AboutBrand
        brandTitle={aboutBrandContent.title}
        brandDesc={aboutBrandContent.desc}
        media={aboutBrandContent.media}
      />
      <UspPoint
        imagePath="/images/brands/usp.png"
        uspPoints={["Point 01", "Point 02", "Point 03", "Point 04"]}
      />
      <FranchiseCostInvestment />
      <ExpansionPlan brandName="<Brand Name>" plans={expansionPlan} />
      <FranchiseTraining
        brandName="<Brand Name>"
        trainingItems={trainingItems}
      />
      <section className="pt-10 pb-20">
        <div className="container">
          <p className="italic">
            <strong>Disclaimer:</strong> Franchoice World is one of the leading
            integrated franchise solutions company, specializing in franchising
            and licensing. We accept no liability for the accuracy of
            information on this site and/or linked sites, and advise users to
            consult with legal, accounting, and franchise experts before making
            any commitments. Users are solely responsible for verifying the
            accuracy and reliability of all information mentioned. For further
            details, please check our{" "}
            <Link href="/term-conditions" target="_blank">
              Terms & Conditions
            </Link>
            ,
            <Link href="/privacy-policy" target="_blank">
              Privacy Policy
            </Link>
            , and
            <Link href="/legal" target="_blank">
              Legal and Infringement Policy
            </Link>
            .
          </p>
        </div>
      </section>
      <InquireForm />
    </>
  );
};

export default FranchiseDetails;
