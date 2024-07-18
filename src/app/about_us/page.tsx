"use client";
import CardGrid from "@/components/cardGrid/page";
import Faq from "@/components/faq/faq";
import FindFranchise from "@/components/findFranchise/findFranchise";
import InnerListBrandBanner from "@/components/innerListBrandBanner/innerListBrandBanner";
import QuickLinks from "@/components/quickLinks/quickLinks";
import Testimonial from "@/components/testimonial/testimonial";
import Title from "@/components/title/title";
import TopBrandSlider from "@/components/topBrands/topBrands";
import TrandingVideo from "@/components/trandingVideo/trandingVideo";
import WhatWeDo from "@/components/whatWeDo/whatWeDo";
import WhyChoose from "@/components/whyChoose/whyChoose";
import Image from "next/image";

const whyChooseUs = [
  {
    chooseImage: "/images/investor/expert.svg",
    chooseTitle: "Expert Guidance",
    desc: "Benefit from personalized guidance and advice from industry experts.",
  },
  {
    chooseImage: "/images/investor/wideSelection.svg",
    chooseTitle: "Wide Selection",
    desc: "Explore our extensive database of franchise opportunities to find the perfect fit for your investment goals.",
  },
  {
    chooseImage: "/images/investor/endtoend.svg",
    chooseTitle: "End-to-End Support",
    desc: "From initial onboarding to closing of a franchise, we’re with you every step of the way. Guiding you all the way to earn high ROI.",
  },
  {
    chooseImage: "/images/investor/marketInsights.svg",
    chooseTitle: "Market Insights",
    desc: "Gain valuable insights into market trends and opportunities to make informed investment decisions.",
  },
];
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
const whatWeDo = {
  title: "What Will We Do to Get You a Suitable Brand?",
  titleDesc:
    "Our comprehensive services and expert guidance are designed to help investors overcome the challenges involved in franchise investment process and achieve success.",
  items: [
    {
      title: "Identifying a Suitable Brand",
      image: "/images/whatWeDo/identifing.jpg",
      content: [
        "Detailed market research, insights, and analysis to identify brands with a strong track record of profitability.",
        "Evaluate the financial stability and historical performance of potential franchisors, ensuring you invest in a financially sound brand.",
      ],
    },
    {
      title: "Negotiation on Project Cost",
      image: "/images/whatWeDo/negotiation.jpg",
      content: [
        "Navigate contract terms, discuss pricing with vendors, and strategize cost-saving measures.",
        "Optimize your project's financial outcome while maintaining the highest quality standards.",
      ],
    },
    {
      title: "Evaluating Franchisor Support",
      image: "/images/whatWeDo/evaluating.jpg",
      content: [
        "Evaluate training programs and ongoing support offered by franchisors.",
        "Offer an understanding of the operational guidance provided by the franchisor brand.",
      ],
    },
    {
      title: "Understanding the Franchise Agreement",
      image: "/images/whatWeDo/understanding_FA.jpg",
      content: [
        "Offer legal consultation to help you understand the terms and conditions of franchise agreements.",
        "Secure a suitable and protected territory, minimizing competition and maximizing your market potential.",
      ],
    },
    {
      title: "Location Selection",
      image: "/images/whatWeDo/locationSelection.jpg",
      content: [
        "Assist in selecting the optimal location for your franchise using advanced tools and local market expertise.",
        "Find and negotiate the best deals, balancing cost with strategic location benefits.",
      ],
    },
    {
      title: "Comparative Analysis",
      image: "/images/whatWeDo/comparativeAnalysis.jpg",
      content: [
        "Help with comparative analysis, to assist you understand the most suitable brand.",
      ],
    },
    {
      title: "ROI and Financial Projections",
      image: "/images/whatWeDo/roi.jpg",
      content: [
        "Assist in showcasing brand's realistic financial projections by conducting thorough break-even analysis to align your investment with financial expectations.",
      ],
    },
  ],
};

const quickLinksData = [
  {
    title: "Browse By Investment Range",
    linkItem: [
      { content: "Under 1 Lakh", path: "#" },
      { content: "Under 2 Lakh", path: "#" },
      { content: "Under 3 Lakh", path: "#" },
      { content: "Under 5 Lakh", path: "#" },
      { content: "Under 10 Lakh", path: "#" },
      { content: "Under 15 Lakh", path: "#" },
      { content: "Under 20 Lakh", path: "#" },
      { content: "Under 25 Lakh", path: "#" },
      { content: "Under 30 Lakh", path: "#" },
      { content: "Under 50 Lakh", path: "#" },
      { content: "Under 1 Crore", path: "#" },
    ],
  },
  {
    title: "Browse By Location",
    linkItem: [
      { content: "Maharashtra", path: "#" },
      { content: "Delhi", path: "#" },
      { content: "Karnataka", path: "#" },
      { content: "Tamil Nadu", path: "#" },
      { content: "West Bengal", path: "#" },
      { content: "Gujarat", path: "#" },
      { content: "Uttar Pradesh", path: "#" },
      { content: "Madhya Pradesh", path: "#" },
      { content: "Haryana", path: "#" },
      { content: "Rajasthan", path: "#" },
      { content: "Andhra Pradesh", path: "#" },
      { content: "Kerala", path: "#" },
      { content: "Punjab", path: "#" },
      { content: "Chandigarh", path: "#" },
    ],
  },
  {
    title: "Popular Cities",
    linkItem: [
      { content: "Agra", path: "#" },
      { content: "Ahmedabad", path: "#" },
      { content: "Amritsar", path: "#" },
      { content: "Aurngabad", path: "#" },
      { content: "Bengaluru", path: "#" },
      { content: "Bhopal", path: "#" },
      { content: "Bhubaneswar", path: "#" },
      { content: "Chandigarh", path: "#" },
      { content: "Chennai", path: "#" },
      { content: "Coimbatore", path: "#" },
      { content: "Dehradun", path: "#" },
      { content: "Faridabad", path: "#" },
      { content: "Ghaziabad", path: "#" },
      { content: "Gurugram", path: "#" },
      { content: "Guwahati", path: "#" },
      { content: "Hyderabad", path: "#" },
      { content: "Indore", path: "#" },
      { content: "Jabalpur", path: "#" },
      { content: "Jaipur", path: "#" },
      { content: "Jamshedpur", path: "#" },
      { content: "Jodhpur", path: "#" },
      { content: "Kanpur", path: "#" },
      { content: "Kochi", path: "#" },
      { content: "Kolkata", path: "#" },
      { content: "Kota", path: "#" },
      { content: "Lucknow", path: "#" },
      { content: "Ludhiana", path: "#" },
      { content: "Madurai", path: "#" },
      { content: "Mangalore", path: "#" },
      { content: "Meerut", path: "#" },
      { content: "Mumbai", path: "#" },
      { content: "Mysuru", path: "#" },
      { content: "Nagpur", path: "#" },
      { content: "Nashik", path: "#" },
      { content: "Navi Mumbai", path: "#" },
      { content: "New Delhi", path: "#" },
      { content: "Noida", path: "#" },
      { content: "Patna", path: "#" },
      { content: "Prayagraj", path: "#" },
      { content: "Pune", path: "#" },
      { content: "Raipur", path: "#" },
      { content: "Rajkot", path: "#" },
      { content: "Ranchi", path: "#" },
      { content: "Shimla", path: "#" },
      { content: "Surat", path: "#" },
      { content: "Thiruvananthapuram", path: "#" },
      { content: "Udaipur", path: "#" },
      { content: "Vadodara", path: "#" },
      { content: "Varanasi", path: "#" },
      { content: "Vijayawada", path: "#" },
      { content: "Visakhapatnam", path: "#" },
    ],
  },
];

const About_us = () => {
  const cardData = [
    {
      image: "/images/aboutUs/Group.png",
      title: "Brands",
      descriptions: [
        "To become a top multi-brand franchising organization, servicing brands from different sectors, and to deliver the best growth opportunities.",
        "Our goal is to build stronger fundamental structures in each company and channel the investments towards building brands that ultimately lead to continuous success.",
      ],
    },
    {
      image: "/images/aboutUs/Group_1.png",
      title: "Investor",
      descriptions: [
        "To become an extraordinary franchising platform, bringing together varied market leaders, entrepreneurs, and visionaries for a deep franchising landscape.",
        "We strive to build a proactive franchising solutions platform to help investors find their favorite brands and accelerate growth.",
      ],
    },
    {
      image: "/images/aboutUs/Group_2.png",
      title: "Independent Framchise Partner",
      descriptions: [
        "To become a leading franchising partner to new and existing franchisors, growing them to excel and become best-in-class franchising organizations.",
        "Our goal is to provide top-notch, polished, and valuable superior quality services to franchisors and franchisees through our Independent Franchise Partners.",
      ],
    },
    {
      image: "/images/aboutUs/Group_3.png",
      title: "Real Estate Developer",
      descriptions: [
        "To be recognized as the leader in world-class real estate franchise development firm across all industries in real estate products and concepts.",
        "Our mission is to provide integrated services from strategic planning to turnkey solutions, characterized by creativity, cost-effectiveness, and an individualized response to our clients.",
      ],
    },
  ];
  return (
    <>
      <div className="mx-auto md:max-w-[50%] text-center pt-3 pb-20 md:py-16 ">
        <div className="text-[rgba(23,73,138,1)] text-2xl pb-4 md:pb-10 md:text-6xl font-extrabold">
          Welcome to Franchoice World,
        </div>

        <div className="text-sm md:text-base font-normal text-[rgba(115,114,115,1)]">
          by Gyaata and Pacific Group of Companies. Our mission is to empower
          brands to achieve expansive growth through strategic franchise
          partnerships.
          <span className="text-sm pb-8 pt-4 md:text-xl md:pb-10 block font-semibold text-[rgba(115,114,115,1)]">
            We aim to be the No.1 choice for brands to write their successful
            expansion story.
          </span>
        </div>

        <div className="items-center w-full">
          <Image
            src="/images/aboutUs/about_us_Banner.svg"
            alt={""}
            width={978}
            className="flex items-center w-full"
            height={523}
          />
        </div>
        <div className="text-sm md:text-base font-normal text-[rgba(115,114,115,1)]">
          With strategic franchise development, we help brands to expand into
          every nook and corner and entrepreneurs to scale success in their
          business. With our firm grounding in the Indian market and a vision to
          extend globally, we provide wide-ranging services for franchise
          listing, advisory, and growth. Our personalized support, local
          expertise, and data-driven strategies make us the go-to platform for
          successful franchise expansion.
          <span className="text-sm  pt-4 md:text-xl block font-semibold text-[rgba(115,114,115,1)]">
            Join us and realize the potential of your brand.
          </span>
        </div>
      </div>

      {/* not set */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-24 mx-auto max-w-[50%] pt-3 pb-16 md:py-16">
        <div className=" w-full ">
          <div className="text-[rgba(23,73,138,1)]  text-3xl md:text- font-extrabold">
            Mission
          </div>
          <div className="text-[rgba(115,114,115,1)] text-lg pt-6 md:text- font-semibold">
            Our mission at Franchoice World is to convert businesses into
            successful franchises.
          </div>
          <div className="text-[rgba(115,114,115,1)] text-lg pt-6 md:text- font-normal">
            We offer a range of services that are meant to take you through the
            entire process of franchising, from the stage of conceptualization
            to actual support.
          </div>
        </div>

        <div className="text-sm  md:text-base font-normal text-[rgba(115,114,115,1)]">
          <Image
            src="/images/aboutUs/Our_mission.png"
            alt={""}
            width={172}
            className="flex items-center w-full pb-5"
            height={206}
          />
        </div>
      </div>

      <CardGrid cardData={cardData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 mx-auto max-w-[50%] pt-3 pb-20 md:pb-9">
        <div className="text-sm  md:text-base font-normal text-[rgba(115,114,115,1)]">
          <Image
            src="/images/aboutUs/Our_values.png"
            alt={""}
            width={172}
            className="flex items-center w-full pb-5"
            height={206}
          />
        </div>
        <div className="w-full">
          <div className="text-[rgba(23,73,138,1)]  text-3xl md:text-lg font-extrabold">
            Values
          </div>
          <div className="text-[rgba(115,114,115,1)] text-lg pt-6 md:text-lg font-semibold">
            Franchoice World provides a strategic approach to franchise growth,
            combining creative methods and custom support.
          </div>
          <div className="text-[rgba(115,114,115,1)] text-lg pt-6 md:text-lg font-normal">
            We make pathways available for investors into unexplored markets,
            and offer a bright business future to brands, investors, independent
            franchise partners, and real estate developers, establishing us as
            the leading choice for expansion.
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[50%] text-center pt-3 pb-20 md:pb-8">
        <div className="text-[rgba(23,73,138,1)] text-2xl  md:text-3xl font-extrabold">
          Meet our team
        </div>

        <div className="text-sm md:text-base pt-6 font-normal text-[rgba(115,114,115,1)]">
          Get to know the Franchoice World team - your partners in building
          thriving franchises with personalized guidance and industry knowledge.
        </div>
      </div>

      <div className="container items-center">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-6">
          <div>
            <Image
              src="/images/aboutUs/team_photo.png"
              alt={""}
              width={172}
              className="flex items-center w-full pb-5"
              height={206}
            />
            <div className="max-w-2">
              <span className="text-[rgba(23,73,138,1)] font-semibold text-base">
                Sunil Sengunthar
              </span>
            </div>
            <div className="pt-1 font-semibold">
              <span>Vice Presiden Sales</span>
            </div>
          </div>
          <div>
            <Image
              src="/images/aboutUs/team_photo_1.png"
              alt={""}
              width={172}
              className="flex items-center w-full pb-5"
              height={206}
            />
            <div className="max-w-2">
              <span className="text-[rgba(23,73,138,1)] font-semibold text-base">
                Saurabh Pushp
              </span>
            </div>
            <div className="pt-1 font-semibold">
              <span>National Head - Sales</span>
            </div>
          </div>
          <div>
            <Image
              src="/images/aboutUs/team_photo_2.png"
              alt={""}
              width={172}
              className="flex items-center w-full pb-5"
              height={206}
            />
            <div className="max-w-2">
              <span className="text-[rgba(23,73,138,1)] font-semibold text-base">
                Mayanka jain
              </span>
            </div>
            <div className="pt-1 font-semibold">
              <span>Sr. Manager</span>
            </div>
          </div>
          <div>
            <Image
              src="/images/aboutUs/team_photo_3.png"
              alt={""}
              width={172}
              className="flex items-center w-full pb-5"
              height={206}
            />
            <div className="max-w-2">
              <span className="text-[rgba(23,73,138,1)] font-semibold text-base">
                Durgaprasad Choubey
              </span>
            </div>
            <div className="pt-1 font-semibold">
              <span>Brand Servicing</span>
            </div>
          </div>
          <div>
            <Image
              src="/images/aboutUs/team_photo_4.png"
              alt={""}
              width={172}
              className="flex items-center w-full pb-5"
              height={206}
            />
            <div className="max-w-2">
              <span className="text-[rgba(23,73,138,1)] font-semibold text-base">
                Prachi Joshi
              </span>
            </div>
            <div className="pt-1 font-semibold">
              <span>Sales Executive</span>
            </div>
          </div>
        </div>
      </div>

      <QuickLinks quickLink={quickLinksData} />
    </>
  );
};

export default About_us;
