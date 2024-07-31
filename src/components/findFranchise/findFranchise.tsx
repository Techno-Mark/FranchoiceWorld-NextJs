"use client";
import React, { useState, lazy, Suspense } from "react";
import Tabs from "../tab/tab";
import Title from "../title/title";
import styles from "./findfranchise.module.css";

const CategoriesContent = lazy(
  () => import("./_categoriesContent/categoriesContent")
);
const LocationContent = lazy(
  () => import("./_locationContent/locationContent")
);
const InvestmentContent = lazy(
  () => import("./_investmentContent/investmentContent")
);
const BrandContent = lazy(() => import("./_brandContent/brandContent"));

interface FranchiseProps {
  dark?: boolean;
}

const FindFranchise: React.FC<FranchiseProps> = ({ dark = false }) => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Categories" },
    { id: 2, label: "Location" },
    { id: 3, label: "Investment" },
    { id: 4, label: "Brand" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 1:
        return <CategoriesContent />;
      case 2:
        return <LocationContent />;
      case 3:
        return <InvestmentContent />;
      case 4:
        return <BrandContent />;
      default:
        return <CategoriesContent />;
    }
  };

  return (
    <section
      className={`py-8 md:py-20 ${styles.findFranchise} ${dark && styles.dark}`}
    >
      <div className="container">
        <div className="text-center">
          <Title
            title="Find Your Franchise"
            varient={dark ? "white" : "blue"}
            titleClass="!pb-4"
          />
          <Tabs
            titleClassName={styles.franchiseType}
            mainClassName="w-full md:w-11/12 mx-auto"
            contentClassName={`w-full ${styles.franchiseContent}`}
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            dark={dark}
          />
          <div className={styles.franchiseContent}>
            <Suspense
              fallback={
                <div className="animate-pulse flex justify-center space-x-4">
                  <div className="max-w-[327px] w-full h-11 bg-slate-400 rounded"></div>
                  <div className="max-w-[327px] w-full h-11 bg-slate-400 rounded"></div>
                  <div className="max-w-[327px] w-full h-11 bg-slate-400 rounded"></div>
                </div>
              }
            >
              {renderContent()}
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindFranchise;
