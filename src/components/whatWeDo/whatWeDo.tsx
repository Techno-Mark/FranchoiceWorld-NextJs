"use client";
import Image from "next/image";
import React from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import Title from "../title/title";
import styles from "./whatwedo.module.css";

interface weDoContent {
  id?: number;
  title: string;
  image: string;
  content: string[];
}

interface WeDoSliderProps {
  sectionTitle: string;
  titleDesc: string;
  items: weDoContent[];
}

const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 1.2rem 0 4rem;
  }
  .slick-arrow {
    left: auto;
    right: 0;
    top: -31%;
    transform: translate(0, 50%);
    color: var(--text-color);
    width: 3rem;
    height: 3rem;
    opacity: 0.6;
  }
  .slick-prev {
    right: 98px;
  }
  .slick-disabled {
    opacity: 0.3;
  }
  .slick-prev:hover:not(.slick-disabled),
  .slick-next:hover:not(.slick-disabled) {
    color: var(--footer-bg);
    opacity: 1;
  }
  @media only screen and (max-width: 767px) {
    .slick-arrow {
      width: 2rem;
      height: 2rem;
      top: -12%;
    }
    .slick-prev {
      right: auto;
      left: 0;
    }
  }
`;

const WhatWeDo: React.FC<WeDoSliderProps> = ({
  sectionTitle,
  titleDesc,
  items,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.2,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <BsArrowRightCircle size={50} />,
    prevArrow: <BsArrowLeftCircle size={50} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.3,
        },
      },
    ],
  };

  return (
    <section className={`pt-6 md:pt-12 ${styles.topBrandSection}`}>
      <div className="container mx-auto">
        <div className="w-full md:w-3/4 pb-12 md:pb-4">
          <Title
            title={sectionTitle}
            desc={titleDesc}
            descClass="w-full md:w-3/4 md:pl-0 font-medium"
          />
        </div>
        <StyledSlider {...settings}>
          {items.map((wedo, index) => (
            <div key={wedo.id}>
              <div
                className={`relative mr-6 rounded-lg overflow-hidden min-h-[345px] lg:min-h-full ${styles.weDoCard}`}
              >
                <Image
                  src={wedo.image}
                  alt={wedo.title}
                  className={`w-full object-cover min-h-[345px] lg:min-h-full`}
                  width={332}
                  height={316}
                />
                <div className="absolute bottom-5 text-white font-bold text-base max-w-[165px] mx-auto left-0 right-0 text-center">
                  {wedo.title}
                </div>
                <div
                  className={`flex flex-col justify-start absolute top-full left-0 w-full bg-[var(--footer-bg)] text-white h-full px-6 py-8 md:py-12 transition-all duration-200 ${styles.hoverCard}`}
                >
                  <h3 className="font-bold text-[14px] mb-6">
                    {index + 1}. {wedo.title}
                  </h3>
                  <ul className="list-disc pl-5">
                    {wedo.content.map((c, i) => (
                      <li className="pb-4 last:pb-0" key={i}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </StyledSlider>
      </div>
    </section>
  );
};

export default WhatWeDo;
