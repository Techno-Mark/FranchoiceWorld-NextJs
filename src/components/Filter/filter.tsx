import React from "react";
import {
  PiArrowCircleLeftLight,
  PiArrowCircleRightLight,
} from "react-icons/pi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import FilterButton from "./filterButton";

interface BrandItem {
  icon: React.ComponentType;
  text: string;
}

interface BrandFilterProps {
  brandItems: BrandItem[];
}

const BrandFilter = ({ brandItems }: BrandFilterProps) => {
  const StyledSlider = styled(Slider)`
    .slick-list,
    .slick-slider {
      max-width: 75% !important;
      position: relative;
    }
    .slick-prev,
    .slick-next {
      height: 30px;
      width: 30px;
      color: var(--text-color);
      opacity: 0.6;
    }

    .slick-prev:hover,
    .slick-next:hover {
      color: var(--footer-bg);
      opacity: 1;
    }
  `;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 3,
    draggable: false,
    arrows: true,
    space: "10px",
    nextArrow: <PiArrowCircleRightLight size={50} />,
    prevArrow: <PiArrowCircleLeftLight size={50} />,
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
          slidesToShow: 3,
          // centerMode: true,
        },
      },
    ],
  };

  return (
    <section className="py-4 md:py-6">
      <StyledSlider {...settings}>
        {brandItems.map((item: any, index: number) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="!flex flex-col justify-center items-center"
            >
              <IconComponent />
              <span className="text-xs max-w-28 text-center p-2">
                {item.text}
              </span>
            </div>
          );
        })}
      </StyledSlider>

      <FilterButton />
    </section>
  );
};

export default BrandFilter;
