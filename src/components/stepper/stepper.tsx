import React from "react";
import Image from "next/image";
import styles from "./stepper.module.css";

interface StepProps {
  icon: string;
  title: string;
  description?: string;
  active?: boolean;
  className?: string;
}

const Stepper: React.FC<StepProps> = ({ icon, title, description, active, className }) => {
  return (
    <div
      className={`flex flex-row md:flex-wrap md:flex-col items-center text-center ${className} ${
        active && styles.active
      }`}
    >
      <div className="mb-2">
        <Image
          src={icon}
          alt={title}
          width={70}
          height={70}
          className={styles.stepIcon}
        />
      </div>
      <div className="w-[201px] text-left ml-2">
        <h3 className={`font-bold ${styles.stepTitle}`}>{title}</h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

export default Stepper;
