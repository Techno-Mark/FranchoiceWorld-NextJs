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


  return (
    <>
      <section
        className={`bg-[var(--white-color)] py-2 lg:sticky lg:bottom-0 ${styles.eventForm} hidden lg:block`}
      >
        <div className={`container ${classNames}`}>
          <EnvForm pageForm={pageForm} />
        </div>
      </section>

    </>
  );
};

export default EventForm;
