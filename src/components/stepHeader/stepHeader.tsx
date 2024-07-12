"use client";

import React from "react";
import Link from "next/link";
import styles from "./stepHeader.module.css";
import MenuLink from "../header/menuLink/MenuLink";
import Image from "next/image";
import { useEffect, useState } from "react";

function StepHeader() {
  const menuItems = [
    {
      name: "For Assistance?",
      path: "/contact_us",
    },
  ];

  return (
    <header
      className={`sticky top-0 z-10 py-4 bg-white ${styles.headerContainer}`}
    >
      <div className="container">
        <nav className="bg-white border-gray-200">
          <div className="flex flex-wrap justify-between items-center mx-auto">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image
                src="/images/logo.svg"
                className="w-auto h-10"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
            <div className="flex gap-3 md:hidden items-center">
              <Link href="tel:+910000000000">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.3374 3.6597C16.4551 -1.22112 8.54057 -1.21966 3.65972 3.66263C-1.22113 8.54492 -1.21966 16.4594 3.66265 21.3402C8.54496 26.2211 16.4595 26.2196 21.3403 21.3378C23.6846 18.9931 25.001 15.8129 25 12.4975C24.9995 9.18261 23.6821 6.00392 21.3374 3.66019V3.6597ZM18.9307 17.4125C18.9307 17.4125 18.9297 17.4135 18.9292 17.414V17.4101L18.2959 18.0395C17.4771 18.8691 16.2837 19.2104 15.1499 18.9394C14.0078 18.6337 12.9214 18.1469 11.9331 17.498C11.0147 16.9111 10.1641 16.225 9.39555 15.4521C8.68852 14.7504 8.05375 13.9799 7.49955 13.1523C6.8936 12.2617 6.41411 11.2915 6.07475 10.269C5.68559 9.06787 6.00786 7.75049 6.90825 6.86476L7.64994 6.12306C7.856 5.91603 8.19145 5.91506 8.39848 6.1216C8.39897 6.12209 8.39945 6.12258 8.39994 6.12306L10.7417 8.46484C10.9488 8.6709 10.9497 9.00634 10.7432 9.21337L10.7417 9.21484L9.36674 10.5898C8.97221 10.98 8.9224 11.6001 9.25004 12.0483C9.74711 12.7309 10.2979 13.373 10.896 13.9692C11.563 14.6391 12.2881 15.2485 13.0625 15.79C13.5103 16.102 14.1172 16.0497 14.5039 15.665L15.833 14.3149C16.0391 14.1079 16.374 14.1069 16.5816 14.3134L16.583 14.3149L18.9287 16.665C19.1358 16.871 19.1367 17.206 18.9307 17.413V17.4125Z"
                    fill="#D21F34"
                  />
                </svg>
              </Link>
            </div>
            <div
              id="mega-menu-full"
              className={`${styles.responsiveMenu} items-center justify-between font-medium w-full md:flex md:w-auto`}
            >
              <ul className="flex flex-col items-center md:flex-row gap-6 md:gap-0">
                {menuItems.map((menu) => (
                  <li
                    className={`relative w-full md:w-auto ${styles.menuLists}`}
                    key={menu.name}
                  >
                    <MenuLink item={menu} key={menu.name} />
                  </li>
                ))}
              </ul>
              <div className={`${styles.stickyCatBtn}`}>
                <Link
                  href="/list-your-brand"
                  className={`${styles.categoryButton}`}
                >
                  List Your Brand
                </Link>
              </div>
              <div className={`ml-4 ${styles.stickyCatBtn}`}>
                <Link href="#" className={`${styles.categoryButton}`}>
                  Find Your Franchise
                </Link>
              </div>
              <div className="ml-4 hidden md:block">
                <Link
                  href="tel:+910000000000"
                  className={`flex items-center gap-2 ${styles.ctaButton}`}
                >
                  +91 00000 00000
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.6304 3.36693C15.1387 -1.12343 7.85732 -1.12208 3.36694 3.36962C-1.12344 7.86133 -1.12209 15.1427 3.36964 19.633C7.86136 24.1234 15.1427 24.122 19.6331 19.6308C21.7898 17.4736 23.0009 14.5479 23 11.4977C22.9996 8.448 21.7876 5.52361 19.6304 3.36738V3.36693ZM17.4162 16.0195C17.4162 16.0195 17.4153 16.0204 17.4149 16.0209V16.0173L16.8322 16.5963C16.0789 17.3595 14.981 17.6735 13.9379 17.4242C12.8872 17.143 11.8877 16.6951 10.9785 16.0981C10.1335 15.5582 9.35097 14.927 8.6439 14.2159C7.99343 13.5704 7.40945 12.8615 6.89959 12.1001C6.34211 11.2808 5.90098 10.3882 5.58877 9.44751C5.23075 8.34244 5.52723 7.13045 6.35559 6.31558L7.03795 5.63322C7.22752 5.44275 7.53613 5.44185 7.7266 5.63187C7.72705 5.63232 7.7275 5.63277 7.72795 5.63322L9.88239 7.78766C10.0729 7.97722 10.0738 8.28584 9.88374 8.4763L9.88239 8.47765L8.6174 9.74264C8.25443 10.1016 8.20861 10.6721 8.51004 11.0844C8.96734 11.7125 9.47406 12.3032 10.0243 12.8517C10.638 13.468 11.3051 14.0286 12.0175 14.5268C12.4295 14.8138 12.9878 14.7658 13.3436 14.4118L14.5664 13.1697C14.756 12.9792 15.0641 12.9783 15.255 13.1684L15.2564 13.1697L17.4144 15.3318C17.6049 15.5213 17.6058 15.8295 17.4162 16.02V16.0195Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default StepHeader;
