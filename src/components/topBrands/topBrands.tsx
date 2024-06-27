import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../card/card";
import styles from "./topBrands.module.css";
import styled from "styled-components";
import Button from "../button/button";
import Image from "next/image";

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
    space: "",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
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
                      <svg
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.6035 2.57455C16.6524 1.54297 15.3473 0.974823 13.9284 0.974823C12.8678 0.974823 11.8965 1.31013 11.0415 1.97136C10.61 2.30512 10.219 2.71346 9.87432 3.19007C9.52976 2.7136 9.13866 2.30512 8.70705 1.97136C7.8521 1.31013 6.8808 0.974823 5.8202 0.974823C4.40131 0.974823 3.0961 1.54297 2.14499 2.57455C1.20523 3.59407 0.687546 4.98689 0.687546 6.49662C0.687546 8.0505 1.26663 9.4729 2.50987 10.9731C3.62206 12.315 5.22052 13.6773 7.07158 15.2547C7.70365 15.7934 8.42011 16.4041 9.16404 17.0545C9.36057 17.2266 9.61275 17.3214 9.87432 17.3214C10.1358 17.3214 10.3881 17.2266 10.5843 17.0548C11.3283 16.4042 12.0451 15.7933 12.6775 15.2543C14.5283 13.6772 16.1267 12.315 17.2389 10.973C18.4822 9.4729 19.0611 8.0505 19.0611 6.49648C19.0611 4.98689 18.5434 3.59407 17.6035 2.57455Z"
                          fill="#D21F34"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.87459 3.41452L8.48055 2.86963C8.19812 2.47908 7.88094 2.14891 7.53533 1.88165L7.53531 1.88163C6.85568 1.35601 6.093 1.09385 5.25631 1.09385C4.12407 1.09385 3.08939 1.54537 2.33376 2.3649L8.87459 3.41452ZM8.87459 3.41452L9.26867 2.86965M8.87459 3.41452L9.26867 2.86965M9.26867 2.86965C9.55122 2.47897 9.86827 2.14892 10.2138 1.88166L9.26867 2.86965ZM6.68859 12.9822L6.68862 12.9822L6.69069 12.984C7.25408 13.4642 7.895 14.0104 8.56078 14.5925L8.56111 14.5928C8.64772 14.6687 8.75888 14.7105 8.87461 14.7105C8.99035 14.7105 9.10163 14.6686 9.18791 14.593L9.18816 14.5928C9.84896 14.0149 10.4856 13.4723 11.0462 12.9945L11.061 12.9819L11.061 12.9818C12.7238 11.5649 14.1132 10.3788 15.0731 9.22058L15.0731 9.22055C16.1292 7.94628 16.5875 6.78291 16.5875 5.53562C16.5875 4.2987 16.1638 3.17677 15.4154 2.36494C14.6597 1.54537 13.6252 1.09385 12.4929 1.09385C11.6563 1.09385 10.8936 1.35599 10.2138 1.88161L6.68859 12.9822ZM6.68859 12.9822C5.02554 11.565 3.63613 10.3788 2.67628 9.2207C1.62013 7.94626 1.16173 6.78288 1.16173 5.53575C1.16173 4.29871 1.58543 3.17677 2.33372 2.36494L6.68859 12.9822Z"
                          stroke="#737273"
                          strokeWidth="0.972621"
                        />
                      </svg>
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
