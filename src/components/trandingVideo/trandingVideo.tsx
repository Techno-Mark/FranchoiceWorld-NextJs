"use client";
import Image from "next/image";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Card from "../card/card";
import styles from "./trandingvideo.module.css";
interface TrandingVideos {
  id: string;
  title: string;
  desc: string;
  videoUrl: string;
  videoThumbnail: string;
}
interface TrandingVideoProps {
  desc?: string;
  desc2?: string;
  items: TrandingVideos[];
}

const TrandingVideo: React.FC<TrandingVideoProps> = (props) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    space: "10px",
    arrows: false,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          Infinity: true,
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1.2,
        },
      },
    ],
  };
  return (
    <section className={`pt-0 md:py-8 ${styles.trandingVideo}`}>
      <div className="container">
        <h2 className="text-2xl font-bold leading-normal text-center md:text-left">
          Trending Videos
        </h2>
        {props.desc ? (
          <div className="font-medium pt-2 pb-4 text-center md:text-left">
            <p className="leading-normal">
              {props.desc}{" "}
              {props.desc2 && <span className="md:hidden">{props.desc2}</span>}
            </p>
            {props.desc2 && (
              <p className="leading-normal hidden md:block">{props.desc2}</p>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="py-4 grid grid-cols-1">
          <Slider {...settings}>
            {props.items.map((video) => (
              <>
                <Card key={video.id} className={`${styles.trandingVideoCard}`}>
                  <Link href={video.videoUrl} target="_blank">
                    <div className="relative">
                      <Image
                        src={video.videoThumbnail}
                        alt="Thumbnail"
                        width={330}
                        height={200}
                        className={`w-full ${styles.videoThumbnail}`}
                      />
                      <FaCirclePlay
                        size={60}
                        className={`absolute left-0 right-0 mx-auto text-white ${styles.playIcon}`}
                      />
                    </div>
                    <p className="font-bold pt-4">{video.title}</p>
                    <span className="w-full block">{video.desc}</span>
                  </Link>
                </Card>
              </>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TrandingVideo;
