"use client";
import Image from "next/image";
import Card from "../card/card";
import styles from "./franchiselistcard.module.css";
import React, { useState } from "react";
import Button from "../button/button";
import Pagination from "../pagination/pagination";

interface FranchiseCard {
  franchiseImage: string;
  title: string;
  category: string;
  investmentRange: string;
  areaRequired: string;
  franchiseOutlet: string;
  favorite?: boolean;
  logo?: string;
}

interface FranchiseCardProps {
  className?: string;
  items: FranchiseCard[];
  itemsPerPage?: number;
  pagination?: boolean;
}

const FranchiseListCard: React.FC<FranchiseCardProps> = ({
  items,
  className,
  pagination = true,
  itemsPerPage = 12,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div
        className={`flex flex-wrap justify-center xl:justify-between pb-8 ${className}`}
      >
        {paginatedItems.map((card, index) => (
          <Card
            key={index}
            className={`mx-1.5 my-4 ${styles.franchiseItemCard}`}
          >
            <div className="bg-white overflow-hidden">
              <Image
                src={card.franchiseImage}
                alt={card.title}
                className={`object-top ${styles.franchiseItemImage}`}
                width={230}
                height={110}
              />
              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <div className={styles.BrandTitleSection}>
                    <h3
                      className={`text-[12px] font-medium ${styles.franchiseItemCategory}`}
                    >
                      {card.category}
                    </h3>
                    <h4 className={`font-bold ${styles.franchiseItemTitle}`}>
                      {card.title}
                    </h4>
                  </div>
                  {card.logo && (
                    <Image
                      className="object-contain px-2"
                      src={card.logo}
                      alt={card.title}
                      width={80}
                      height={70}
                    />
                  )}
                </div>
                <ul className={styles.franchiseItemDetails}>
                  <li className="flex justify-between">
                    Investment range: <span>{card.investmentRange}</span>
                  </li>
                  <li className="flex justify-between">
                    Area Required: <span>{card.areaRequired}</span>
                  </li>
                  <li className="flex justify-between">
                    Franchise Outlet: <span>{card.franchiseOutlet}</span>
                  </li>
                </ul>
                <Button
                  variant="secondary"
                  className={`w-full text-bold rounded-lg !py-1 ${styles.franchiseItemButton}`}
                >
                  Know More
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default FranchiseListCard;
