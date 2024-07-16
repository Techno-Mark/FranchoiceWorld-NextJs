import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import Button from "@/components/button/button";
import Select from "@/components/select/Select";
import styles from "./categoriescontent.module.css";
import { getIndustry, getSector, getService } from "@/api/dropdown";

const CategoriesContent = () => {
  const [industryOptions, setIndustryOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  const fetchIndustryData = async () => {
    try {
      const resp = await getIndustry("/dropdown/industry-types");
      const formattedInvestor = resp.map((industry: any) => ({
        value: industry.id,
        label: industry.name,
      }));
      setIndustryOptions(formattedInvestor);
    } catch (err) {
      console.log("Error while fetching industry types", err);
    }
  };

  const fetchSectorData = async (industryId: number) => {
    try {
      const resp = await getSector({ industryId });
      const formattedSector = resp.map((sector: any) => ({
        value: sector.id,
        label: sector.name,
      }));
      setSectorOptions(formattedSector);
      setProductOptions([]); // Clear the product options when the industry changes
    } catch (err) {
      console.log("Error while fetching sectors", err);
    }
  };

  const fetchServiceData = async (sectorId: number) => {
    try {
      const resp = await getService("/dropdown/services", { sectorId });
      const formattedService = resp.map((service: any) => ({
        value: service.id,
        label: service.name,
      }));
      setProductOptions(formattedService);
    } catch (err) {
      console.log("Error while fetching services", err);
    }
  };

  useEffect(() => {
    fetchIndustryData();
  }, []);

  return (
    <Formik
      initialValues={{
        industry: null,
        sector: null,
        product: null,
      }}
      onSubmit={(values) => {
        // Handle form submission logic here
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form
          className={`flex flex-col justify-center md:flex-row ${styles.findForm}`}
        >
          <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
            <Select
              name="industry"
              className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium border border-gray-300 rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
              options={industryOptions}
              onChange={(value) => {
                setFieldValue("industry", value);
                setFieldValue("sector", null);
                setFieldValue("product", null);
                fetchSectorData(value);
              }}
            />
          </div>
          <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
            <Select
              name="sector"
              className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium border border-gray-300 rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
              options={sectorOptions}
              onChange={(value) => {
                setFieldValue("sector", value);
                setFieldValue("product", null);
                fetchServiceData(value);
              }}
              // disabled={!values.industry}
            />
          </div>
          <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
            <Select
              name="product"
              className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium border border-gray-300 rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
              options={productOptions}
              onChange={(value) => setFieldValue("product", value)}
              // disabled={!values.sector}
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

export default CategoriesContent;
