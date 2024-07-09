
import FindFranchise from "@/components/findFranchise/findFranchise";
import InnerListBrandBanner from "@/components/innerListBrandBanner/innerListBrandBanner";

const Investor = () => {
  const innerBanner = {
    bannerImage: "/images/innerInvestorBanner.png",
    submitURL: "/investor/step_1",
    SectionTitle: "Investment",
    desc: "Take an entrepreneurial leap with right investment!",
    items: [
      "Unveil our registered and listed franchise brands looking for investors.",
      "Gain access to the franchiser brand and investment details.",
      "Unlock growth by investing in the most suitable brand of your choice.",
    ],
    noborder: true,
  };
  return (
    <>
      <InnerListBrandBanner props={innerBanner} />
      <FindFranchise dark={true} />
    </>
  );
};

export default Investor;
