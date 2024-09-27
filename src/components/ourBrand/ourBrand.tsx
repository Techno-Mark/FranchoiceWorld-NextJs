// import React from "react";

// function OurBrand() {
//   const brands = [
//     { src: "/images/event/Brand/Brand2.png", alt: "Café Honeyman" },
//     { src: "/images/event/Brand/Brand5.png", alt: "Respond Right" },
//     { src: "/images/event/Brand/Brand4.png", alt: "Mahesh Tutorials" },
//     { src: "/images/event/Brand/Brand6.png", alt: "Chinese Wok" },
//     { src: "/images/event/Brand/Brand1.png", alt: "The Chai Theka" },
//     { src: "/images/event/Brand/Brand3.png", alt: "Froozo" },
//   ];
//   return (
//     <div className="flex justify-center lg:justify-between gap-4 flex-wrap items-center pt-4">
//       {brands.map((brand, index) => (
//         <div key={index} className="py-4 px-2">
//           <img src={brand.src} alt={brand.alt} className="object-contain" />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default OurBrand;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";

const StyledSlider = styled(Slider)`
  .slick-list {
    display: flex !important;
  }
  .slick-list .slick-track {
    display: flex !important;
    align-items: center;
    justify-items: center;
    height: 100%;
  }
`;

function OurBrand() {
  const brands = [
    { src: "/images/event/Brand/Brand2.png", alt: "Café Honeyman" },
    { src: "/images/event/Brand/Brand5.png", alt: "Respond Right" },
    { src: "/images/event/Brand/Brand4.png", alt: "Mahesh Tutorials" },
    { src: "/images/event/Brand/Brand6.png", alt: "Chinese Wok" },
    { src: "/images/event/Brand/Brand1.png", alt: "The Chai Theka" },
    { src: "/images/event/Brand/Brand3.png", alt: "Froozo" },
  ];

  const settings = {
    dots: false, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 5, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 2000, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <StyledSlider {...settings}>
      {brands.map((brand, index) => (
        <div key={index} className="p-2">
          <img src={brand.src} alt={brand.alt} className="object-contain mx-auto" />
        </div>
      ))}
    </StyledSlider>
  );
}

export default OurBrand;
