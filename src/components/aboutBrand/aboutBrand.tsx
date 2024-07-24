"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";
import styles from "./aboutbrand.module.css";

interface MediaProps {
  type: "image" | "video";
  src: string;
  thumb?: string;
}
interface BrandContent {
  brandTitle: string;
  brandDesc: string;
  media: MediaProps[];
}

const AboutBrand: React.FC<BrandContent> = ({
  brandTitle,
  brandDesc,
  media,
}) => {
  const [mainMedia, setMainMedia] = useState(media[0]);
  const [isLoading, setIsLoading] = useState(true);

  const handleThumbnailClick = (mediaItem: typeof mainMedia) => {
    setMainMedia(mediaItem);
    setIsLoading(true);
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2">
            <div className="w-5/6">
              <h2 className="text-4xl font-extrabold text-[var(--footer-bg)]">
                About
              </h2>
              <h3
                className={`text-4xl font-extrabold text-[var(--footer-bg)] pb-6 ${styles.brandTitle}`}
              >
                {brandTitle}
              </h3>
              <p className="my-4 font-medium text-justify">{brandDesc}</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 max-w-[562px]">
          {/* Brand gallery component need to createhere */}
            <div className="flex flex-col items-center">
              <div className="relative w-full h-[360px] bg-gray-200 rounded-xl">
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-200"></div>
                )}
                {mainMedia.type === "video" ? (
                  <video
                    controls
                    className="w-full h-full object-cover rounded-xl"
                  >
                    <source src={mainMedia.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    className="object-cover w-full h-full rounded-xl"
                    src={mainMedia.src}
                    alt={`${brandTitle} main media`}
                    width={552}
                    height={360}
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                  />
                )}
              </div>
              <ul className="flex mt-6 justify-between w-full">
                {media.map((item, index) => (
                  <li key={index} className="cursor-pointer mx-1 rounded-lg">
                    {item.type === "image" ? (
                      <Image
                        className="object-cover rounded-lg w-[100px] h-[70px]"
                        src={item.src}
                        alt={`${brandTitle} thumbnail ${index + 1}`}
                        width={100}
                        height={70}
                        loading="lazy"
                        onClick={() => handleThumbnailClick(item)}
                      />
                    ) : (
                      <div
                        className="relative rounded-lg w-[100px] h-[70px] bg-gray-300 flex items-center justify-center"
                        onClick={() => handleThumbnailClick(item)}
                      >
                        <Image
                          className="object-cover rounded-lg w-full h-full"
                          src={item.thumb || ""}
                          alt={`thumbnail ${index + 1}`}
                          width={100}
                          height={70}
                          loading="lazy"
                        />
                        <FaCirclePlay
                          className="absolute left-0 right-0 mx-auto top-half text-white"
                          size={35}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
