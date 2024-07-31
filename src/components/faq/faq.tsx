import React from "react";
import AccordionGroup from "../accordion/accordiongroup";
import Title from "../title/title";

type FaqItem = {
  title: string;
  content: React.ReactNode;
};

type FaqProps = {
  title: string;
  description: string;
  additionalMessage: string;
  items: FaqItem[];
};

const Faq: React.FC<FaqProps> = ({
  title,
  description,
  additionalMessage,
  items,
}) => {
  return (
    <div className="container mx-auto py-4 md:pt-6 md:pb-10">
      <Title title={title} titleClass="!pb-2" />
      <p className="text-[14px] md:text-[18px] font-medium pb-4 md:pb-10 border-b border-[rgba(0,0,0,0.12)] md:w-5/6">
        {description}{" "}
        <span className="text-[14px] md:text-[18px] font-medium md:block">
          {additionalMessage}
        </span>
      </p>
      <AccordionGroup items={items} className="w-full md:w-5/6" />
    </div>
  );
};

export default Faq;
