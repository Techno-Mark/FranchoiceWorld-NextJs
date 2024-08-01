import Faq from "@/components/faq/faq";
import InnerListBrandBanner from "@/components/innerListBrandBanner/innerListBrandBanner";
import InquireForm from "@/components/inquireForm/inquireForm";
import ListingSimpleSteps from "@/components/listingSimpleSteps/listingSimpleSteps";

function ListYourBrand() {
  // const trandingVideo = {
  //   desc: "Real, inspiring journeys of successful business entrepreneurs- Explore how they reached",
  //   desc2: "their franchising milestones with us!",
  //   items: [
  //     {
  //       id: "1",
  //       title:
  //         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //       videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
  //       videoThumbnail: "/images/banner.jpg",
  //     },
  //     {
  //       id: "2",
  //       title:
  //         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //       videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
  //       videoThumbnail: "/images/banner.jpg",
  //     },
  //     {
  //       id: "3",
  //       title:
  //         "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //       desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //       videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
  //       videoThumbnail: "/images/banner.jpg",
  //     },
  //   ],
  // };
  const innerBanner = {
    // bannerImage: "/images/innerListBrandBanner.png",
    bannerImageTxt: "Accelerate your brand's growth and scale greater heights.",
    submitURL: "/list-your-brand/step_1",
    SectionTitle: "List Your Brand",
    desc: "Put your brand in the spotlight!",
    items: [
      "Gain access to a wide audience of potential franchisees",
      "Receive pre-screened, highly qualified leads from individuals",
      "Navigate expansion challenges and achieve sustainable growth",
    ],
  };

  const faqItems = [
    {
      title: "How can I list my franchise on your portal?",
      content: (
        <>
          <p>
            You can follow just four simple steps to list your franchise on our
            portal:
          </p>
          <p>1. Enter your personal confidential information.</p>
          <p>2. Enter your essential brand details.</p>
          <p>3. Enter your investment details.</p>
          <p>4. Upload brand brochures, logos, images, etc.</p>
        </>
      ),
    },
    {
      title:
        "What benefits would I receive by listing my franchise on your portal?",
      content: (
        <p>
          Listing your brand on our website offers several benefits like
          increased visibility, networking and access to niche market of
          investors and entrepreneurs, lead generation, cost effective
          marketing, support and resources, etc.
        </p>
      ),
    },
    {
      title: "What does franchise advisory involve?",
      content: (
        <p>
          Franchise advisory services at Franchoice World involve brand audit
          and development, current franchise model assessment, latest franchise
          industry trends, competition assessment, case studies, CapEx and
          modeling, strategy, and brand identity development.
        </p>
      ),
    },
    {
      title: "How can my brand benefit from using franchise advisory services?",
      content: (
        <p>
          With our expert franchise advisory services, your brand can thrive to
          achieve end-to-end growth and development. Our services are especially
          curated and customized to meet your unique brand requirement to
          achieve successful brand expansion.
        </p>
      ),
    },
    {
      title: "How can my brand be discovered on your portal?",
      content: (
        <p>
          Once your brand is listed with us, it can be discovered by investors
          when they look for the franchise of their choice in the &apos;Find
          Your Franchise&apos; section of our Home Page.
        </p>
      ),
    },
  ];

  return (
    <>
      <InnerListBrandBanner props={innerBanner} />
      <div className="relative">
        <ListingSimpleSteps />
        {/* <TrandingVideo
        items={trandingVideo.items}
        desc={trandingVideo.desc}
        desc2={trandingVideo.desc2}
      /> */}
        <Faq
          title="FAQs"
          description="Let us answer some of your most common queries."
          additionalMessage="Feel free to contact us in case of any more questions!"
          items={faqItems}
        />
        <InquireForm />
      </div>
      {/* <div className="pt-4 md:py-12">
        <ListBrandBanner className="pb-0" />
      </div> */}
    </>
  );
}

export default ListYourBrand;
