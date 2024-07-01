import Image from "next/image";
import styles from "./banner.module.css";
const Banner = (props: any) => {
  return (
    <section id="banner" className={`relative ${styles.bannerSection}`}>
      <Image
        src={props.props.imgUrl}
        alt={props.props.imgAlt}
        className={styles.bannerImage}
        width={2000}
        height={500}
      />
      <div className="container absolute top-9 left-0 right-0 transform md:translate-y-[-50%] md:top-1/2">
        <h3 className={`w-7/12 font-bold ${styles.bannerTitle}`}>
          {props.props.bannerTitle}
        </h3>
      </div>
    </section>
  );
};

export default Banner;
