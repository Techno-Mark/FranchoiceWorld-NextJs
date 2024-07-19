import Image from "next/image";
import Card from "../card/card";
import styles from "./franchiselistcard.module.css";
import React from "react";
import Button from "../button/button";

interface FranchiseCard {
  franchiseImage: string;
  title: string;
  category: string;
  investmentRange: string;
  areaRequired: string;
  franchiseOutlet: string;
  favorite?: boolean;
}
interface FranchiseCardProps {
  className?: string;
  items: FranchiseCard[];
}

const FranchiseListCard: React.FC<FranchiseCardProps> = ({
  items,
  className,
}) => {
  return (
    <>
      <div className={`flex flex-wrap ${className}`}>
        {items.map((card, index) => (
          <Card key={index} className={`mx-2 my-4 ${styles.franchiseItemCard}`}>
            <div className="bg-white overflow-hidden">
              <Image
                src={card.franchiseImage}
                alt={card.title}
                className={`${styles.franchiseItemImage}`}
                width={230}
                height={110}
              />
              <div className="pt-4">
                <div className="flex justify-between items-center">
                  <div className={styles.BrandTitleSection}>
                    <h3
                      className={`text-lg font-medium ${styles.franchiseItemCategory}`}
                    >
                      {card.category}
                    </h3>
                    <h4
                      className={`text-xl font-bold ${styles.franchiseItemTitle}`}
                    >
                      {card.title}
                    </h4>
                  </div>

                  {/* {favorite ? (
                    <FaHeart className="text-[#D21F34]" size={20} />
                  ) : (
                    <FaRegHeart className="text-gray-500" size={20} />
                  )} */}
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
                  className={`w-full text-bold ${styles.franchiseItemButton}`}
                >
                  Know More
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default FranchiseListCard;
