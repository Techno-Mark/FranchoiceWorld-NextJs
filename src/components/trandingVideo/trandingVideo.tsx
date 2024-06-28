import Link from "next/link";
import Card from "../card/card";
import styles from "./trandingvideo.module.css";
import Image from "next/image";
import { FaCirclePlay } from "react-icons/fa6";
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
  return (
    <section className={`pt-0 pb-6 md:py-8 ${styles.trandingVideo}`}>
      <div className="container">
        <h2 className="text-2xl font-bold leading-normal">Trending Videos</h2>
        {props.desc ? (
          <div className="pt-2 pb-4">
            <p className="leading-normal">{props.desc}</p>
            {props.desc2 && <p className="leading-normal">{props.desc2}</p>}
          </div>
        ) : (
          ""
        )}
        <div className="py-4 grid grid-cols-1 md:grid-cols-3">
          {props.items.map((video) => (
            <>
              <Card
                key={video.id}
                className={`mb-4 md:mb-0 !ml-0 !mr-5 last:!mr-0 ${styles.trandingVideoCard}`}
              >
                <Link href={video.videoUrl} target="_blank">
                  <div className="relative">
                    <Image
                      src={video.videoThumbnail}
                      alt="Thumbnail"
                      width={100}
                      height={100}
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
        </div>
      </div>
    </section>
  );
};

export default TrandingVideo;
