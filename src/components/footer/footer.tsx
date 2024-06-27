import Link from "next/link";
import styles from "./footer.module.css";
import { SlSocialInstagram } from "react-icons/sl";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
const Footer = (props: any) => {
  return (
    <footer className={`${styles.footerContainer}`}>
      <div className="container mx-auto w-full py-4">
        <div className="md:flex md:justify-between">
          <div className="flex flex-col gap-5 text-white">
            <Link href="/" className="flex items-center">
              <Image
                src="/footerLogo.svg"
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
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-24">
            {props.props.map((x: any) => (
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
