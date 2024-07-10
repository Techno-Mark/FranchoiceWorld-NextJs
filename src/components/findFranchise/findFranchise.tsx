"use client";
import Tabs from "../tab/tab";
import Title from "../title/title";
import styles from "./findfranchise.module.css";
import CategoriesContent from "./_categoriesContent/categoriesContent";
interface FranchiseProps {
  dark?: boolean;
}
const FindFranchise: React.FC<FranchiseProps> = ({ dark = false }) => {
  const tabs = [
    { id: "tab1", label: "Categories", content: <CategoriesContent /> },
    { id: "tab2", label: "Location", content: <CategoriesContent /> },
    { id: "tab3", label: "Investment", content: <CategoriesContent /> },
  ];
  return (
    <section
      className={`py-8 md:py-20 ${styles.findFranchise} ${dark && styles.dark}`}
    >
      <div className="container">
        <div className="text-center">
          <Title
            title="Find Your Franchise"
            varient={dark ? "white" : "blue"}
          />
          <Tabs
            titleClassName={styles.franchiseType}
            contentClassName={`w-full md:w-11/12 mx-auto ${styles.franchiseContent}`}
            tabs={tabs}
            dark={dark}
          />
        </div>
      </div>
    </section>
  );
};

export default FindFranchise;
