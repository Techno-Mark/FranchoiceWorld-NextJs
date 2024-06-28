import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../card/card";
import styles from "./topBrands.module.css";
import styled from "styled-components";
import Button from "../button/button";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface BusinessOpportunity {
  id: number;
  title: string;
  category: string;
  image: string;
  investmentRange: string;
  areaRequired: string;
  franchiseOutlet: string;
  favorite: boolean;
}

interface TopBrandSliderProps {
  sectionTitle: string;
  items: BusinessOpportunity[];
}

const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 2rem 0 4rem;
  }
`;

const TopBrandSlider: React.FC<TopBrandSliderProps> = ({
  sectionTitle,
  items,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    space: "10px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
        },
      },
    ],
  };

  return (
    <section className={`pt-6 md:pt-12 ${styles.topBrandSection}`}>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold leading-normal">{sectionTitle}</h2>
        <StyledSlider {...settings}>
          {items.map((opportunity) => (
            <div key={opportunity.id}>
              <Card className={`mx-1 md:mx-3 ${styles.topBrandCard}`}>
                <div className="bg-white overflow-hidden">
                  <Image
                    src={opportunity.image}
                    alt={opportunity.title}
                    className={`w-full object-cover ${styles.topBrandImage}`}
                    width={100}
                    height={100}
                  />
                  <div className="pt-4">
                    <div className="flex justify-between items-center">
                      <div className={styles.BrandTitleSection}>
                        <h3
                          className={`text-lg font-medium ${styles.topBrandCategory}`}
                        >
                          {opportunity.category}
                        </h3>
                        <h4
                          className={`text-xl font-bold ${styles.topBrandTitle}`}
                        >
                          {opportunity.title}
                        </h4>
                      </div>

                      {opportunity.favorite ? (
                        <FaHeart className="text-[#D21F34]" size={20} />
                      ) : (
                        <FaRegHeart className="text-gray-500" size={20} />
                      )}
                    </div>
                    <ul className={styles.topBrandDetails}>
                      <li className="flex justify-between">
                        Investment range:{" "}
                        <span>{opportunity.investmentRange}</span>
                      </li>
                      <li className="flex justify-between">
                        Area Required: <span>{opportunity.areaRequired}</span>
                      </li>
                      <li className="flex justify-between">
                        Franchise Outlet:{" "}
                        <span>{opportunity.franchiseOutlet}</span>
                      </li>
                    </ul>
                    <Button
                      variant="secondary"
                      className={`w-full ${styles.topBrandButton}`}
                    >
                      Know More
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </StyledSlider>
      </div>
    </section>
  );
};

export default TopBrandSlider;
