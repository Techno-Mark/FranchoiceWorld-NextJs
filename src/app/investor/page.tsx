"use client";
import { getFranchiseList } from "@/api/home";
import Faq from "@/components/faq/faq";
import FindFranchise from "@/components/findFranchise/findFranchise";
import InnerListBrandBanner from "@/components/innerListBrandBanner/innerListBrandBanner";
import InquireForm from "@/components/inquireForm/inquireForm";
import QuickLinks from "@/components/quickLinks/quickLinks";
import Testimonial from "@/components/testimonial/testimonial";
import TopBrandSlider from "@/components/topBrands/topBrands";
import WhatWeDo from "@/components/whatWeDo/whatWeDo";
import WhyChoose from "@/components/whyChoose/whyChoose";
import { formatInvestmentRange } from "@/utills/CommonFunction";
import Link from "next/link";
import { useEffect, useState } from "react";

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
// const opportunity = {
//   sectionTitle: "Top Business Opportunities",
//   items: [
//     {
//       image: "/images/bussinessImage.jpg",
//       title: "Froozo",
//       category: "F&B",
//       investmentRange: "₹30L - 50L",
//       areaRequired: "1000 - 1500",
//       franchiseOutlet: "20 - 50",
//       favorite: false,
//     },
//     {
//       image: "/images/bussinessImage.jpg",
//       title: "Froozo",
//       category: "F&B",
//       investmentRange: "₹30L - 50L",
//       areaRequired: "1000 - 1500",
//       franchiseOutlet: "20 - 50",
//       favorite: true,
//     },
//     {
//       image: "/images/bussinessImage.jpg",
//       title: "Froozo",
//       category: "F&B",
//       investmentRange: "₹30L - 50L",
//       areaRequired: "1000 - 1500",
//       franchiseOutlet: "20 - 50",
//       favorite: false,
//     },
//     {
//       image: "/images/bussinessImage.jpg",
//       title: "Froozo",
//       category: "F&B",
//       investmentRange: "₹30L - 50L",
//       areaRequired: "1000 - 1500",
//       franchiseOutlet: "20 - 50",
//       favorite: true,
//     },
//   ],
// };

const testimonials = [
  // {
  //   message:
  //     "Through excellent marketing work, Sunil and his entire team have been a great help in developing our brand. It has been a very convenient process to work with the team. They have great communication skills and strong technical knowledge. You guys rock!",
  //   author: "Connplex",
  //   companyLogo: "/images/testimonial/connplex.jpg",
  // },
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

// const trandingVideo = {
//   items: [
//     {
//       id: "1",
//       title:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
//       videoThumbnail: "/images/banner.jpg",
//     },
//     {
//       id: "2",
//       title:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
//       videoThumbnail: "/images/banner.jpg",
//     },
//     {
//       id: "3",
//       title:
//         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
//       videoThumbnail: "/images/banner.jpg",
//     },
//   ],
// };

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
    // {
    //   title: "Evaluating Franchisor Support",
    //   image: "/images/whatWeDo/evaluating.jpg",
    //   content: [
    //     "Evaluate training programs and ongoing support offered by franchisors.",
    //     "Offer an understanding of the operational guidance provided by the franchisor brand.",
    //   ],
    // },
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
      { content: "Under 1 Lakh" },
      { content: "Under 2 Lakh" },
      { content: "Under 3 Lakh" },
      { content: "Under 5 Lakh" },
      {
        content: "Under 10 Lakh",
        path: "franchise/list?type=categories&industry=null&sector=null&service=null",
      },
      {
        content: "Under 15 Lakh",
        path: "franchise/list?type=categories&industry=null&sector=null&service=null",
      },
      {
        content: "Under 20 Lakh",
        path: "franchise/list?type=categories&industry=null&sector=null&service=null",
      },
      {
        content: "Under 25 Lakh",
        path: "franchise/list?type=categories&industry=null&sector=null&service=null",
      },
      {
        content: "Under 30 Lakh",
        path: "franchise/list?type=categories&industry=null&sector=null&service=null",
      },
      {
        content: "Under 50 Lakh",
        path: "franchise/list?type=categories&industry=null&sector=null&service=null",
      },
      {
        content: "Under 1 Crore",
        path: "franchise/list?type=categories&industry=null&sector=null&service=null",
      },
    ],
  },
  {
    title: "Browse By Location",
    linkItem: [
      { content: "Maharashtra" },
      { content: "Delhi" },
      { content: "Karnataka" },
      { content: "Tamil Nadu" },
      { content: "West Bengal" },
      { content: "Gujarat" },
      { content: "Uttar Pradesh" },
      { content: "Madhya Pradesh" },
      { content: "Haryana" },
      { content: "Rajasthan" },
      { content: "Andhra Pradesh" },
      { content: "Kerala" },
      { content: "Punjab" },
      { content: "Chandigarh" },
    ],
  },
  {
    title: "Popular Cities",
    linkItem: [
      { content: "Agra" },
      { content: "Ahmedabad" },
      { content: "Amritsar" },
      { content: "Aurngabad" },
      { content: "Bengaluru" },
      { content: "Bhopal" },
      { content: "Bhubaneswar" },
      { content: "Chandigarh" },
      { content: "Chennai" },
      { content: "Coimbatore" },
      { content: "Dehradun" },
      { content: "Faridabad" },
      { content: "Ghaziabad" },
      { content: "Gurugram" },
      { content: "Guwahati" },
      { content: "Hyderabad" },
      { content: "Indore" },
      { content: "Jabalpur" },
      { content: "Jaipur" },
      { content: "Jamshedpur" },
      { content: "Jodhpur" },
      { content: "Kanpur" },
      { content: "Kochi" },
      { content: "Kolkata" },
      { content: "Kota" },
      { content: "Lucknow" },
      { content: "Ludhiana" },
      { content: "Madurai" },
      { content: "Mangalore" },
      { content: "Meerut" },
      { content: "Mumbai" },
      { content: "Mysuru" },
      { content: "Nagpur" },
      { content: "Nashik" },
      { content: "Navi Mumbai" },
      { content: "New Delhi" },
      { content: "Noida" },
      { content: "Patna" },
      { content: "Prayagraj" },
      { content: "Pune" },
      { content: "Raipur" },
      { content: "Rajkot" },
      { content: "Ranchi" },
      { content: "Shimla" },
      { content: "Surat" },
      { content: "Thiruvananthapuram" },
      { content: "Udaipur" },
      { content: "Vadodara" },
      { content: "Varanasi" },
      { content: "Vijayawada" },
      { content: "Visakhapatnam" },
    ],
  },
];

const Investor = () => {
  const [opportunity, setOpportunity] = useState<TopBrandSliderProps>({
    sectionTitle: "Top Business Opportunities",
    items: [],
  });

  const fetchTopOppData = async () => {
    try {
      const res = await getFranchiseList(
        "/form-details/list?type=categories&limit=4"
      );

      const oppArray = res.map((r: any) => ({
        id: r.id,
        image: r.brandImages[0],
        title: r.brandName,
        category: r.subCategory,
        investmentRange: formatInvestmentRange(r.investmentRange),
        areaRequired: r.areaaRequired,
        franchiseOutlet: r.numberOfLocations,
        favorite: false,
      }));

      setOpportunity({
        ...opportunity,
        items: oppArray,
      });
    } catch (error) {
      console.error("Error fetching list Top franchise:", error);
    }
  };

  useEffect(() => {
    fetchTopOppData();
  }, []);

  const innerBanner = {
    bannerImage: "/images/innerInvestorBanner.png",
    submitURL: "/investor/step_1",
    SectionTitle: "Investment",
    desc: "Take an entrepreneurial leap with right investment!",
    items: [
      "Unveil our registered and listed franchise brands looking for investors.",
      "Gain access to the franchiser brand and investment details.",
      "Unlock growth by investing in the most suitable brand of your choice",
    ],
    noborder: true,
  };

  const faqItems = [
    {
      title: "How can I find franchises for investment on your portal?",
      content: (
        <>
          <p>
            You can go to the &apos;Find Your Franchise&apos; tab on Home Page
            and select the brand as per your required category, in terms of
            industry, sector, and products/services. You can further filter
            based on your desired location and investment criteria.
          </p>
        </>
      ),
    },
    {
      title:
        "What benefits would I receive by investing in a franchise on your portal?",
      content: (
        <>
          <p>
            Investing in a franchise from Franchoice World would help you avail
            ample benefits like:
          </p>
          <ul className="list-disc">
            <li className="ml-4">Expert Guidance</li>
            <li className="ml-4">Wide Range of Selection</li>
            <li className="ml-4">End-to-End Support</li>
            <li className="ml-4">Market Insights</li>
          </ul>
        </>
      ),
    },
    {
      title:
        "What are the terms and conditions of investing in a franchise on your portal?",
      content: (
        <p>
          To know about our policies and terms and conditions, head to our{" "}
          <Link href="/term-conditions">Terms of Use </Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link> pages before
          filling the investor form.
        </p>
      ),
    },
    {
      title: "How can I benefit from franchise growth services on your portal?",
      content: (
        <p>
          Our Franchise Growth services consist of franchise modelling,
          financial modelling, and franchise development that would help
          nurture, develop, and expand your brand.
        </p>
      ),
    },
    {
      title:
        "How can I look for franchise investment opportunities in my location?",
      content: (
        <p>
          Our &apos;Find Your Franchise&apos; section on Home Page allows you to
          filter out your franchises as per the categories, investment, and
          location of your choice.
        </p>
      ),
    },
  ];

  return (
    <>
      <InnerListBrandBanner resonsiveReverseOrder={true} props={innerBanner} />
      <div className="relative">
        <FindFranchise dark={true} />
        <div className="py-12">
          <WhyChoose cardBox={whyChooseUs} hideKnowMore={true} />
        </div>
        <TopBrandSlider
          sectionTitle={opportunity.sectionTitle}
          items={opportunity.items}
        />
        <Testimonial title="Success Stories" testimonials={testimonials} />
        {/* <TrandingVideo items={trandingVideo.items} /> */}
        <WhatWeDo
          sectionTitle={whatWeDo.title}
          titleDesc={whatWeDo.titleDesc}
          items={whatWeDo.items}
        />
        <Faq
          title="FAQs"
          description="Let us answer some of your most common queries."
          additionalMessage="Feel free to contact us in case of any more questions!"
          items={faqItems}
        />
        <QuickLinks quickLink={quickLinksData} />
        <InquireForm pageForm="Investor" />
      </div>
    </>
  );
};

export default Investor;
