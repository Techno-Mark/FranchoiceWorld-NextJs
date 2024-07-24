"use client";
import { getBrandDetails } from "@/api/brand";
import AboutBrand from "@/components/aboutBrand/aboutBrand";
import ExpansionPlan from "@/components/expansionPlan/expansionPlan";
import FranchiseTraining from "@/components/franchiseTraining/franchiseTraining";
import FranchiseCostInvestment from "@/components/frCostInvestment/franchiseCostInvestment";
import InquireForm from "@/components/inquireForm/inquireForm";
import UspPoint from "@/components/uspPoint/uspPoint";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const FranchiseDetails: React.FC = () => {
  const pathname = usePathname();
  const [brandName, setBrandName] = useState<string>("");
  const [aboutBrandContent, setAboutBrandContent] = useState<BrandContent>({
    brandDesc: "",
    media: [],
  });

  const [usp, setUsp] = useState<string[]>([]);
  const [franchiseData, setFranchiseData] = useState<any>(null);
  // const [expansionData, setExpansionData] = useState<ExpansionProps>({
  //   plans: [],
  // });

  const fetchBrandDetails = async (id: number) => {
    try {
      const response = await getBrandDetails(id);
      setBrandName(response.ResponseData.brandName);
      setUsp(
        response.ResponseData.usp ? response.ResponseData.usp.split(",") : []
      );

      const mediaArray = response.ResponseData.brandImages.map(
        (url: string) => ({
          type: "image" as const,
          src: `${API_URL}/${url}`,
        })
      );

      mediaArray.push({
        type: "video" as const,
        src: `${API_URL}/${response.ResponseData.video}`,
      });

      setAboutBrandContent({
        brandDesc: response.ResponseData.brandDescription,
        media: mediaArray,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const segments = pathname.split("/");
    const id = segments[segments.length - 1];
    if (id) {
      fetchBrandDetails(Number(id));
    }
  }, [pathname]);

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
        brandTitle={brandName}
        brandDesc={aboutBrandContent.brandDesc}
        media={aboutBrandContent.media}
      />
      <UspPoint imagePath="/images/brands/usp.png" uspPoints={usp} />
      <FranchiseCostInvestment
      // investmentRange={franchiseData.investmentRangeAssociation.range}
      // areaRequired={franchiseData.areaRequiredAssociation.name}
      // franchiseFee={franchiseData.franchiseFee}
      // roi={franchiseData.roi}
      // paybackPeriod={franchiseData.paybackPeriodAssociation.name}
      />
      <ExpansionPlan brandName={brandName} plans={expansionPlan} />
      <FranchiseTraining brandName={brandName} trainingItems={trainingItems} />
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
