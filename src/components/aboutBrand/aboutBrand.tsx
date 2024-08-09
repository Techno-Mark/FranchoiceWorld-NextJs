"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";
import styles from "./aboutbrand.module.css";

interface MediaItem {
  type: "image" | "video";
  src: string;
  poster?: string;
}

interface BrandContentProps {
  brandTitle: string;
  brandDesc: string;
  media: MediaItem[];
}

const AboutBrand: React.FC<BrandContentProps> = ({
  brandTitle,
  brandDesc,
  media,
}) => {
  const [mainMedia, setMainMedia] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (media && media.length > 0) {
      setMainMedia(media[0]);
    }
  }, [media]);

  const handleThumbnailClick = (mediaItem: MediaItem) => {
    setMainMedia(mediaItem);
    setIsLoading(true);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2">
            <div className="w-full md:w-5/6">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--footer-bg)]">
                About
              </h2>
              <h3
                className={`text-2xl md:text-4xl font-extrabold text-[var(--footer-bg)] pb-4 md:pb-6 ${styles.brandTitle}`}
              >
                {brandTitle}
              </h3>
              <p className="my-4 font-medium text-justify">{brandDesc}</p>
            </div>
          </div>
          {media.length > 0 && (
            <div className="w-full md:w-1/2 max-w-[562px]">
              <div className="flex flex-col items-center">
                <div className="relative w-full h-[200px] md:h-[360px] bg-gray-200 rounded-xl overflow-hidden">
                  {isLoading && (
                    <div className="absolute inset-0 bg-gray-200"></div>
                  )}
                  {mainMedia?.type === "video" ? (
                    <>
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        poster={mainMedia.poster || "/default-video-poster.jpg"}
                        onLoadedData={() => setIsLoading(false)}
                        onError={(e) => console.error("Video error:", e)}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        controls={isPlaying}
                      >
                        <source src={mainMedia.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {!isPlaying && (
                        <div
                          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                          onClick={handlePlayPause}
                        >
                          <FaCirclePlay className="text-white text-5xl" />
                        </div>
                      )}
                    </>
                  ) : (
                    <Image
                      className="object-cover w-full h-full rounded-xl"
                      src={mainMedia?.src || "/default-image.jpg"}
                      alt={`${brandTitle} main media`}
                      width={552}
                      height={360}
                      loading="lazy"
                      onLoad={() => setIsLoading(false)}
                    />
                  )}
                </div>
                <ul className="flex mt-6 justify-start w-full">
                  {media.map((item: MediaItem, index: number) => (
                    <li key={index} className="cursor-pointer mx-1 rounded-lg">
                      {item.type === "image" ? (
                        <Image
                          className="object-cover rounded-lg w-[50px] h-[40px] md:w-[100px] md:h-[70px]"
                          src={item.src}
                          alt={`${brandTitle} thumbnail ${index + 1}`}
                          width={100}
                          height={70}
                          loading="lazy"
                          onClick={() => handleThumbnailClick(item)}
                        />
                      ) : (
                        <div
                          className="relative rounded-lg w-[50px] h-[40px] md:w-[100px] md:h-[70px] bg-gray-300 flex items-center justify-center"
                          onClick={() => handleThumbnailClick(item)}
                        >
                          <FaCirclePlay className="absolute left-0 right-0 mx-auto top-half text-white text-lg md:text-[35px]" />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
