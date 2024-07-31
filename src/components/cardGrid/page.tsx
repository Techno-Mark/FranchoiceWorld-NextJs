// components/CardGrid.js
import Image from "next/image";

export default function CardGrid({ cardData }: any) {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 pb-20 md:py-10">
        {cardData.map((card: any, index: any) => (
          <div key={index} className="flex pb-14 md:pb-20">
            <div className="pr-4 md:pr-7">
              <Image
                className="object-contain"
                src={card.image}
                alt={card.title}
                width={70}
                height={700}
              />
            </div>
            <div className="w-[calc(100%-50px)] flex h-full flex-col justify-between">
              <div className="">
                <div className="text-[var(--footer-bg)] text-lg md:text-lg font-bold">
                  {card.title}
                </div>
                {card.descriptions.map((description: any, descIndex: any) => (
                  <div
                    key={descIndex}
                    className="text-[var(--about-text)] opacity-70 text-sm pt-2 md:pt-6 font-medium"
                  >
                    {description}
                  </div>
                ))}
              </div>
              <div className="text-[rgba(210,31,52,1)] text-sm pt-3 md:pt-6 md:text-sm font-semibold">
                Know more
                <Image
                  src="/images/aboutUs/tail-right.png"
                  alt="Arrow"
                  width={12}
                  className="ml-2 inline-block"
                  height={10.4}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
