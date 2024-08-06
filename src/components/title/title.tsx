import React from "react";
import styles from "./title.module.css";

interface TitleProps {
  title: string;
  desc?: string;
  varient?: "white" | "blue";
  descClass?: string;
  titleClass?: string;
}

const Title: React.FC<TitleProps> = ({
  title,
  desc,
  varient = "blue",
  descClass,
  titleClass,
}) => {
  console.log(titleClass);

  return (
    <>
      <h3
        className={`font-bold ${styles.title} ${titleClass && titleClass} ${
          varient === "white" ? "!text-white" : ""
        }`}
      >
        {title}
      </h3>
      {desc && (
        <p className={`px-0 md:px-5 ${styles.description} ${descClass}`}>
          {desc}
        </p>
      )}
    </>
  );
};

export default Title;
