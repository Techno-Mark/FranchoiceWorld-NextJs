import React from "react";
import Title from "../title/title";
import Image from "next/image";
import { BiSolidPhoneCall } from "react-icons/bi";
import Link from "next/link";
import { IoMailSharp } from "react-icons/io5";
import { HiLocationMarker } from "react-icons/hi";

interface GetInTouchProps {
  locations: string[];
}

const GetInTouch: React.FC<GetInTouchProps> = ({ locations }) => {
  return (
    <section className="py-8">
      <div className="container">
        <div className="text-center md:text-left">
          <Title title="Fancy a Chat? Get in Touch with Us." />
        </div>
        <div className="grid py-6 grid-cols-1 md:grid-cols-2">
          <Image
            src="/images/mapImage.jpg"
            alt="Map"
            width={673}
            height={365}
          />
          <div className="flex flex-col py-16 px-4 md:py-10 md:ml-4 md:px-16 bg-[#fafafa] justify-center rounded-2xl w-full">
            <h3 className="text-lg text-[var(--footer-bg)] pb-5 font-bold">
              Contact Information
            </h3>
            <ul className="w-full">
              <li className="flex items-center pb-3 md:pb-6 font-medium text-base">
                <BiSolidPhoneCall size={20} color="var(--footer-bg)" />
                <Link className="pl-4 md:pl-6" href="tel:+916357439829">
                  +91 63574 39829
                </Link>
              </li>
              <li className="flex items-center pb-3 md:pb-6 font-medium text-base">
                <IoMailSharp size={20} color="var(--footer-bg)" />
                <Link
                  className="pl-4 md:pl-6"
                  href="mailto:info@franchoiceworld.com"
                >
                  info@franchoiceworld.com
                </Link>
              </li>
              {locations.map((location, index) => (
                <li
                  key={index}
                  className="flex relative pb-3 md:pb-6 font-medium text-base"
                >
                  <div className="w-10 h-10 -ml-[3px] ">
                    <HiLocationMarker size={25} color="var(--footer-bg)" />
                  </div>
                  <Link
                    className="pl-4 md:pl-6 pointer-events-none"
                    href={`https://www.google.com/maps/place/${encodeURIComponent(
                      location
                    )}`}
                    target="_blank"
                  >
                    {location}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
