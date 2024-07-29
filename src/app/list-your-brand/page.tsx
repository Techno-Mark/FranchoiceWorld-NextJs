import Faq from "@/components/faq/faq";
import InnerListBrandBanner from "@/components/innerListBrandBanner/innerListBrandBanner";
import InquireForm from "@/components/inquireForm/inquireForm";
import ListBrandBanner from "@/components/listBrandBanner/listBrandBanner";
import ListingSimpleSteps from "@/components/listingSimpleSteps/listingSimpleSteps";
import TrandingVideo from "@/components/trandingVideo/trandingVideo";

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
      "Gain access to a broad audience of potential franchisees",
      "Receive pre-screened, highly qualified leads from individuals.",
      "Navigate expansion challenges and achieve sustainable growth.",
    ],
  };

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
        <Faq />
        <InquireForm />
      </div>
      {/* <div className="pt-4 md:py-12">
        <ListBrandBanner className="pb-0" />
      </div> */}
    </>
  );
}

export default ListYourBrand;
