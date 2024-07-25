import Image from "next/image";
import React from "react";
import Title from "../title/title";

const FranchiseCostInvestment: React.FC<FranchiseCostInvestmentProps> = ({
  operations,
  franchiseDetails,
}) => {
  return (
    <section className="py-10 md:py-16 bg-[#F5F9FD]">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 md:pr-4">
            <Title title="Franchise Cost & Investment" titleClass="!pb-4" />
            <div className="flex flex-col w-full pt-5 border-t border-t-[#8A8A8A]">
              <div className="flex flex-col">
                <h4 className="font-bold text-[20px] pb-[9px]">Operations</h4>
                <div className="flex items-center md:w-4/5 mb-4 md:mb-6">
                  <div className="pr-5 w-auto md:w-full border-r border-r-[var(--text-color)]">
                    <label className="block font-extrabold text-[var(--third-color)] text-[12px] md:text-[14px]">
                      Commenced On
                    </label>
                    <span className="text-base md:text-2xl">
                      {operations.commenced}
                    </span>
                  </div>
                  <div className="pl-5 w-auto md:w-full">
                    <label className="block font-extrabold text-[var(--third-color)] text-[12px] md:text-[14px]">
                      Franchise Commenced On
                    </label>
                    <span className="text-base md:text-2xl">
                      {operations.franchiseCommenced}
                    </span>
                  </div>
                </div>
                <h4 className="font-bold text-[20px] pb-[9px] mt-2">
                  Franchise Details
                </h4>
                <div className="pr-5 w-full mb-4 md:mb-6">
                  <label className="block font-extrabold text-[var(--third-color)] text-[12px] md:text-[14px]">
                    Investment
                  </label>
                  <span className="text-base md:text-2xl">
                    {franchiseDetails.investment}
                  </span>
                </div>
                <div className="pr-5 w-full mb-4 md:mb-6">
                  <label className="block font-extrabold text-[var(--third-color)] text-[12px] md:text-[14px]">
                    Likely pay back period of capital for a Unit Franchise
                  </label>
                  <span className="text-base md:text-2xl">
                    {franchiseDetails.likelyPayBackPeriod} Months
                  </span>
                </div>
                <div className="pr-5 w-full mb-4 md:mb-6">
                  <label className="block font-extrabold text-[var(--third-color)] text-[12px] md:text-[14px]">
                    Industry
                  </label>
                  <span className="text-base md:text-2xl">
                    {franchiseDetails.industry}
                  </span>
                </div>
                <div className="pr-5 w-full mb-4 md:mb-6">
                  <label className="block font-extrabold text-[var(--third-color)] text-[12px] md:text-[14px]">
                    Franchise Model
                  </label>
                  <ul>
                    {franchiseDetails.franchiseModel.map(
                      (modelContent, index) => (
                        <li key={index} className="text-base md:text-2xl">
                          {modelContent}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5 mt-6 md:mt-0">
            <Image
              src="/images/brands/costInvestment.png"
              alt="Cost & Investment"
              width={462}
              height={394}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseCostInvestment;
