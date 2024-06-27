import Link from "next/link";
import styles from "./halfbanner.module.css";
const HalfBanner = () => {
  return (
    <section className={`relative ${styles.halfBanner}`}>
      <div className="container w-full md:w-3/4">
        <div
          className={`bg-white flex item-center justify-center gap-3 text-center text-white p-4  md:py-10 md:px-5 ${styles.halfBannerContent}`}
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
