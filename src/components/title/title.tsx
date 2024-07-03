import React from "react";
import styles from "./title.module.css";

interface TitleProps {
  title: string;
  desc?: string;
  varient?: "white" | "blue";
}

const Title: React.FC<TitleProps> = ({ title, desc, varient = "blue" }) => {
  return (
    <>
      <h3
        className={`font-bold ${styles.title} ${
          varient === "white" ? "!text-white" : ""
        }`}
      >
        {title}
      </h3>
      {desc && <p className={`px-0 md:px-5 ${styles.description}`}>{desc}</p>}
    </>
  );
};

export default Title;
