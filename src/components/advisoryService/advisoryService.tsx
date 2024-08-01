import Image from "next/image";
import styles from "./advisory.module.css";

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
    <section className="bg-[rgba(245,249,253,1)] py-10 md:py-10 lg:py-24">
      <div className="container">
        <div className="flex items-center flex-col md:flex-row w-full mx-auto">
          <div className="w-full md:w-3/5 md:pr-6 max-w-[575px]">
            <h4 className="md:text-2xl text-xl pb-12 text-[var(--footer-bg)]">
              {title}
            </h4>
            <div className="pt-6 md:mr-6 border-t-[0.5px] border-t-[var(--bottom-border)]">
              <span className="text-[var(--text-color)] text-base md:text-xl font-semibold md:font-medium">
                {subtitle}
              </span>
              <div className="mt-7 ml-5 md:ml-7 md:mt-9">
                <ul
                  className={`${styles.chooseBenifits} list-disc text-base md:text-xl`}
                >
                  {listItems.map((item, index) => (
                    <li key={index} className="p-[1px]">
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="ml-0 md:ml-auto mt-10 md:mt-0 max-w-[484px]">
            <Image src={imageSrc} alt={imageAlt} width={484} height={360} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvisoryService;
