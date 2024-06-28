import InnerListBrandBanner from "@/components/innerListBrandBanner/innerListBrandBanner";
import TrandingVideo from "@/components/trandingVideo/trandingVideo";

function ListYourBrand() {
  const trandingVideo = {
    desc: "Real, inspiring journeys of successful business entrepreneurs- Explore how they reached",
    desc2: "their franchising milestones with us!",
    items: [
      {
        id: "1",
        title:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
        videoThumbnail: "/banner.jpg",
      },
      {
        id: "2",
        title:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
        videoThumbnail: "/banner.jpg",
      },
      {
        id: "3",
        title:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        videoUrl: "https://www.youtube.com/watch?v=YZ_dqk317A4",
        videoThumbnail: "/banner.jpg",
      },
    ],
  };
  return (
    <>
      <InnerListBrandBanner />
      <TrandingVideo
        desc={trandingVideo.desc}
        desc2={trandingVideo.desc2}
        items={trandingVideo.items}
      />
    </>
  );
}

export default ListYourBrand;
