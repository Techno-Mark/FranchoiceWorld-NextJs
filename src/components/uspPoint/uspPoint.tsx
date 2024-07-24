import Image from "next/image";
import React from "react";
import Title from "../title/title";

interface UspPointProps {
  imagePath: string;
  uspPoints: string[];
}

const UspPoint: React.FC<UspPointProps> = ({ imagePath, uspPoints }) => {
  return (
    <section className="py-8 md:pb-20">
      <div className="container">
        <div className="flex items-center">
          <div className="w-full md:w-1/2">
            <Image
              className=""
              src={imagePath}
              alt="USP"
              width={466}
              height={316}
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <Title title="Our USP's" />
            <ul className="pl-6 list-disc">
              {uspPoints.map((points, index) => (
                <li className="font-medium leading-normal pb-2" key={index}>
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
