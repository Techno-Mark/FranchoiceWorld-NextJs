import React from "react";

const WordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
      fill="#2B579A"
    />
    <path d="M14 2V8H20L14 2Z" fill="#1F4370" />
    <path
      d="M15.5 15H14L12.5 10.5L11 15H9.5L7.5 9H9L10.25 13.5L11.75 9H13.25L14.75 13.5L16 9H17.5L15.5 15Z"
      fill="white"
    />
  </svg>
);

export default WordIcon;
