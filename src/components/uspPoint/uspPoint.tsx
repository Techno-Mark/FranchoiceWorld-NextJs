import Image from "next/image";
import React from "react";
import Title from "../title/title";

const UspPoint: React.FC<UspPointProps> = ({ imagePath, uspPoints }) => {
  return (
    <section className="py-8 md:pb-20">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <Image
              className=""
              src={imagePath}
              alt="USP"
              width={466}
              height={316}
            />
          </div>
          <div className="w-full md:w-1/2 p-0 md:p-4 mt-8 md:mt-0">
            <Title title="Our USP's" titleClass="!pb-4" />
            <ul className="pl-6 list-disc">
              {uspPoints.map((points, index) => (
                <li
                  className="font-medium leading-normal pb-2 last:pb-0"
                  key={index}
                >
                  {points}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UspPoint;
