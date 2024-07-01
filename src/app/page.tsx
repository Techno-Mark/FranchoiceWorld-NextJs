"use client";

import { getData } from "@/api/home";
import Banner from "@/components/banner/banner";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "./loading";
import HalfBanner from "@/components/halfBanner/halfBanner";
import WhyChoose from "@/components/whyChoose/whyChoose";
import FindFranchise from "@/components/findFranchise/findFranchise";
import ListBrandBanner from "@/components/listBrandBanner/listBrandBanner";
import TopBrandSlider from "@/components/topBrands/topBrands";
import Testimonial from "@/components/testimonial/testimonial";
import TrandingVideo from "@/components/trandingVideo/trandingVideo";
import OurService from "@/components/ourService/ourService";
import AboutFranchoice from "@/components/aboutFranchoice/aboutFranchoice";
import FranchiseIndustry from "@/components/franchiseIndustry/franchiseIndustry";

interface HomeData {
  banner: any[];
  opportunity: {
    sectionTitle: "";
    items: [];
  };
  international: {
    sectionTitle: "";
    items: [];
  };
  testimonials: any[];
  trandingVideo: {
    items: [];
  };
}
const opportunity = {
  sectionTitle: "Top Business Opportunities",
  items: [
    {
      image: "/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      image: "/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      image: "/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      image: "/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
  ],
};
const international = {
  sectionTitle: "Top International Brands",
  items: [
    {
      image: "/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      image: "/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      image: "/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      image: "/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
  ],
};
const testimonials = [
  {
    message:
      "Through excellent marketing work, Sunil and his entire team have been a great help in developing our brand. It has been a very convenient process to work with the team. They have great communication skills and strong technical knowledge. You guys rock!",
    author: "Connplex",
    companyLogo: "/connplex.jpg",
  },
  {
    message:
      "Through excellent marketing work, Sunil and his entire team have been a great help in developing our brand. It has been a very convenient process to work with the team. They have great communication skills and strong technical knowledge. You guys rock!",
    author: "Abc",
    companyLogo: "/connplex.jpg",
  },
];
const trandingVideo = {
  items: [
    {
      id: "1",
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
      videoThumbnail: "/banner.jpg",
    },
    {
      id: "2",
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
      videoThumbnail: "/banner.jpg",
    },
    {
      id: "3",
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
      videoThumbnail: "/banner.jpg",
    },
  ],
};
const banner = {
  imgUrl: "/banner.jpg",
  imgAlt: "Banner image",
  bannerTitle: "Welcome to the World of Franchising",
};
export default function Home() {
  // const [homeData, setHomeData] = useState<HomeData | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const pathname = usePathname();

  // const fetchData = async () => {
  //   try {
  //     const res = await getData(pathname);
  //     if (res) {
  //       setHomeData(res.responseData);
  //     } else {
  //       throw new Error("Something went wrong...!!!");
  //     }
  //   } catch (err: any) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [pathname]);

  // if (loading) return <Loading />;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Banner props={banner} />
      <HalfBanner />
      <WhyChoose />
      <FindFranchise />
      <ListBrandBanner />
      <TopBrandSlider
        sectionTitle={opportunity.sectionTitle}
        items={opportunity.items}
      />
      <Testimonial title="Success Stories" testimonials={testimonials} />
      <FranchiseIndustry />
      <AboutFranchoice />
      <OurService />
      <TopBrandSlider
        sectionTitle={international.sectionTitle}
        items={international.items}
      />
      <TrandingVideo items={trandingVideo.items} />
    </>
  );
}
