import React from "react";
import AccordionGroup from "../accordion/accordiongroup";
import Title from "../title/title";

const items = [
  {
    title: "How can I list my franchise on your portal?",
    content: (
      <p>Personal information like name, email address, and contact details.</p>
    ),
  },
  {
    title:
      "What benefits would I receive by listing my franchise on your portal?",
    content: <p>Brand details like name, industry, location, and others.</p>,
  },
  {
    title: "What does franchise advisory involve?",
    content: <p>Investment details like franchise fee, investment range.</p>,
  },
  {
    title: "How can my brand benefit from using franchise advisory services?",
    content: <p>Brand details like brochure, logo, and images.</p>,
  },
];

const Faq: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <Title
        title="FAQs"
      />
      <AccordionGroup items={items} />
    </div>
  );
};

export default Faq;
