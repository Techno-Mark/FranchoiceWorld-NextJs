import Image from "next/image";
import styles from "./eventopportunity.module.css";

interface EventOppProps {
  title: string;
  imageURL: string;
}

const EventOpportunity: React.FC<EventOppProps> = ({ title, imageURL }) => {
  return (
    <div className="overflow-hidden">
      <Image
        src={imageURL}
        alt={title}
        className="w-full h-[200px] lg:h-[286px] rounded-lg object-cover"
        width={400}
        height={286}
      />
      <div className={`p-4 ${styles.eventOpptext}`}>
        <p className="text-center font-semibold text-lg">{title}</p>
      </div>
    </div>
  );
};

export default EventOpportunity;
