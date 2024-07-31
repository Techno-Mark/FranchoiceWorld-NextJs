import { getIndustry, getService, getState } from "@/api/dropdown";
import Button from "@/components/button/button";
import Select from "@/components/select/Select";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import styles from "./locationcontent.module.css";
import { useRouter } from "next/navigation";
interface OptionType {
  value: number;
  label: string;
}
const LocationContent = () => {
  const [industryOptions, setIndustryOptions] = useState<OptionType[]>([]);
  const [stateOptions, setStateOptions] = useState<OptionType[]>([]);
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
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

  const fetchStateData = async () => {
    try {
      const resp = await getState("/dropdown/states");
      const formattedState = resp.map((sector: any) => ({
        value: sector.id,
        label: sector.name,
      }));
      setStateOptions(formattedState);
      setCityOptions([]); // Clear the product options when the industry changes
    } catch (err) {
      console.log("Error while fetching State Data", err);
    }
  };

  const fetchCityData = async (stateId: number) => {
    try {
      const resp = await getService("/dropdown/cities", { stateId: [stateId] });
      const formattedCity = resp.map((service: any) => ({
        value: service.id,
        label: service.name,
      }));
      setCityOptions(formattedCity);
    } catch (err) {
      console.log("Error while fetching City Data", err);
    }
  };

  useEffect(() => {
    fetchIndustryData();
    fetchStateData();
  }, []);

  return (
    <Formik
      initialValues={{
        industry: null,
        state: null,
        city: null,
      }}
      onSubmit={(values) => {
        router.push(
          `/franchise/list?type=location&industry=${values.industry}&state=${values.state}&city=${values.city}`
        );
      }}
    >
      {({ values, setFieldValue }) => (
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
              name="state"
              className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium shadow-lg rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
              options={stateOptions}
              placeholder="Select State"
              onChange={(value) => {
                setFieldValue("state", value);
                setFieldValue("city", null);
                fetchCityData(value);
              }}
            />
          </div>
          <div className="mb-5 md:mb-0 md:mr-3 lg:mr-4 w-full max-w-[327px] md:max-w-[280px]">
            <Select
              name="city"
              className="flex justify-between px-2 py-2 leading-tight bg-white text-[var(--text-color)] font-medium shadow-lg rounded-lg cursor-pointer focus:outline-none min-h-[45px] items-center"
              options={cityOptions}
              placeholder="Select City"
              onChange={(value) => setFieldValue("city", value)}
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

export default LocationContent;
