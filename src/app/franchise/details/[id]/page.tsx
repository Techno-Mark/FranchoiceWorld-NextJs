import AboutBrand from "@/components/aboutBrand/aboutBrand";
import React from "react";

const FranchiseDetails: React.FC = () => {
  const aboutBrandContent = {
    title: "<Brand Name>",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    media: [
      { type: "image" as const, src: "/images/brands/brandImage.jpg" },
      { type: "image" as const, src: "/images/brands/brandImage2.jpg" },
      { type: "image" as const, src: "/images/brands/brandImage3.jpg" },
      { type: "image" as const, src: "/images/brands/brandImage.jpg" },
      { type: "video" as const, src: "/images/brands/video-1.mp4" },
    ],
  };

  return (
    <AboutBrand
      brandTitle={aboutBrandContent.title}
      brandDesc={aboutBrandContent.desc}
      media={aboutBrandContent.media}
    />
  );
};

export default FranchiseDetails;
