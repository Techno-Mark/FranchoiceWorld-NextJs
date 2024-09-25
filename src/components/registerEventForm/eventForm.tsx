"use client";
import Link from "next/link";
import { useState } from "react";
import EnvForm from "./_form";
import styles from "./eventform.module.css";
interface FormProps {
  classNames?: string;
  pageForm?: string;
}

const EventForm: React.FC<FormProps> = ({ classNames, pageForm }) => {

  const handleOpen = () => {
    window.scrollTo({
      top: 150,
      behavior: "smooth", // Smooth scroll to the top
    });
  };

  return (
    <>
      <section
        className={`bg-[var(--white-color)] py-2 lg:sticky lg:bottom-0 ${styles.eventForm} hidden lg:block`}
      >
        <div className={`container ${classNames}`}>
          <EnvForm pageForm={pageForm} />
        </div>
      </section>
      <div className="block lg:hidden fixed bottom-3 text-center w-full z-9">
        <Link
          href="javascript:void(0)"
          onClick={handleOpen}
          className="inline-block px-[20px] py-[11px] text-white border border-white font-bold rounded-lg bg-[var(--highlighted-color)]"
        >
          Register to Attend
        </Link>
      </div>
    </>
  );
};

export default EventForm;
