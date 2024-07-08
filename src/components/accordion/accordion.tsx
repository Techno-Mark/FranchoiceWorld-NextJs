"use client";
import React, { useState } from "react";
import styles from "./accordion.module.css";
import { PiCaretDown, PiCaretDownBold } from "react-icons/pi";
interface AccordionProps {
  title: string;
  content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-[rgba(0,0,0,0.12)]">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none"
        onClick={toggleAccordion}
      >
        <span className={`pr-3 md:pr-0 ${styles.accordianTitle}`}>{title}</span>
        <PiCaretDownBold
          className={`text-lg transition-all ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-max-height duration-300 border-t border-[rgba(0,0,0,0.12)] ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};

export default Accordion;
