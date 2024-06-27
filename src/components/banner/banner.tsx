import Image from "next/image";
import styles from "./banner.module.css";
const Banner = (props: any) => {
  return (
    <section className="relative">
      <Image
        src={props.props.imgUrl}
        alt={props.props.imgAlt}
        className={styles.bannerImage}
        width={100}
        height={100}
      />
      <div className="container absolute top-1/2 left-0 right-0 transform translate-y-[-50%]">
        <h3 className={`w-7/12 font-bold ${styles.bannerTitle}`}>
          {props.props.bannerTitle}
        </h3>
      </div>
    </section>
  );
};

export default Banner;
