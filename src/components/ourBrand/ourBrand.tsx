import React from "react";

function OurBrand() {
  const brands = [
    { src: "/images/event/Brand/Brand2.png", alt: "Café Honeyman" },
    { src: "/images/event/Brand/Brand5.png", alt: "Respond Right" },
    { src: "/images/event/Brand/Brand4.png", alt: "Mahesh Tutorials" },
    { src: "/images/event/Brand/Brand6.png", alt: "Chinese Wok" },
    { src: "/images/event/Brand/Brand1.png", alt: "The Chai Theka" },
    { src: "/images/event/Brand/Brand3.png", alt: "Froozo" },
  ];
  return (
    <div className="flex justify-center lg:justify-between gap-4 flex-wrap items-center pt-4">
      {brands.map((brand, index) => (
        <div key={index} className="py-4 px-2">
          <img src={brand.src} alt={brand.alt} className="object-contain" />
        </div>
      ))}
    </div>
  );
}

export default OurBrand;
