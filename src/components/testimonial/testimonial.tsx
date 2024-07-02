import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./testimonial.module.css"; // Create and import your CSS module for styling
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import styled from "styled-components";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import Title from "../title/title";
import Image from "next/image";

interface Testimonials {
  message: string;
  author: string;
  companyLogo: string;
}

interface TestimonialProps {
  title: string;
  testimonials: Testimonials[];
}

const StyledSlider = styled(Slider)`
  .slick-prev,
  .slick-next {
    color: var(--text-color);
    opacity: 0.5;
    width: 2.5rem;
    height: 2.5rem;
    top: 33%;
  }
  .slick-list {
    max-width: 570px;
    margin: 0 auto;
  }
  @media only screen and (max-width: 767px) {
    .slick-list {
      max-width: 300px;
    }
    .slick-prev,
    .slick-next {
      width: 2rem;
      height: 2rem;
    }
    .slick-prev {
      left: 15px;
    }
    .slick-next {
      right: 15px;
    }
  }
`;

const Testimonial: React.FC<TestimonialProps> = ({ title, testimonials }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <BsArrowRightCircle size={50} />,
    prevArrow: <BsArrowLeftCircle size={50} />,
  };

  return (
    <section className={`py-8 ${styles.testimonial}`}>
      <div className="container mx-auto text-center md:w-3/4">
        <Title title={title} />
        <StyledSlider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-2">
              <p className={`my-4 font-medium ${styles.testimonialText}`}>
                {testimonial.message}
              </p>
              <Image
                src={testimonial.companyLogo}
                alt={testimonial.author}
                className="mx-auto mt-5 w-auto h-[50px] object-contain"
                width={100}
                height={50}
              />
            </div>
          ))}
        </StyledSlider>
      </div>
    </section>
  );
};

export default Testimonial;
