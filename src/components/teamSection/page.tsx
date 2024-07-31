import React from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  position: string;
  imageSrc: string;
}

interface TeamSectionProps {
  title: string;
  description: string;
  teamMembers: TeamMember[];
}

const TeamMember: React.FC<TeamMember> = ({ name, position, imageSrc }) => (
  <div>
    <Image
      src={imageSrc}
      alt={name}
      width={172}
      className="flex items-center w-full pb-5"
      height={206}
    />
    <div className="max-w-2">
      <span className="text-[var(--footer-bg)] font-semibold text-base">
        {name}
      </span>
    </div>
    <div className="pt-1 opacity-70 font-semibold">
      <span>{position}</span>
    </div>
  </div>
);

const TeamSection: React.FC<TeamSectionProps> = ({
  title,
  description,
  teamMembers,
}) => {
  return (
    <section className="py-10">
      <div className="container text-center">
        <div className="w-full md:w-7/12 mx-auto">
          <div className="text-[var(--footer-bg)] text-3xl pb-6 font-extrabold max-w-[600px] mx-auto">
            {title}
          </div>

          <div className="text-[16px] pb-8">{description}</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-32 text-left">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
