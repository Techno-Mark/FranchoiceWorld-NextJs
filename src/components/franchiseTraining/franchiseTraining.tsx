import React from "react";
import { PiCheckCircleBold } from "react-icons/pi";
import Title from "../title/title";

const FranchiseTraining: React.FC<TrainingProps> = ({
  brandName,
  trainingItems,
}) => {

  return (
    <section className="py-4">
      <div className="container">
        <Title title={`${brandName} Franchise Training`} />
        <ul className="border-t border-[var(--text-color)] py-5">
          {trainingItems.map((items, index) => (
            <li className="flex items-center justify-between pb-2" key={index}>
              <span className="font-medium max-w-[calc(100vw-110px)]">
                {items.label}
              </span>
              <span className="flex items-center font-bold">
                {items.value} <PiCheckCircleBold className="ml-2" size={16} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FranchiseTraining;
