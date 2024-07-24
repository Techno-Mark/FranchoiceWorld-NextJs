import Link from "next/link";
import styles from "./footer.module.css";
import { SlSocialInstagram } from "react-icons/sl";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
const footerItem = [
  {
    id: "11",
    title: "Company",
    child: [
      {
        id: 1,
        name: "About us",
        path: "/about-us",
      },
      // {
      //   id: 2,
      //   name: "Services",
      //   path: "/services",
      // },
      // {
      //   id: 3,
      //   name: "Knowledge Center",
      //   path: "/knowledge_center",
      // },
      {
        id: 4,
        name: "Contact Us",
        path: "/contact-sales",
      },
    ],
  },
  {
    id: "22",
    title: "Support",
    child: [
      // {
      //   name: "Help Center",
      //   path: "/help_center",
      // },
      {
        name: "Terms of service",
        path: "/term-conditions",
      },
      {
        name: "Legal",
        path: "/legal",
      },
      {
        name: "Privacy policy",
        path: "/privacy-policy",
      },
    ],
  },
];
const Footer = () => {
  return (
    <footer className={`${styles.footerContainer}`}>
      <div className="container mx-auto w-full py-4">
        <div className="flex md:justify-between flex-col md:flex-row">
          <div className="flex flex-col gap-5 text-white order-2 md:order-1 mt-8 md:mt-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/footerLogo.svg"
                className={`h-14 w-auto me-3${styles.footerLogo}`}
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
            <p>
              <small>
                Copyright © 2024 Franchoiceworld <br />
                All rights reserved
              </small>
            </p>
            <ul className={`${styles.socialMedia}`}>
              <li key="1">
                <Link href="#">
                  <SlSocialInstagram />
                </Link>
              </li>
              <li key="2">
                <Link href="#">
                  <FaFacebook />
                </Link>
              </li>
              <li key="3">
                <Link href="#">
                  <FaXTwitter />
                </Link>
              </li>
              <li key="4">
                <Link href="#">
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-24 order-1 md:order-2">
            {footerItem?.map((x: any) => (
              <div key={x.id}>
                <h3 className="mb-5 font-medium text-white capitilize text-xl">
                  {x.title}
                </h3>
                <ul className="text-white">
                  {x.child.map((d: any) => (
                    <li className="mb-2" key={x.id}>
                      <Link
                        href={d.path}
                        className="text-[1rem] hover:underline"
                      >
                        {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
