import Image from "next/image";
import React from "react";
import Title from "../title/title";

const FranchiseCostInvestment = () => {
  return (
    <section className="py-10 md:py-16 bg-[#F5F9FD]">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-4">
            <Title title="Franchise Cost & Investment" />
            <div className="flex flex-col w-full pt-5 border-t border-t-[#8A8A8A]">
              <div className="flex flex-col">
                <h4 className="font-bold text-[20px] pb-[9px]">Operations</h4>
                <div className="flex items-center w-4/5 mb-6">
                  <div className="pr-5 w-full border-r border-r-[var(--text-color)]">
                    <label className="block font-extrabold text-[var(--third-color)]">
                      Commenced On
                    </label>
                    <span className="text-2xl">2020</span>
                  </div>
                  <div className="pl-5 w-full">
                    <label className="block font-extrabold text-[var(--third-color)]">
                      Franchise Commenced On
                    </label>
                    <span className="text-2xl">2020</span>
                  </div>
                </div>
                <h4 className="font-bold text-[20px] pb-[9px] mt-2">
                  Franchise Details
                </h4>
                <div className="pr-5 w-full mb-6">
                  <label className="block font-extrabold text-[var(--third-color)]">
                    Investment
                  </label>
                  <span className="text-2xl">INR 5 lacs - 10 lacs</span>
                </div>
                <div className="pr-5 w-full mb-6">
                  <label className="block font-extrabold text-[var(--third-color)]">
                    Likely pay back period of capital for a Unit Franchise
                  </label>
                  <span className="text-2xl">3-5 Months</span>
                </div>
                <div className="pr-5 w-full mb-6">
                  <label className="block font-extrabold text-[var(--third-color)]">
                    Industry
                  </label>
                  <span className="text-2xl">Home-based Business</span>
                </div>
                <div className="pr-5 w-full mb-6">
                  <label className="block font-extrabold text-[var(--third-color)]">
                    Franchise Model
                  </label>
                  <ul>
                    <li className="text-2xl">
                      Franchise Owned Franchise Operated
                    </li>
                    <li className="text-2xl">
                      Franchise Owned Company Operated
                    </li>
                    <li className="text-2xl">CAPEX</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5">
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
