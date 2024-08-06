import Image from "next/image";
import Link from "next/link";
import Title from "../title/title";
import styles from "./aboutfranchoice.module.css";
import React from "react";

interface AboutFranchoiceProps {
  title: string;
  titleClass?: string;
  content: React.ReactNode;
  linkText?: string;
  linkHref?: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  className?: string;
  imageClass?: string;
  contentClass?: string;
  responsiveClass?: boolean;
}

const AboutFranchoice: React.FC<AboutFranchoiceProps> = ({
  title,
  titleClass,
  content,
  linkText,
  linkHref,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  className,
  imageClass,
  responsiveClass = false,
  contentClass,
}) => {
  return (
    <section
      className={` ${className ? className : "py-10 md:py-20"} w-full ${
        styles.aboutFranchoice
      }`}
    >
      <div className="container">
        {!responsiveClass && (
          <div className="block md:hidden text-center">
            <Title title={title} />
          </div>
        )}
        <div className="flex items-center flex-col-reverse md:flex-row gap-6 text-center md:text-left">
          <div className={`pb-6 md:pb-0 w-full md:w-1/2 ${styles.aboutLeft}`}>
            <div className={`${responsiveClass ? "" : "hidden md:block"}`}>
              <Title title={title} titleClass={titleClass} />
            </div>
            <div className={`pb-8 ${contentClass}`}>{content}</div>
            {linkText && linkHref && (
              <Link
                className="font-bold bg-[var(--highlighted-color)] text-white px-4 py-2 rounded hover:bg-[var(--highlighted-hover)]"
                href={linkHref}
              >
                {linkText}
              </Link>
            )}
          </div>
          <div
            className={`w-full flex justify-center md:justify-end md:w-1/2 mt-4 md:mt-0 ${styles.aboutRight}`}
          >
            <Image
              className={`w-full ${imageClass}  object-contain max-w-[${imageWidth}px] ${styles.aboutImage}`}
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFranchoice;
