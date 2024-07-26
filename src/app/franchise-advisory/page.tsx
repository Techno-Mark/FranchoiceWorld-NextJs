import InnerListBrandBanner from "@/components/innerListBrandBanner/innerListBrandBanner";
import React from "react";

const innerBanner = {
  bannerImage: "/images/innerListBrandBanner.png",
  submitURL: "/list-your-brand/step_1",
  SectionTitle: "List Your Brand",
  desc: "Put your brand in the spotlight!",
  items: [
    "Gain access to a broad audience of potential franchisees",
    "Receive pre-screened, highly qualified leads from individuals.",
    "Navigate expansion challenges and achieve sustainable growth.",
  ],
};
const FranchiseAdvisory = () => {
  return (
    <>
      <InnerListBrandBanner props={innerBanner} />
    </>
  );
};

export default FranchiseAdvisory;
