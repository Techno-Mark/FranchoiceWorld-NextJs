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

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const fetchData = async () => {
    try {
      const res = await getData(pathname);
      if (res) {
        setHomeData(res.responseData);
      } else {
        throw new Error("Something went wrong...!!!");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pathname]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex flex-col min-h-screen">
      {homeData && (
        <>
          <Banner props={homeData.banner} />
          <HalfBanner />
          <WhyChoose />
          <FindFranchise />
          <ListBrandBanner />
          <TopBrandSlider
            sectionTitle={homeData.opportunity.sectionTitle}
            items={homeData.opportunity.items}
          />
          <Testimonial
            title="Success Stories"
            testimonials={homeData.testimonials}
          />
          <FranchiseIndustry />
          <AboutFranchoice />
          <OurService />
          <TopBrandSlider
            sectionTitle={homeData.international.sectionTitle}
            items={homeData.international.items}
          />
          <TrandingVideo items={homeData.trandingVideo.items} />
        </>
      )}
    </main>
  );
}
