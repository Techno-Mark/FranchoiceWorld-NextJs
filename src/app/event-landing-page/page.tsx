"use client"
import ImageGallery from "@/components/imageGallery/ImageGallery";
import Title from "@/components/title/title";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./event.module.css";
import OurBrand from "@/components/ourBrand/ourBrand";
import EventOpportunity from "@/components/eventOpportunity/eventOpportunity";
import BussinessSummitForm from "@/components/bussinessSummitForm/bussinessSummitForm";
import InquireForm from "@/components/inquireForm/inquireForm";
import EventForm from "@/components/registerEventForm/eventForm";

function EventLandingPage() {
  const ValueImages = [
    {
      imagePath: "/images/event/about/about2.jpg",
      name: "About1",
      width: 220,
      height: 178,
      column: 1,
    },
    {
      imagePath: "/images/event/about/about1.jpg",
      name: "About2",
      width: 220,
      height: 178,
      column: 0,
    },
    {
      imagePath: "/images/event/about/about4.jpg",
      name: "About3",
      width: 220,
      height: 178,
      column: 1,
    },
    {
      imagePath: "/images/event/about/about3.jpg",
      name: "About4",
      width: 220,
      height: 178,
      column: 0,
    },
  ];

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to the top
    });
  };

  const opportunities = [
    {
      title: "Food & Restaurant",
      imageURL: "/images/event/opportunities/food.jpg",
    },
    {
      title: "Education",
      imageURL: "/images/event/opportunities/education.jpg",
    },
    {
      title: "Healthcare",
      imageURL: "/images/event/opportunities/healthcare.jpg",
    },
    {
      title: "Entertainment & Leisure",
      imageURL: "/images/event/opportunities/entertainment.jpg",
    },
    {
      title: "Life Style",
      imageURL: "/images/event/opportunities/lifestyle.jpg",
    },
    {
      title: "& Many More",
      imageURL: "/images/event/opportunities/manymore.jpg",
    },
  ];
  return (
    <>
      {/* Banner */}
      <section className="py-8 lg:mb-8 bg-[url(/images/event/banner.jpg)] bg-[length:100%_50%] lg:bg-cover bg-no-repeat relative before:bg-black before:absolute before:w-full before:h-1/2 lg:before:h-full before:opacity-60 before:top-0">
        <div className="relative container z-[1]">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-col items-start text-white max-w-[500px] lg:max-w-[650px] text-center lg:text-left mb-8 lg:mb-0">
              <h3 className="text-3xl md:text-5xl font-bold !leading-normal">
                Franchoice World Business Summit
              </h3>
              <p className="text-lg border-t border-white pt-4 mt-4 mx-auto lg:ml-0">
                19th Oct | 9:30am - 6:00pm | Andheri East, Mumbai
              </p>
            </div>
            <div className="bg-white rounded-lg md:mb-8 shadow-lg lg:shadow-none">
              <BussinessSummitForm />
            </div>
          </div>
        </div>
      </section>
      <div className="relative">
        {/* Why attend event */}
        <div className="py-6 lg:py-12">
          <div className="container">
            <Title
              title="Why should You Attend the Event?"
              titleClass="text-center !text-[var(--text-color)] max-w-[450px] mx-auto mb-8"
            />
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3">
                <div className="flex flex-col justify-center text-center bg-white shadow-md max-w-[300px] p-6 rounded-lg">
                  <Image
                    src="/images/event/impactful.svg"
                    className="mx-auto mb-3"
                    alt="impactful"
                    height={50}
                    width={50}
                  />
                  <h4 className="text-xl font-medium max-w-[190px] mx-auto mb-2">
                    Impactful Networking
                  </h4>
                  <p>
                    Our summit is a platform for impactful networking and
                    incredible collaborations between investors and brands.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex flex-col justify-center text-center bg-white shadow-md max-w-[300px] p-6 rounded-lg">
                  <Image
                    src="/images/event/multiBrand.svg"
                    className="mx-auto mb-3"
                    alt="MultiBrands"
                    height={50}
                    width={50}
                  />
                  <h4 className="text-xl font-medium max-w-[190px] mx-auto mb-2">
                    Explore Multi-Sector Brands
                  </h4>
                  <p>
                    One-stop destination to explore a plethora of established
                    brands across multiple sectors to crack deals that promise
                    high return.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="flex flex-col justify-center text-center bg-white shadow-md max-w-[300px] p-6 rounded-lg">
                  <Image
                    src="/images/event/industrySupport.svg"
                    className="mx-auto mb-3"
                    alt="industry"
                    height={50}
                    width={50}
                  />
                  <h4 className="text-xl font-medium max-w-[190px] mx-auto mb-2">
                    Industry Support & Guidance
                  </h4>
                  <p>
                    Attend the Business Summit and avail hands-on team support
                    and guidance from our industry leaders at the event.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About section */}
        <section className="py-8">
          <div className="container">
            <div className="flex justify-between items-center flex-col-reverse md:flex-row w-full mx-auto">
              <ImageGallery
                column={2}
                galleryImages={ValueImages}
                imageClass="!w-[220px] !h-[177px]"
              />
              <div className="w-full md:w-3/5 pl-3 max-w-[600px]">
                <Title
                  title="About the Event"
                  titleClass="!text-[var(--text-color)]"
                />
                <div className="text-[var(--text-color)] text-base pt-6 tracking-tight">
                  Franchoice World Business Summit is a one-day mega event set
                  to transform your investment and entrepreneurial strategy. It
                  unfolds a great opportunity to network and interact, and to
                  establish successful collaborations between brands and premium
                  investors.
                </div>
                <div className="text-[var(--text-color)] text-base pt-6 tracking-tight">
                  Our Business Summit is a collaborative ground for
                  entrepreneurs and brands who are looking for exponential
                  growth opportunities. It acts as a bridge between franchise
                  buyers and brands to come together under one roof and
                  actualize mutual growth and expansion. At Franchoice World
                  Business Summit, you can explore incredible brands from
                  multiple sectors, that are open to franchise business!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Register CTA */}
        <section className="registerCta my-8 py-16 bg-[var(--footer-bg)]">
          <div className="container">
            <div className="flex flex-col md:flex-row">
              <div className="flex w-full lg:w-4/5 flex-col md:flex-row ">
                <div className="w-full md:w-1/2 md:border-r md:border-white py-4">
                  <div className="flex items-center">
                    <Image
                      src="/images/event/when.svg"
                      alt="When"
                      width="50"
                      height="50"
                    />
                    <div className="flex flex-col text-white pl-3">
                      <h3 className="text-4xl font-semibold mb-2">When</h3>
                      <p className="font-semibold text-base">
                        19th Oct | 9:30am - 6:00pm
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 py-4">
                  <div className="flex items-center md:justify-center">
                    <Image
                      src="/images/event/where.svg"
                      alt="Where"
                      width="35"
                      height="50"
                    />
                    <div className="flex flex-col text-white pl-3">
                      <h3 className="text-4xl font-semibold mb-2">Where</h3>
                      <p className="font-semibold text-base">
                        Andheri East, Mumbai
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 lg:w-1/5 py-3 flex items-center justify-center md:justify-end md:max-w-[205px]">
                <Link
                  className="bg-[var(--highlighted-color)] rounded-lg text-white text-[15px] py-3 px-4 flex w-max items-center font-semibold"
                  href="javascript:void(0)"
                  onClick={handleScrollTop}
                >
                  Register to Attend
                  <svg
                    className={`${styles.arrowIcn} ml-1 xl:ml-2`}
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.52068 0.380981C4.60351 0.380981 0.533325 4.38123 0.533325 9.29839C0.533325 14.2156 4.60351 18.2857 9.52068 18.2857C14.4378 18.2857 18.4381 14.2156 18.4381 9.29839C18.4381 4.38123 14.4378 0.380981 9.52068 0.380981ZM12.7352 9.75573L7.96688 14.5241C7.7373 14.7536 7.36511 14.7536 7.13553 14.5241L6.48337 13.8719C6.25379 13.6423 6.25379 13.2701 6.48337 13.0406L9.76715 9.75678C10.0197 9.50426 10.018 9.09427 9.76326 8.84392L6.49044 5.62613C6.25753 5.39715 6.25596 5.02223 6.4869 4.79129L7.13812 4.14007C7.36668 3.91151 7.73688 3.91035 7.96684 4.13748L12.7323 8.84388C12.9861 9.09445 12.9873 9.5036 12.7352 9.75573Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Our Brand */}
        <section className="py-8">
          <div className="container">
            <Title
              title="Our Brands"
              desc="Here are the brands that you can explore at the event!"
              titleClass="text-center !text-[var(--text-color)] !pb-2"
              descClass="text-center font-medium text-base"
            />
            <OurBrand />
          </div>
        </section>

        {/* Opportunity Event */}
        <section className="py-6 md:pt-12">
          <div className="container">
            <Title
              title="Opportunities at the Event"
              titleClass="text-center !text-[var(--text-color)] mb-2"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
              {opportunities.map((item, index) => (
                <EventOpportunity
                  key={index}
                  title={item.title}
                  imageURL={item.imageURL}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Venu */}
        <section className="bg-[#edf1f5] py-12 md:py-20">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-around">
              <div className="flex flex-col text-center md:flex-left">
                <Title
                  title="The Venue"
                  titleClass="!text-[var(--text-color)] mb-12"
                />
                <ul>
                  <li>
                    <Link
                      href="#"
                      className="text-xl font-semibold flex items-center mb-6"
                    >
                      <Image
                        className="mr-4"
                        src="images/event/venueLocation.svg"
                        alt="Location"
                        width={30}
                        height={40}
                      />
                      Andehri East, Mumbai
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="tel:+916357439829"
                      className="text-xl font-semibold flex items-center mb-6"
                    >
                      <Image
                        className="mr-4"
                        src="images/event/venueCall.svg"
                        alt="Call"
                        width={30}
                        height={30}
                      />
                      +91 63574 39829
                    </Link>
                  </li>
                </ul>
              </div>
              <Image
                src="/images/event/venue.svg"
                alt="Venue"
                width={400}
                height={390}
              />
            </div>
          </div>
        </section>

        {/* Sticky bottom */}
        {/* <section className="sticky bottom-0">Hello</section> */}
        <EventForm pageForm="Home" />
      </div>
    </>
  );
}

export default EventLandingPage;
