import {
  getIndustry,
  getMaxInvestmentRange,
  getMinInvestmentRange,
} from "@/api/dropdown";
import Button from "@/components/button/button";
import Select from "@/components/select/Select";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
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
  const [minOption, setMinOption] = useState<OptionType[]>([]);
  const [maxOption, setMaxOption] = useState<OptionType[]>([]);
  const router = useRouter();

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

  const fetchMinData = async () => {
    try {
      const resp = await getMinInvestmentRange("/dropdown/minimim-values");
      const formattedMin = resp.map((mm: any) => ({
        value: mm.id,
        label: mm.name,
      }));
      setMinOption(formattedMin);
    } catch (err) {
      console.log("Error while fetching State Data", err);
    }
  };
  const fetchMaxData = async (minId: number) => {
    try {
      const resp = await getMaxInvestmentRange(
        "/dropdown/maximum-values",
        {
          minId: minId,
        }
      );
      const formattedMax = resp.map((mm: any) => ({
        value: mm.id,
        label: mm.name,
      }));
      setMaxOption(formattedMax);
    } catch (err) {
      console.log("Error while fetching State Data", err);
    }
  };

  useEffect(() => {
    fetchIndustryData();
    fetchMinData();
  }, []);

  return (
    <Formik<FormValues>
      initialValues={{
        industry: null,
        min: null,
        max: null,
      }}
      onSubmit={(values) => {
        router.push(
          `/franchise/list?type=investment&industry=${values.industry}&minRange=${values.min}&maxRange=${values.max}`
        );
      }}
    >
      {({ values, setFieldValue }) => {
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
                options={minOption}
                placeholder="Select Min Investment"
                onChange={(value) => {
                  setFieldValue("min", value);
                  fetchMaxData(value);
                }}
              />
            </div>
            <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
              <Select
                name="max"
                className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium shadow-lg rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
                options={maxOption}
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
