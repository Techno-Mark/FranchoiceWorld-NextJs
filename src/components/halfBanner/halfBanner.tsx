import Link from "next/link";
import styles from "./halfbanner.module.css";
const HalfBanner = () => {
  return (
    <section className={`relative ${styles.halfBanner}`}>
      <div className="container w-3/4">
        <div
          className={`bg-white flex py-10 px-5 item-center justify-center gap-3 text-center text-white ${styles.halfBannerContent}`}
        >
          <Link href="#" className={`w-full ${styles.categoryButton}`}>
            List Your Brand
          </Link>
          <Link href="#" className={`w-full ${styles.categoryButton}`}>
            Find Your Franchise
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HalfBanner;
