import React from "react";
import Image from "next/image";
import styles from "./stepper.module.css";

interface StepProps {
  icon: string;
  title: string;
  description?: string;
  active?: boolean;
}

const Stepper: React.FC<StepProps> = ({ icon, title, description, active }) => {
  return (
    <div className={`flex flex-col items-center text-center ${active && styles.active}`}>
      <div className="mb-2">
        <Image
          src={icon}
          alt={title}
          width={70}
          height={70}
          className={styles.stepIcon}
        />
      </div>
      <h3 className={`font-bold ${styles.stepTitle}`}>{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default Stepper;
