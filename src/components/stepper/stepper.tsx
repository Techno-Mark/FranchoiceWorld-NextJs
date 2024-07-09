import React from "react";
import Image from "next/image";
import styles from "./stepper.module.css";

interface StepProps {
  icon?: string;
  title: string;
  description?: string;
  active?: boolean;
  className?: string;
  children?: React.ReactNode;
  titleClass?: string;
  stepBoxClass?: string;
}

const Stepper: React.FC<StepProps> = ({
  icon,
  title,
  description,
  active,
  className,
  children,
  titleClass,
  stepBoxClass,
}) => {
  return (
    <div
      className={`flex flex-row md:flex-wrap md:flex-col items-center text-center ${className} ${
        active && styles.active
      }`}
    >
      <div className="mb-2">
        {icon && (
          <Image
            src={icon}
            alt={title}
            width={70}
            height={70}
            className={styles.stepIcon}
          />
        )}
        {children}
      </div>
      <div className={`w-[201px] text-center max-w-full ${stepBoxClass}`}>
        <h3 className={`font-bold ${styles.stepTitle} ${titleClass}`}>
          {title}
        </h3>
        {description && <p className="font-medium">{description}</p>}
      </div>
    </div>
  );
};

export default Stepper;
