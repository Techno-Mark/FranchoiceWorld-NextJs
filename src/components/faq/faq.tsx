import React from "react";
import AccordionGroup from "../accordion/accordiongroup";
import Title from "../title/title";

const items = [
  {
    title: "How can I list my franchise on your portal?",
    content: (
      <>
        <p>
          You can follow just three simple steps to list your franchise on our
          portal:
        </p>
        <p>1. Enter your mobile number.</p>
        <p>2. Add your name, address, and other details.</p>
        <p>3. Wait. Your brand is under review.</p>
      </>
    ),
  },
  {
    title:
      "What benefits would I receive by listing my franchise on your portal?",
    content: (
      <p>
        Listing your brand on our website offers several benefits like increased
        visibility, networking and access to niche market of investors and
        entrepreneurs, lead generation, cost effective marketing, support and
        resources, etc.
      </p>
    ),
  },
  {
    title: "What does franchise advisory involve?",
    content: (
      <p>
        Franchise consultation at Franchoice World involves review and
        recommendation comprising of website development, Capex and Opex model
        structuring, analysis of previous model, latest industry trends,
        competition assessment, case study, and brand identity development.
      </p>
    ),
  },
  {
    title: "How can my brand benefit from using franchise advisory services?",
    content: (
      <p>
        With our expert review and recommendation services, your brand can
        thrive to achieve end-to-end growth and development. Our services are
        especially curated and customized to meet your unique brand requirement
        to achieve successful brand expansion.
      </p>
    ),
  },
  {
    title: "How can I become a franchisee on your portal?",
    content: (
      <p>
        You can look for the franchise of your choice based on category,
        location, and investment in the ‘Find Your Franchise’ section of our
        Home Page.
      </p>
    ),
  },
];

const Faq: React.FC = () => {
  return (
    <div className="container mx-auto py-4 md:pt-6 md:pb-10">
      <Title title="FAQs" />
      <p>Let us answer some of your most common queries.</p>
      <p className="pb-4 md:pb-10 border-b border-[rgba(0,0,0,0.12)] w-full md:w-5/6">
        Feel free to contact us in case of any more questions!
      </p>
      <AccordionGroup items={items} className="w-full md:w-5/6" />
    </div>
  );
};

export default Faq;
