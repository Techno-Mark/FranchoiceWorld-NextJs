"use client";
import Link from "next/link";
import styles from "./menulink.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const MenuLink = ({ item }: any) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {item.submenu ? (
        <>
          <div className={styles.menuItem}>
            <button
              onClick={toggleSubmenu}
              className={`p-2 xl:px-3 capitalize inline-block flex gap-1 lg:gap-2 items-center ${styles.menuItem} ${styles.menuButton}`}
            >
              {item.name}
              <svg
                width="11"
                height="6"
                viewBox="0 0 11 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`ease-in duration-300 ${
                  isOpen ? "transform rotate-180 translate " : ""
                }`}
              >
                <path
                  d="M5.81689 5.85018C5.63767 5.85018 5.45847 5.78175 5.32183 5.64518L1.02206 1.34536C0.748535 1.07184 0.748535 0.628372 1.02206 0.354961C1.29547 0.0815496 1.73885 0.0815496 2.01239 0.354961L5.81689 4.15968L9.62141 0.355094C9.89493 0.0816824 10.3383 0.0816824 10.6117 0.355094C10.8853 0.628505 10.8853 1.07197 10.6117 1.34549L6.31195 5.64531C6.17524 5.78191 5.99604 5.85018 5.81689 5.85018Z"
                  fill="#737273"
                />
              </svg>
            </button>
            {isOpen && (
              <ul className={styles.submenu}>
                {item.submenu.map((subItem: any) => (
                  <li key={subItem.name}>
                    <Link href={subItem.path}>
                      <Image
                        src={subItem.icons}
                        alt={subItem.name}
                        width={20}
                        height={20}
                      />
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <>
          <Link
            href={item.path}
            className={`p-2 xl:px-3 capitalize inline-block w-full ${
              styles.menuItem
            } ${pathname === item.path && `font-bold ${styles.active}`}`}
          >
            {item.name}
          </Link>
        </>
      )}
    </>
  );
};
export default MenuLink;
