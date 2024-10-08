import React from "react";
import Image from "next/image";

interface AboutSectionProps {
  title: string;
  subtitle: string;
  mission: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  callToAction: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  subtitle,
  mission,
  imageSrc,
  imageAlt,
  description,
  callToAction,
}) => {
  return (
    <section className="py-4 md:py-16">
      <div className="container text-center">
        <div className="w-full md:w-9/12  mx-auto">
          <div className="text-[var(--footer-bg)] text-2xl pb-10 md:text-5xl font-extrabold max-w-[600px] mx-auto">
            {title}
          </div>
          <div className="md:text-[16px] opacity-80 md:pb-0 pb-9  text-sm text-[var(--about-text)]">
            {subtitle}
          </div>
          <div className="md:text-[18px] opacity-80 text-sm pb-8  md:pb-10 font-semibold text-[var(--about-text)]">
            {mission}
          </div>
        </div>
        <div className="w-[90%] mx-auto ">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={978}
            className="flex items-center w-full h-full rounded-xl md:rounded-sm md:max-h-[523px] object-contain md:mb-9 mb-7"
            height={523}
          />
        </div>
        <div className="w-full md:w-4/6 opacity-70 mx-auto">
          <div className="md:text-[16px]  text-sm text-[var(--about-text)]">
            {description}
          </div>
          <div className="md:text-[18px] text-sm pb-8 pt-4 md:pb-10 font-semibold text-[var(--about-text)]">
            {callToAction}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
