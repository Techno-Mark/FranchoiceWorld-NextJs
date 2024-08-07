import Link from "next/link";
import styles from "./franchiseIndustry.module.css";
import Title from "../title/title";
import Image from "next/image";

interface Title {
  text: string;
  style: string;
}

export type LinkObject = {
  type: "link";
  text: string;
  href: string;
};

export interface Paragraph {
  text: string | (string | LinkObject)[];
  style: string;
}

interface FranchiseIndustryProps {
  title?: Title;
  className?: string;
  mainTitle?: string;
  mainTitleClass?: string;
  topTitle?: string;
  topTitleClass?: string;
  paragraphs?: Paragraph[];
  linkText?: string;
  linkHref?: string;
  image?: string;
  imagewidth?: number;
  imageHeight?: number;
  paraStyle?: string;
}

const FranchiseIndustry: React.FC<FranchiseIndustryProps> = ({
  title,
  mainTitle,
  topTitle,
  topTitleClass,
  mainTitleClass,
  paragraphs = [],
  className,
  linkText,
  linkHref,
  imagewidth,
  imageHeight,
  image,
  paraStyle,
}) => {
  return (
    <section
      className={` ${className ? className : "py-6 md:py-20"} ${
        styles.franchiseIndustry
      }`}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 text-center md:text-left">
          <div className={`${styles.industryLeft}`}>
            {image ? (
              <Image
                src={image}
                height={imageHeight}
                width={imagewidth}
                alt="Franchise Industry"
                className="mb-4 mx-auto md:mb-0"
              />
            ) : (
              title && (
                <h3 className={`mb-4 md:mb-0 ${title.style}`}>{title.text}</h3>
              )
            )}
          </div>
          <div className={`${styles.industryRight}`}>
            <p className={topTitleClass}>{topTitle}</p>
            {mainTitle && (
              <Title title={mainTitle} titleClass={mainTitleClass} />
            )}

            {paragraphs?.map((paragraph, index) => (
              <p
                key={index}
                className={`${paraStyle ? paraStyle : "pb-4"} ${
                  paragraph.style
                }`}
              >
                {Array.isArray(paragraph.text)
                  ? paragraph.text.map((item, i) =>
                      typeof item === "string" ? (
                        item
                      ) : item.type === "link" ? (
                        <a
                          key={i}
                          href={item.href}
                          className="text-[--hyper-link] underline"
                        >
                          {item.text}
                        </a>
                      ) : null
                    )
                  : paragraph.text}
              </p>
            ))}
            {linkText && linkHref && (
              <Link
                className="font-bold bg-[var(--highlighted-color)] text-white px-4 py-2 rounded hover:bg-[var(--highlighted-hover)]"
                href={linkHref}
              >
                {linkText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseIndustry;
