import React from "react";
import {
  PiArrowCircleLeftLight,
  PiArrowCircleRightLight,
} from "react-icons/pi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const BrandFilter = ({ brandItems }: any) => {
  const StyledSlider = styled(Slider)`
    .slick-prev,
    .slick-next {
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
    nextArrow: <PiArrowCircleRightLight size={30} />,
    prevArrow: <PiArrowCircleLeftLight size={30} />,
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
      <div className="container">
        <StyledSlider {...settings}>
          {brandItems.map((item: any, index: any) => (
            <div
              key={index}
              className="!flex flex-col justify-center items-center"
            >
              <item.icon />
              <span className="text-xs max-w-28 text-center p-2">
                {item.text}
              </span>
            </div>
          ))}
        </StyledSlider>
      </div>
    </section>
  );
};

export default BrandFilter;
