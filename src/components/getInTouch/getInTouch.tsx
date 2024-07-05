import React from "react";
import Title from "../title/title";
import Image from "next/image";
import { BiSolidPhoneCall } from "react-icons/bi";
import Link from "next/link";
import { IoMailSharp } from "react-icons/io5";
import { HiLocationMarker } from "react-icons/hi";

const GetInTouch = () => {
  return (
    // Get In touch Section
    <section className="py-8">
      <div className="container">
        <Title title="Fancy a Chat? Get in Touch with Us" />
        <div className="flex py-6">
          <Image
            src="/images/mapImage.jpg"
            alt="Map"
            width={673}
            height={365}
          />
          <div className="flex flex-col ml-4 px-16 bg-[#fafafa] justify-center rounded-2xl w-full">
            <h3 className="text-lg text-[var(--footer-bg)] pb-5 font-bold">
              Contact Information
            </h3>
            <ul className="w-full">
              <li className="flex items-center pb-6 font-medium text-base">
                <BiSolidPhoneCall size={24} color="var(--footer-bg)" />
                <Link className="pl-4 md:pl-6" href="tel:+916357439829">
                  +91 63574 39829
                </Link>
              </li>
              <li className="flex items-center pb-6 font-medium text-base">
                <IoMailSharp size={24} color="var(--footer-bg)" />
                <Link
                  className="pl-4 md:pl-6"
                  href="mailto:info@franchoiceworld.com"
                >
                  info@franchoiceworld.com
                </Link>
              </li>
              <li className="flex items-center pb-6 font-medium text-base">
                <HiLocationMarker size={24} color="var(--footer-bg)" />
                <Link
                  className="pl-4 md:pl-6"
                  href="mailto:info@franchoiceworld.com"
                >
                  info@franchoiceworld.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
