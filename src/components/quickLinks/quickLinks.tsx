import Link from "next/link";
import styles from "./quickLinks.module.css";

interface QuickLink {
  content: string;
  path: string;
}

interface QuickLinkProps {
  quickLink: {
    title: string;
    linkItem: QuickLink[];
  }[];
}

const QuickLinks: React.FC<QuickLinkProps> = ({ quickLink }) => {
  return (
    <section className={`mt-10 md:mt-16 py-10 md:py-16 ${styles.quickLinks}`}>
      <div className="container">
        {quickLink.map((d, index) => (
          <div className="mt-6" key={index}>
            <h3 className="text-[16px] font-bold text-[#333]">{d.title}</h3>
            <div className="flex flex-wrap py-6  text-[#333]">
              {d.linkItem.map((x, subIndex) => (
                <span
                  className="my-1 text-[16px] pr-1 mr-1 border-r border-[var(--text-color)] last:border-r-0 leading-none"
                  key={subIndex}
                >
                  <Link
                    className="hover:text-[var(--footer-bg)] hover:underline pointer-events-none"
                    href={x.path}
                  >
                    {x.content}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
