"use client";
import AboutSection from "@/components/aboutSection/page";
import CardGrid from "@/components/cardGrid/page";
import ImageGallery from "@/components/imageGallery/ImageGallery";
import QuickLinks from "@/components/quickLinks/quickLinks";
import TeamSection from "@/components/teamSection/page";
import Title from "@/components/title/title";

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

const cardData = [
  {
    image: "/images/aboutUs/Group.png",
    title: "Brand",
    descriptions: [
      "To become a top multi-brand franchising organization, servicing brands from different sectors, and to deliver the best growth opportunities.",
      "Our goal is to build stronger fundamental structures in each company and channel the investments towards building brands that ultimately lead to continuous success.",
    ],
    url: "/list-your-brand",
  },
  {
    image: "/images/aboutUs/Group_1.png",
    title: "Investor",
    descriptions: [
      "To become an extraordinary franchising platform, bringing together varied market leaders, entrepreneurs, and visionaries for a deep franchising landscape.",
      "We strive to build a proactive franchising solutions platform to help investors find their favorite brands and accelerate growth.",
    ],
    url: "/investor",
  },
  {
    image: "/images/aboutUs/Group_2.png",
    title: "Independent Franchise Partner",
    descriptions: [
      "To become a leading franchising partner to new and existing franchisors, growing them to excel and become best-in-class franchising organizations.",
      "Our goal is to provide top-notch, polished, and valuable superior quality services to franchisors and franchisees through our Independent Franchise Partners.",
    ],
    url: "/ifp",
  },
  {
    image: "/images/aboutUs/Group_3.png",
    title: "Real Estate Developer",
    descriptions: [
      "To be recognized as the leader in world-class real estate franchise development firm across all industries in real estate products and concepts.",
      "Our mission is to provide integrated services from strategic planning to turnkey solutions, characterized by creativity, cost-effectiveness, and an individualized response to our clients.",
    ],
    url: "/real-estate",
  },
];

const teamMembers = [
  {
    name: "Sunil Sengunthar",
    position: "Vice President Sales",
    imageSrc: "/images/aboutUs/team_photo.png",
  },
  {
    name: "Saurabh Pushp",
    position: "National Head - Sales",
    imageSrc: "/images/aboutUs/team_photo_1.png",
  },
  {
    name: "Mayanka Jain",
    position: "Sr. Manager",
    imageSrc: "/images/aboutUs/team_photo_2.png",
  },
  {
    name: "Durgaprasad Choubey",
    position: "Brand Servicing",
    imageSrc: "/images/aboutUs/team_photo_3.png",
  },
  {
    name: "Prachi Joshi",
    position: "Sales Executive",
    imageSrc: "/images/aboutUs/team_photo_4.png",
  },
];

const galleryImages = [
  {
    imagePath: "/images/aboutUs/ourMission/mission2.png",
    name: "mission3",
    width: 177,
    height: 218,
    column: 1,
  },
  {
    imagePath: "/images/aboutUs/ourMission/mission1.jpg",
    name: "mission1",
    width: 177,
    height: 218,
    column: 0,
  },
  {
    imagePath: "/images/aboutUs/ourMission/mission4.png",
    name: "mission3",
    width: 177,
    height: 218,
    column: 1,
  },
  {
    imagePath: "/images/aboutUs/ourMission/mission3.png",
    name: "mission4",
    width: 177,
    height: 218,
    column: 0,
  },
];

const ValueImages = [
  {
    imagePath: "/images/aboutUs/ourValue/ourValue2.png",
    name: "mission1",
    width: 177,
    height: 218,
    column: 1,
  },
  {
    imagePath: "/images/aboutUs/ourValue/ourValue1.png",
    name: "mission2",
    width: 177,
    height: 218,
    column: 0,
  },
  {
    imagePath: "/images/aboutUs/ourValue/ourValue4.png",
    name: "mission3",
    width: 177,
    height: 218,
    column: 1,
  },
  {
    imagePath: "/images/aboutUs/ourValue/ourValue3.png",
    name: "mission4",
    width: 177,
    height: 218,
    column: 0,
  },
];

const About_us = () => {
  return (
    <>
      <AboutSection
        title="Welcome to Franchoice World."
        subtitle="Our mission is to empower brands to achieve expansive growth through strategic franchise partnerships."
        mission="We aim to be the No.1 choice for brands to write their successful expansion story."
        imageSrc="/images/IMG.png"
        imageAlt="About Banner"
        description="With strategic franchise development, we help brands to expand into every nook and corner and entrepreneurs to scale success in their business. With our firm grounding in the Indian market and a vision to extend globally, we provide wide-ranging services for franchise listing, advisory, and growth. Our personalized support, local expertise, and data-driven strategies make us the go-to platform for successful franchise expansion."
        callToAction="Join us and realize the potential of your brand."
      />
      <section className="bg-[rgba(203,224,244,0.2)] py-10 md:pb-4 md:pt-8">
        <div className="container">
          <div className="flex justify-between items-center flex-col md:flex-row w-full lg:w-4/5 mx-auto">
            <div className="w-full md:w-2/4">
              <Title
                title="Mission"
                titleClass="md:!text-[30px] !text-[30px]"
              />
              <div className="text-[var(--about-text)] text-lg pt-6 tracking-tight opacity-70 font-semibold">
                Our mission at Franchoice World is to convert businesses into
                successful franchises.
              </div>
              <div className="text-[var(--about-text)] text-lg pt-6 tracking-tight opacity-70 font-normal">
                We offer a range of services that are meant to take you through
                the entire process of franchising, from the stage of
                conceptualization to actual support.
              </div>
            </div>
            <ImageGallery column={2} galleryImages={galleryImages} />
          </div>
        </div>

        <CardGrid cardData={cardData} />
      </section>

      {/* values section */}
      <section className="py-8 md:py-16">
        <div className="container">
          <div className="flex justify-between items-center flex-col-reverse md:flex-row w-full lg:w-4/5 mx-auto">
            <ImageGallery column={2} galleryImages={ValueImages} />
            <div className="w-full md:w-2/4">
              <Title title="Values" />
              <div className="text-[var(--about-text)] text-lg pt-6 tracking-tight opacity-70 font-semibold">
                Franchoice World provides a strategic approach to franchise
                growth, combining creative methods and custom support.
              </div>
              <div className="text-[var(--about-text)] text-lg pt-6 tracking-tight opacity-70 font-normal">
                We make pathways available for investors into unexplored
                markets, and offer a bright business future to brands,
                investors, independent franchise partners, and real estate
                developers, establishing us as the leading choice for expansion.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet our team section */}
      <TeamSection
        title="Meet Our Team"
        description="Get to know the Franchoice World team - your partners in building thriving franchises with personalized guidance and industry knowledge."
        teamMembers={teamMembers}
      />

      <QuickLinks quickLink={quickLinksData} />
    </>
  );
};

export default About_us;
