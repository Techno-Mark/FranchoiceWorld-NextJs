"use client";

import Button from "@/components/button/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ThankYou = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/"); 
    localStorage.removeItem("mobileNumber")
    localStorage.removeItem("selectedCountry")
  };
  const icon = "/images/thanks/thankyou.gif";

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="mb-8">
        <Image src={icon} alt={"Thank you"} width={133} height={133} />
      </div>
      <div className="font-bold text-3xl  text-[rgba(23,73,138,1)]">
        Thank you for registering your brand with us!
      </div>
      <div className="mb-20 text-base font-medium text-[rgba(115,114,115,1)]">
        You&apos;re all set.Our team will contact you soon!
      </div>
      <div>
        <Button variant="highlighted" type="button" onClick={handleClick}>
          Back to home page
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
