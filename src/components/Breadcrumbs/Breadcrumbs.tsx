import Link from "next/link";
import React from "react";
import { GoHome } from "react-icons/go";
import styles from "./breadcrumbs.module.css";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
}) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className={styles.breadcrumb}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index > 0 && <span className={styles.separator}>{separator}</span>}
            {index < items.length - 1 ? (
              <Link
                className="flex items-center text-[10px] md:text-[12px] font-medium"
                href={item.href}
              >
                {item.label === "Home" && (
                  <GoHome size={20} className={styles.homeIcon} />
                )}
                {item.label}
              </Link>
            ) : (
              <span className="text-[10px] md:text-[12px] font-semibold text-[var(--third-color)]">
                {item.label === "Home" && (
                  <GoHome size={20} className={styles.homeIcon} />
                )}
                {item.label !== "Home" && item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
