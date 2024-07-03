
import React from 'react';
import Accordion from './accordion';

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionGroupProps {
  items: AccordionItem[];
  className?:string;
}

const AccordionGroup: React.FC<AccordionGroupProps> = ({ items, className }) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <Accordion key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default AccordionGroup;
