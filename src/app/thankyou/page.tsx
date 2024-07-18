"use client";

import Button from "@/components/button/button";
import Title from "@/components/title/title";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ThankYou = () => {
  const router = useRouter();

  const handleClick = () => {
    localStorage.clear();
    router.push("/");
  };
  const icon = "/images/thanks/thankyou.gif";

  return (
    <div className="py-16 text-center">
      <div className="container">
        <div className="mb-6 md:mb-8">
          <Image
            className="mx-auto w-[91px] h-[91px] md:w-[133px] md:h-[133px]"
            src={icon}
            alt={"Thank you"}
            width={133}
            height={133}
          />
        </div>
        <Title
          title="Thank you for registering your brand with us!"
          titleClass="!pb-4 !text-2xl"
        />
        <div className="mb-10 text-base font-medium text-[rgba(115,114,115,1)]">
          You&apos;re all set.{" "}
          <span className="block md:inline-block">
            Our team will contact you soon!
          </span>
        </div>
        <Button variant="highlighted" type="button" onClick={handleClick}>
          Back to home page
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
