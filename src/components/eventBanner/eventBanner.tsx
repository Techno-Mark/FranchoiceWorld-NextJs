import Image from "next/image";
import styles from "./eventBanner.module.css";
const EventBanner = (props: any) => {
  return (
    <section
      id="banner"
      className={`relative bg-[var(--pirmary-color)] ${styles.bannerSection}`}
    >
      <div className={styles.bannerImage}>
        <div className="container h-full">
          <div className="flex h-full text-center md:text-left justify-center">
            <div className="hidden md:block md:w-2/6 self-end max-w-[269px]">
              <Image
                src="/images/event-banner/bannerImage.png"
                alt="Banner Image"
                className="ml-auto"
                width={269}
                height={393}
              ></Image>
            </div>
            <div className="w-full md:w-4/6 self-center max-w-[500px] py-6 md:pl-4">
              <div className="flex flex-col text-white">
                <h3 className="text-2xl px-6 md:px-0 md:text-4xl  font-bold ">
                  Franchoice World Bussiness Summit 2024
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-between py-6 border-white border-b font-medium text-xs md:text-base">
                  <div className="flex items-center md:w-[80%]">
                    <Image
                      src="/images/event/when.svg"
                      alt="When"
                      className="hidden md:block"
                      width="30"
                      height="30"
                    />
                    <p className="pl-4">
                      19th Oct <span className="md:block">9:30am - 6:00pm</span>
                    </p>
                  </div>

                  <div className="flex items-center md:w-[89%]">
                    <Image
                      src="/images/event/where.svg"
                      alt="Where"
                      className="hidden md:block"
                      width="30"
                      height="30"
                    />
                    <p className="pl-4">
                      Hotel Sahara Star, Andheri East, Mumbai
                    </p>
                  </div>
                </div>
                <div className="py-6 font-semibold text-base md:text-xl">
                  <p>
                    Take a Leap of{" "}
                    <span className="block md:inline">
                      {" "}
                      Incredible Growth with Us!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBanner;
