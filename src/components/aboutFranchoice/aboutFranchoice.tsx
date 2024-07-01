import Image from "next/image";
import Button from "../button/button";
import Title from "../title/title";
import styles from "./aboutfranchoice.module.css";
const AboutFranchoice = () => {
  return (
    <section className={`py-10 md:py-20 ${styles.aboutFranchoice}`}>
      <div className="container">
      <div className="block md:hidden text-center"><Title title="About Franchoice World" /></div>
        <div className="flex flex-col-reverse md:flex-row gap-6 text-center md:text-left">
          <div className={`pb-6 md:pb-0 w-full md:w-1/2 ${styles.aboutLeft}`}>
            <div className="hidden md:block"><Title title="About Franchoice World" /></div>
            <p className="pb-8">
              Welcome to Franchoice World, by Gyaata and Pacific Group of
              Companies. Our mission is to empower brands to achieve expansive
              growth through strategic franchise partnerships. We want to be the
              No.1 choice for brands looking to successfully pen an expansion
              story.
            </p>
            <Button variant="highlighted">Learn More</Button>
          </div>
          <div className={` w-full flex justify-center md:justify-end md:w-1/2 ${styles.aboutRight}`}>
            <Image
              className={`w-full ${styles.aboutImage}`}
              src="/about.jpg"
              alt="About"
              width={600}
              height={250}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFranchoice;
