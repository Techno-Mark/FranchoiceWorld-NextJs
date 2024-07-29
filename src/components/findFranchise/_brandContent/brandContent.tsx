import React, { useState, useEffect } from "react";
import { Formik, Form, getIn } from "formik";
import Button from "@/components/button/button";
import Select from "@/components/select/Select";
import styles from "./brandcontent.module.css";
import { getIndustry, getSector, getService } from "@/api/dropdown";
import { useRouter } from "next/navigation";
import InputField from "@/components/Fields/InputField";
interface OptionType {
  value: number;
  label: string;
}
const BrandContent = () => {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        industry: null,
        sector: null,
        product: null,
      }}
      onSubmit={async (values) => {
        router.push(
          `/franchise/list?type=brand&industry=${values.industry}&sector=${values.sector}&service=${values.product}`
        );
      }}
    >
      {({ values, setFieldValue }) => (
        <Form
          className={`flex flex-col justify-center md:flex-row ${styles.findForm}`}
        >
          <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
            <InputField
              id="grid-first-name"
              name="brandName"
              type="text"
              required={true}
              className={`block w-full rounded-lg py-2 px-4 focus:outline-none font-medium !border-[1px] !border-[rgba(115,114,115,0.4)]`}
            />
          </div>
          <Button
            variant="highlighted"
            className={`px-4 lg:px-11 rounded-md !text-[14px] md:text-[16px] ${styles.search_btn}`}
            type="submit"
          >
            Search
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default BrandContent;
