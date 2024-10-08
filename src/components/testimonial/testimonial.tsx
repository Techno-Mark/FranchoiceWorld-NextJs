import Image from "next/image";
import React from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import Title from "../title/title";
import styles from "./testimonial.module.css";

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
    opacity: 0.6;
    width: 2.5rem;
    height: 2.5rem;
    top: 33%;
  }
  .slick-list {
    max-width: 570px;
    margin: 0 auto;
  }
  .slick-prev:hover,
  .slick-next:hover {
    color: var(--footer-bg);
    opacity: 1;
  }
  @media only screen and (max-width: 767px) {
    .slick-list {
      max-width: 300px;
    }
    .slick-prev,
    .slick-next {
      top: 80px;
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
    <section className={`py-8 md:py-20 ${styles.testimonial}`}>
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
                className={`mx-auto mt-5 object-contain ${styles.companyLogo}`}
                width={176}
                height={80}
              />
            </div>
          ))}
        </StyledSlider>
      </div>
    </section>
  );
};

export default Testimonial;
