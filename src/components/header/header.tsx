"use client";
import Link from "next/link";
import styles from "./header.module.css";
import MenuLink from "./menuLink/MenuLink";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
const Header = () => {
  const menuItems = [
    {
      name: "Home",
      path: "/",
    },
    // {
    //   name: "About Us",
    //   path: "/about",
    // },
    {
      name: "Services",
      // path: "/services",
      submenu: [
        {
          name: "Brand Owner",
          path: "/list-your-brand",
          icons: "/images/brandOwner.svg",
        },
        {
          name: "Investor",
          path: "/investor",
          icons: "/images/investor.svg",
        },
        {
          name: "Independent Franchise Partner",
          path: "/ifp",
          icons: "/images/independentPartner.svg",
        },
        {
          name: "Real Estate Developer",
          path: "/real-estate",
          icons: "/images/realestate.svg",
        },
      ],
    },
    // {
    //   name: "Knowledge Center",
    //   path: "/knowledge-center",
    // },
    {
      name: "Contact Us",
      path: "/contact-sales",
    },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggleClass, setToggleClass] = useState(false);
  // const [listBrand, setListBrand] = useState(false);
  // const [stepList, setStepList] = useState(false);
  // const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();
  // const checkPath = () => {
  //   if (pathname === "/list-your-brand") {
  //     setListBrand(true);
  //   }
  //   if (
  //     pathname === "/list-your-brand/step_1" ||
  //     pathname === "/list-your-brand/step_2" ||
  //     pathname === "/list-your-brand/step_3" ||
  //     pathname === "/list-your-brand/step_4" ||
  //     pathname === "/thankyou"
  //   ) {
  //     setStepList(true);
  //   } else {
  //     setStepList(false);
  //   }
  // };

  const handleScroll = () => {
    const banner = document.querySelector("#banner") as HTMLElement;
    const bannerHeight = banner?.offsetHeight || 0;
    if (window.scrollY > bannerHeight) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    // checkPath();
    // setLoading(false);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    const headerElement = document.querySelector("header");
    headerElement?.classList.toggle("headerBg", !isMenuOpen);
    document.body.classList.toggle("menu-open", !isMenuOpen);
    setToggleClass(!isMenuOpen);
  };

  return (
    <>
      {/* {!loading && ( */}
      {/* header class ${listBrand && styles.listBrandHeader} */}
      <header
        className={`sticky top-0 z-10 py-4 bg-white ${styles.headerContainer} ${
          isScrolled ? styles.scrolled : ""
        }`}
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
                <Link href="tel:+916357439829">
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
                {/* {!(listBrand || stepList) && ( */}
                <button
                  onClick={toggleMenu}
                  data-collapse-toggle="mega-menu-full"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none z-[2]"
                  aria-controls="mega-menu-full"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  {!toggleClass ? (
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h15M1 7h15M1 13h15"
                      />
                    </svg>
                  ) : (
                    <svg
                      fill="#6b7280"
                      width="24"
                      height="24"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 94.926 94.926"
                      xmlSpace="preserve"
                      stroke="#6b7280"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <path d="M55.931,47.463L94.306,9.09c0.826-0.827,0.826-2.167,0-2.994L88.833,0.62C88.436,0.224,87.896,0,87.335,0 c-0.562,0-1.101,0.224-1.498,0.62L47.463,38.994L9.089,0.62c-0.795-0.795-2.202-0.794-2.995,0L0.622,6.096 c-0.827,0.827-0.827,2.167,0,2.994l38.374,38.373L0.622,85.836c-0.827,0.827-0.827,2.167,0,2.994l5.473,5.476 c0.397,0.396,0.936,0.62,1.498,0.62s1.1-0.224,1.497-0.62l38.374-38.374l38.374,38.374c0.397,0.396,0.937,0.62,1.498,0.62 s1.101-0.224,1.498-0.62l5.473-5.476c0.826-0.827,0.826-2.167,0-2.994L55.931,47.463z"></path>{" "}
                        </g>
                      </g>
                    </svg>
                  )}
                </button>
                {/* )} */}
              </div>
              <div
                id="mega-menu-full"
                className={`${styles.responsiveMenu} ${
                  isMenuOpen ? styles.showMenu : ""
                } items-center justify-between font-medium w-full md:flex md:w-auto`}
              >
                {/* {!(listBrand || stepList) && ( */}
                <>
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
                </>
                {/* )} */}
                {/* {stepList && (
                    <div className="ml-4 hidden md:block">
                      <Link
                        href={"#"}
                        className={`font-semibold text-base text-[rgba(115,114,115,1)]`}
                      >
                        For Assistance?
                      </Link>
                    </div>
                  )} */}
                <div className="ml-4 hidden md:block">
                  <Link
                    href="tel:+916357439829"
                    className={`flex items-center gap-2 ${styles.ctaButton}`}
                  >
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
                    +91 6357439829
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* )} */}
    </>
  );
};
export default Header;
