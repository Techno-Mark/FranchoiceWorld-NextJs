import Link from "next/link";
import styles from "./header.module.css";
import MenuLink from "./menuLink/MenuLink";
import Image from "next/image";
const Header = () => {
  const menuItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Services",
      path: "/services",
    },
    {
      name: "Start-up Services",
      path: "/start_up_services",
    },
    {
      name: "Case Studies",
      path: "/case_studies",
    },
    {
      name: "Contact Us",
      path: "/contact_us",
    },
  ];
  return (
    <header className={`sticky top-0 z-10 py-4 bg-white ${styles.headerContainer}`}>
      <div className="container">
        <nav className="bg-white border-gray-200">
          <div className="flex flex-wrap justify-between items-center mx-auto">
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Image src="/logo.svg" className="h-10" alt="Logo" width={100} height={100} />
            </Link>
            <button
              data-collapse-toggle="mega-menu-full"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mega-menu-full"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
            </button>
            <div
              id="mega-menu-full"
              className="items-center justify-between font-medium hidden w-full md:flex md:w-auto"
            >
              <ul className="flex flex-col items-center md:flex-row">
                {menuItems.map((menu) => (
                  <li className="relative" key={menu.name}>
                    <MenuLink item={menu} key={menu.name} />
                  </li>
                ))}
                <li className="ml-4">
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
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
export default Header;
