import Image from "next/image";

interface ListItem {
  text: string;
}

interface AdvisoryServiceData {
  title: string;
  subtitle: string;
  listItems: ListItem[];
  imageSrc: string;
  imageAlt: string;
}

interface AdvisoryServiceProps {
  props: AdvisoryServiceData;
}

const AdvisoryService: React.FC<AdvisoryServiceProps> = ({ props }) => {
  const { title, subtitle, listItems, imageSrc, imageAlt } = props;

  return (
    <section className="bg-[rgba(245,249,253,1)] my-16 py-10 md:py-10 lg:py-24">
      <div className="container">
        <div className="flex items-center flex-col md:flex-row w-full mx-auto">
          <div className="w-full md:w-7/12">
            <h4 className="md:text-2xl text-xl border-b-[0.5px] border-b-[var(--bottom-border)] pb-12 text-[var(--footer-bg)]">
              {title}
            </h4>
            <div className="pt-6">
              <span className="text-[var(--text-color)] text-xl font-medium">
                {subtitle}
              </span>
              <div className="ml-7 mt-9 text-xl">
                <ul className="list-disc">
                  {listItems.map((item, index) => (
                    <li key={index} className="p-[1px]">
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="ml-0 md:ml-40 mt-8 md:mt-0">
            <Image src={imageSrc} alt={imageAlt} width={484} height={360} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisoryService;
