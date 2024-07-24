"use client";
import Banner from "@/components/banner/banner";
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
import InnerListBrandBanner from "@/components/innerListBrandBanner/innerListBrandBanner";
import InquireForm from "@/components/inquireForm/inquireForm";

// interface HomeData {
//   banner: any[];
//   opportunity: {
//     sectionTitle: "";
//     items: [];
//   };
//   international: {
//     sectionTitle: "";
//     items: [];
//   };
//   testimonials: any[];
//   trandingVideo: {
//     items: [];
//   };
// }
const opportunity = {
  sectionTitle: "Top Business Opportunities",
  items: [
    {
      image: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      image: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      image: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      image: "/images/bussinessImage.jpg",
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
      image: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      image: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      image: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      image: "/images/bussinessImage.jpg",
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
    companyLogo: "/images/testimonial/connplex.jpg",
  },
  {
    message:
      "Choosing Gyaata to expand our franchises was one of the best decisions we made. Their dedicated and creative team enhanced our brand reputation and run result-driven lead generation campaigns. We saw significant growth within a short span of time. If you are looking for your brand's franchise growth, this is the one!",
    author: "Molly Moo",
    companyLogo: "/images/testimonial/mollymoo.jpg",
  },
  {
    message:
      "Gyaata has proven to be a game-changer in our brand growth with its impeccable advertising services. Their strategic approach and innovative campaigns have effectively elevated the brand's visibility in the domestic and international market— truly a reliable partner for those seeking impactful and result-driven marketing solutions.",
    author: "Satvam",
    companyLogo: "/images/testimonial/satvam.jpg",
  },
  {
    message:
      "We have worked with Gyaata to market and sell our franchise program, they are consistent and fair in their lead generation activity and bridge the gap in finding the right partner. We believe we have found a good lead generating partner in Gyaata. Highly recommendable and referable.",
    author: "Satvam",
    companyLogo: "/images/testimonial/tcr.jpg",
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
      videoThumbnail: "/images/banner.jpg",
    },
    {
      id: "2",
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
      videoThumbnail: "/images/banner.jpg",
    },
    {
      id: "3",
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
      videoThumbnail: "/images/banner.jpg",
    },
  ],
};
const banner = {
  imgUrl: "/images/banner.jpg",
  imgAlt: "Banner image",
  bannerTitle: "Welcome to the World of Franchising",
};

const innerBanner = {
  bannerImage: "/images/leftInnerListBrandBanner.png",
  submitURL: "/list-your-brand/step_1",
  SectionTitle: "List Your Brand",
  desc: "Put your brand in the spotlight!",
  items: [
    "Gain access to a broad audience of potential franchisees",
    "Receive pre-screened, highly qualified leads from individuals.",
    "Navigate expansion challenges and achieve sustainable growth.",
  ],
  noborder: true,
  imageOnLeft: true,
};

const cardBox = [
  {
    chooseImage: "/images/brandOwner.svg",
    chooseTitle: "Brand Owner",
    list: ["Increased Visibility", "Qualified Leads", "Expert Matching"],
    redirectURL: "/list-your-brand",
  },
  {
    chooseImage: "/images/investor.svg",
    chooseTitle: "Investor",
    list: ["Personalized Matching", "Expert Guidance", "Extensive Network"],
    redirectURL: "/investor",
  },
  {
    chooseImage: "/images/independentPartner.svg",
    chooseTitle: "Independent Franchise Partner",
    list: ["Brand Recognition", "Operational Support", "Risk Mitigation"],
    redirectURL: "/ifp",
  },
  {
    chooseImage: "/images/realestate.svg",
    hoverImage: "/realestate_gray.svg",
    chooseTitle: "Real Estate Developer",
    list: [
      "Diversified Revenue Stream",
      "Steady Demand",
      "Long-term Lease Agreements",
    ],
    redirectURL: "/real-estate",
  },
];
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
      <WhyChoose cardBox={cardBox} />
      <InnerListBrandBanner props={innerBanner} />
      <InquireForm />
      <FindFranchise />
      {/* <ListBrandBanner /> */}
      <TopBrandSlider
        sectionTitle={opportunity.sectionTitle}
        items={opportunity.items}
      />
      <FranchiseIndustry />
      <AboutFranchoice />
      <OurService />
      {/* <TopBrandSlider
        sectionTitle={international.sectionTitle}
        items={international.items}
      />
      <TrandingVideo items={trandingVideo.items} /> */}
      <Testimonial title="Success Stories" testimonials={testimonials} />
    </>
  );
}
