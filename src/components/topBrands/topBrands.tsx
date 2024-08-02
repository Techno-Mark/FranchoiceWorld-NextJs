import Image from "next/image";
import Link from "next/link";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import Card from "../card/card";
import Title from "../title/title";
import styles from "./topBrands.module.css";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 1.2rem 0 4rem;
  }
`;

const TopBrandSlider: React.FC<TopBrandSliderProps> = ({
  sectionTitle,
  items,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    space: "10px",
    arrows: false,
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.3,
          
        },
      },
    ],
  };

  return (
    <section className={`pt-6 md:pt-12 ${styles.topBrandSection}`}>
      <div className="container mx-auto">
        <Title title={sectionTitle} titleClass="!pb-4" />
        {/* <h2 className="text-xl md:text-2xl ml-3 font-bold leading-normal text-center md:text-left">
          {sectionTitle}
        </h2> */}
        <StyledSlider {...settings}>
          {items.map((opportunity) => (
            <div key={opportunity.id}>
              <Card className={`mx-3 ${styles.topBrandCard}`}>
                <div className="bg-white overflow-hidden">
                  <Image
                    src={`${API_URL}/${opportunity.image}`}
                    alt={opportunity.title}
                    className={`w-full object-cover ${styles.topBrandImage}`}
                    width={230}
                    height={170}
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

                      {/* {opportunity.favorite ? (
                        <FaHeart className="text-[#D21F34]" size={20} />
                      ) : (
                        <FaRegHeart className="text-gray-500" size={20} />
                      )} */}
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
                    <Link
                      href={`/franchise/details/${opportunity.id}`}
                      className={`inline-block px-4 py-2 rounded-lg text-center w-full text-bold ${styles.topBrandButton}`}
                    >
                      Know More
                    </Link>
                    {/* <Button
                      variant="secondary"
                      className={`w-full text-bold ${styles.topBrandButton}`}
                    >
                      Know More
                    </Button> */}
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
