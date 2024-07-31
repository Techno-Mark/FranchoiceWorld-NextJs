"use client";

import Image from "next/image";
import styles from "./franchisebanner.module.css";

interface BannerProps {
  props: {
    bannerImage: string;
    SectionTitle: string;
    desc?: string;
    items: Array<{
      text: string;
      boldParts?: string[];
    }>;
    noborder?: boolean;
  };
}

const FranchiseBanner: React.FC<BannerProps> = ({ props }) => {
  const renderTextWithBoldParts = (text: string, boldParts?: string[]) => {
    if (!boldParts || boldParts.length === 0) {
      return text;
    }

    const parts = [];
    let lastIndex = 0;

    boldParts.forEach((boldPart) => {
      const index = text.indexOf(boldPart, lastIndex);
      if (index !== -1) {
        if (index > lastIndex) {
          parts.push(text.slice(lastIndex, index));
        }
        parts.push(
          <span key={index} className="font-bold text-base ">
            {boldPart}
          </span>
        );
        lastIndex = index + boldPart.length;
      }
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  return (
    <section className={`py-8 md:py-24 ${styles.innerListBrandBanner}`}>
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start">
          <div
            className={`w-full lg:w-1/2 ${styles.listBrandBannerText} lg:pr-8 order-1 `}
          >
            <div className="w-11/12">
              <h4
                className={`font-extrabold border-[var(--bottom-border)] border-b-[0.5px] ${styles.innerBrandTitle}`}
              >
                {props.SectionTitle}
              </h4>
              <h4 className={styles.innerBrandSubtitle}>{props.desc}</h4>
              <ul className="pb-8">
                {props.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2.5 pb-4">
                    <span className="text-base w-[calc(100%-20px)]">
                      {renderTextWithBoldParts(item.text, item.boldParts)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 order-2 ">
            <Image
              className="w-full object-contain max-w-[461px] mx-auto lg:mr-0"
              src={props.bannerImage}
              alt="List your Brand"
              width={461}
              height={378}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseBanner;
