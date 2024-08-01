"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Card from "../card/card";
import Pagination from "../pagination/pagination";
import styles from "./franchiselistcard.module.css";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/`;

interface FranchiseCard {
  id?: number | null;
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

  if (items.length === 0) {
    return (
      <div className={`flex justify-center items-center h-64 ${className}`}>
        <p className="text-xl font-semibold text-gray-500">No data found</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={`flex flex-wrap justify-center xl:justify-start pb-8 ${className}`}
      >
        {paginatedItems.map((card, index) => (
          <Card
            key={index}
            className={`mx-2 my-4 lg:w-1/4 ${styles.franchiseItemCard}`}
          >
            <div className="bg-white overflow-hidden">
              <Image
                src={`${API_URL}${card.franchiseImage}`}
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
                <Link
                  className={`inline-block text-center font-bold px-4 py-1 rounded-lg w-full ${styles.franchiseItemButton}`}
                  href={`/franchise/details/${card.id}`}
                >
                  Know More
                </Link>
                {/* <Button
                  variant="secondary"
                  className={`w-full text-bold rounded-lg !py-1 `}
                >
                  Know More
                </Button> */}
              </div>
            </div>
          </Card>
        ))}
      </div>
      {pagination && items.length > 0 && (
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
