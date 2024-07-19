import { getIndustry, getInvestmentRange } from "@/api/dropdown";
import Button from "@/components/button/button";
import Select from "@/components/select/Select";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import styles from "./investmentContent.module.css";

interface OptionType {
  value: number;
  label: string;
}

interface FormValues {
  industry: number | null;
  min: number | null;
  max: number | null;
}

const InvestmentContent = () => {
  const [industryOptions, setIndustryOptions] = useState<OptionType[]>([]);
  const [minMaxOption, setMinMaxOption] = useState<OptionType[]>([]);

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

  const fetchMinMaxData = async () => {
    try {
      const resp = await getInvestmentRange("/dropdown/min-max-investments");
      const formattedMinMax = resp.map((mm: any) => ({
        value: mm.id,
        label: mm.range,
      }));
      setMinMaxOption(formattedMinMax);
    } catch (err) {
      console.log("Error while fetching State Data", err);
    }
  };

  useEffect(() => {
    fetchIndustryData();
    fetchMinMaxData();
  }, []);

  return (
    <Formik<FormValues>
      initialValues={{
        industry: null,
        min: null,
        max: null,
      }}
      onSubmit={(values) => {
        // Handle form submission logic here
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => {
        // Filter max options based on min selection
        const filteredMaxOptions =
          values.min !== null
            ? minMaxOption.filter((option) => option.value > values.min!)
            : minMaxOption;

        return (
          <Form
            className={`flex flex-col justify-center md:flex-row ${styles.findForm}`}
          >
            <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
              <Select
                name="industry"
                className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium shadow-lg rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
                options={industryOptions}
                placeholder="Select Industries"
                onChange={(value) => {
                  setFieldValue("industry", value);
                }}
              />
            </div>
            <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
              <Select
                name="min"
                className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium shadow-lg rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
                options={minMaxOption}
                placeholder="Select Min Investment"
                onChange={(value) => {
                  setFieldValue("min", value);
                  setFieldValue("max", null); // Reset max when min changes
                }}
              />
            </div>
            <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
              <Select
                name="max"
                className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium shadow-lg rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
                options={filteredMaxOptions}
                placeholder="Select Max Investment"
                onChange={(value) => setFieldValue("max", value)}
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
        );
      }}
    </Formik>
  );
};

export default InvestmentContent;
