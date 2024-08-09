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
  const traininglabels = [
    {
      label: "Detailed operating manuals for franchisees",
      key: "isOperatingManuals",
    },
    { label: "Franchisee training location", key: "trainingLocation" },
    {
      label: "Is field assistance available for franchisee ?",
      key: "isAssistanceAvailable",
    },
    {
      label:
        "Expert guidance from Head Office to franchisee in opening the franchise",
      key: "isExpertGuidance",
    },
    {
      label: "Current IT systems will be included in the franchise",
      key: "isITSystemIncluded",
    },
  ];

  const [usp, setUsp] = useState<string[]>([]);

  const [franchiseCostInvest, setFranchiseCostInvest] =
    useState<FranchiseCostInvestmentProps>({
      operations: {
        commenced: "",
        franchiseCommenced: "",
      },
      franchiseDetails: {
        investment: "",
        likelyPayBackPeriod: "",
        industry: "",
        franchiseModel: [],
      },
    });

  const [trainingData, setTrainingData] = useState<TrainingProps>({
    brandName: "",
    trainingItems: [
      {
        label: "",
        value: "",
      },
    ],
  });

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
      setFranchiseCostInvest({
        ...franchiseCostInvest,
        operations: {
          commenced: response.ResponseData.businessCommencedYear,
          franchiseCommenced: response.ResponseData.franchiseCommencedYear,
        },
        franchiseDetails: {
          investment: response.ResponseData.investmentRangeAssociation.range,
          likelyPayBackPeriod: response.ResponseData.paybackPeriod,
          industry: response.ResponseData.industry,
          franchiseModel: response.ResponseData.salesRevenueModel,
        },
      });
      const training = traininglabels.map((item) => ({
        label: item.label,
        value:
          item.key === "trainingLocation"
            ? response.ResponseData[item.key]
              ? "Head Office"
              : "Online/HQ"
            : response.ResponseData[item.key]
            ? "Yes"
            : "No",
      }));

      setTrainingData((prevData) => ({
        ...prevData,
        trainingItems: training,
      }));
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

  return (
    <>
     
        <AboutBrand
          brandTitle={brandName}
          brandDesc={aboutBrandContent.brandDesc}
          media={aboutBrandContent.media}
        />
     
      <div className="relative">
        <UspPoint imagePath="/images/brands/usp.png" uspPoints={usp} />
        <FranchiseCostInvestment
          operations={franchiseCostInvest.operations}
          franchiseDetails={franchiseCostInvest.franchiseDetails}
        />
        <ExpansionPlan brandName={brandName} plans={expansionPlan} />
        <FranchiseTraining
          brandName={brandName}
          trainingItems={trainingData.trainingItems}
        />
        <section className="pt-10 pb-20">
          <div className="container">
            <p className="italic">
              <strong>Disclaimer:</strong> Franchoice World is one of the
              leading integrated franchise solutions company, specializing in
              franchising and licensing. We accept no liability for the accuracy
              of information on this site and/or linked sites, and advise users
              to consult with legal, accounting, and franchise experts before
              making any commitments. Users are solely responsible for verifying
              the accuracy and reliability of all information mentioned. For
              further details, please check our{" "}
              <Link href="/term-conditions" target="_blank">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
              {/* , and
              <Link href="/legal" target="_blank">
                Legal and Infringement Policy
              </Link> */}
              .
            </p>
          </div>
        </section>
        <InquireForm pageForm="Brand Detail" />
      </div>
    </>
  );
};

export default FranchiseDetails;
