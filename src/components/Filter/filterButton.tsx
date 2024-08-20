import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Slider from "@mui/material/Slider";
import Button from "../button/button";
import MultiSelect from "../select/MultiSelect";
import FilterIcon from "@/assets/icons/advance-filter/filterIcon";
import CloseIcon from "@/assets/icons/closeIcon";
import RealEstateIcon from "@/assets/icons/advance-filter/realEstateIcon";
import BeverageIcon from "@/assets/icons/advance-filter/beverageIcon";
import RetailServiceIcon from "@/assets/icons/advance-filter/retailServiceIcon";
import EducationIcon from "@/assets/icons/advance-filter/educationIcon";
import HealthCareIcon from "@/assets/icons/advance-filter/healthCareIcon";
import BeautyCareIcon from "@/assets/icons/advance-filter/beautyCareIcon";
import HomeBasedIcon from "@/assets/icons/advance-filter/homeBasedIcon";
import BusinessServiceIcon from "@/assets/icons/advance-filter/businessServiceIcon";
import FinanceIcon from "@/assets/icons/advance-filter/financeIcon";
import AutomotiveIcon from "@/assets/icons/advance-filter/automotiveIcon";
import EntertainmentIcon from "@/assets/icons/advance-filter/entertainmentIcon";
import DealersIcon from "@/assets/icons/advance-filter/dealersIcon";
import FashionIcon from "@/assets/icons/advance-filter/fashionIcon";
import HospitalityIcon from "@/assets/icons/advance-filter/hospitalityIcon";
import FitnessIcon from "@/assets/icons/advance-filter/fitnessIcon";
import { getCity, getIndustry, getState } from "@/api/dropdown";

interface FormValues {
  category: string[];
  priceRange: number[];
  state: number[];
  city: number[];
}

interface OptionType {
  value: number;
  label: string;
}

function FilterButton() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [value2, setValue2] = useState<number[]>([20, 37]);
  const [stateOptions, setStateOptions] = useState<OptionType[]>([]);
  const [cityOptions, setCityOptions] = useState<OptionType[]>([]);
  const [selectedState, setSelectedState] = useState<any[]>([]);

  const [formValues, setFormValues] = useState<FormValues>({
    category: [],
    priceRange: value2,
    state: [],
    city: [],
  });

  console.log("🚀 ~ FilterButton ~ formValues:", formValues);

  const [cityStateMapping, setCityStateMapping] = useState<{
    [cityId: number]: number;
  }>({});

  const handleClick = () => {
    setIsPopupOpen(true);
  };

  const minDistance = 10;

  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };

  const Items = [
    { id: 1, icon: <RealEstateIcon />, text: "Real Estate" },
    { id: 2, icon: <BeverageIcon />, text: "Food & Beverage" },
    { id: 3, icon: <RetailServiceIcon />, text: "Retail" },
    { id: 4, icon: <EducationIcon />, text: "Education" },
    { id: 5, icon: <HealthCareIcon />, text: "Healthcare" },
    { id: 6, icon: <BeautyCareIcon />, text: "Beauty & Healthcare" },
    { id: 7, icon: <HomeBasedIcon />, text: "Home Based Business" },
    { id: 8, icon: <BusinessServiceIcon />, text: "Business Services" },
    { id: 9, icon: <FinanceIcon />, text: "Finance" },
    { id: 10, icon: <AutomotiveIcon />, text: "Automotive" },
    { id: 11, icon: <EntertainmentIcon />, text: "Entertainment" },
    { id: 12, icon: <DealersIcon />, text: "Dealers & Distributors" },
    { id: 13, icon: <FashionIcon />, text: "Fashion" },
    { id: 14, icon: <HospitalityIcon />, text: "Hospitality" },
    { id: 15, icon: <FitnessIcon />, text: "Fitness & Sports" },
  ];

  const fetchState = async () => {
    try {
      const response = await getState("/dropdown/states");
      const formattedstate = response.map((state: any) => ({
        value: state.id,
        label: state.name,
      }));
      setStateOptions(formattedstate);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCity = async (stateIds: number[]) => {
    try {
      const response = await getCity("/dropdown/cities", {
        stateId: stateIds,
      });
      const formattedCity = response.map((city: any) => ({
        value: city.id,
        label: city.name,
      }));
      setCityOptions(formattedCity);

      const newMapping: { [cityId: number]: number } = {};
      response.forEach((city: any) => {
        newMapping[city.id] = city.stateId;
      });
      setCityStateMapping((prevMapping) => ({ ...prevMapping, ...newMapping }));
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  useEffect(() => {
    if (selectedState?.length > 0) {
      fetchCity(selectedState);
    }
  }, [selectedState]);

  // const handleStateChange = (
  //   selectedStates: number[],
  //   setFieldValue: (field: string, value: any) => void
  // ) => {
  //   setFieldValue("state", selectedStates);
  //   setSelectedState(selectedStates);

  //   if (selectedStates.length > 0) {
  //     fetchCity(selectedStates);
  //   }

  //   // Clear city selection when state changes
  //   setFieldValue("city", []);
  // };

  return (
    <>
      <button className="border flex px-6 py-3 rounded" onClick={handleClick}>
        <FilterIcon />
        <span className="pl-2">Filter</span>
      </button>

      {isPopupOpen && (
        <Formik
          initialValues={formValues}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log("Form data", values);
            setIsPopupOpen(false);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="fixed inset-0 z-20 bg-black bg-opacity-50 p-10 flex justify-center overflow-y-auto">
                <div className="bg-white px-10 rounded-lg shadow-lg w-full sm:w-auto max-h-full overflow-y-auto">
                  <div className="sticky top-0 bg-white z-10 pb-4 border-b-2">
                    <div className="text-xl flex justify-between items-center font-bold">
                      <span className="text-xl">Filters</span>
                      <button onClick={() => setIsPopupOpen(false)}>
                        <CloseIcon />
                      </button>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div>
                      <span className="block text-[--resend-color] font-bold">
                        Category
                      </span>
                      <span className="text-xs">Choose your Category</span>
                    </div>
                    <div className="grid grid-cols-3 max-h-[300px] overflow-y-auto gap-4 sm:grid-cols-4 md:grid-cols-6">
                      {Items.map((item) => (
                        <div
                          key={item.id}
                          className={`flex flex-col items-center justify-center pt-2 cursor-pointer ${
                            values.category.includes(item.text)
                              ? "bg-[--hyper-link] text-white rounded"
                              : "hover:bg-[--hyper-link] hover:text-white hover:rounded"
                          }`}
                          onClick={() => {
                            const newCategory = values.category.includes(
                              item.text
                            )
                              ? values.category.filter(
                                  (cat) => cat !== item.text
                                )
                              : [...values.category, item.text];
                            setFieldValue("category", newCategory);
                            setFormValues((prev) => ({
                              ...prev,
                              category: newCategory,
                            }));
                          }}
                        >
                          {item.icon}
                          <span className="text-xs max-w-28 text-center p-2">
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-b-2">
                    <div>
                      <span className="block text-[--resend-color] font-bold">
                        Price Range
                      </span>
                      <span className="text-xs">Choose your Range</span>
                    </div>
                    <div>
                      <div>
                        <Field
                          label="state"
                          name="state"
                          searchable
                          component={MultiSelect}
                          options={stateOptions}
                          onChange={(selectedOptions: any) => {
                            console.log("🚀 ~ FilterButton ~ selectedOptions:", selectedOptions)
                            // Extract just the values (IDs) from the selected options
                            const stateIds = selectedOptions.map(
                              (option: any) => option.value
                            );

                            // Update the form state with just the array of IDs
                            setFieldValue("state", stateIds);

                            // Update the local state if needed
                            setSelectedState(stateIds);

                            // Fetch cities based on selected states
                            if (stateIds.length > 0) {
                              fetchCity(stateIds);
                            }
                          }}
                        />
                      </div>
                      <Slider
                        getAriaLabel={() => "Minimum distance shift"}
                        value={values.priceRange}
                        onChange={(event, newValue) => {
                          setFieldValue("priceRange", newValue);
                          handleChange2(event, newValue, 0);
                          setFormValues((prev) => ({
                            ...prev,
                            priceRange: newValue as number[],
                          }));
                        }}
                        getAriaValueText={valuetext}
                        sx={{
                          color: "#17498A",
                          "& .MuiSlider-thumb": {
                            color: "#17498A",
                          },
                          "& .MuiSlider-rail": {
                            color: "#17498A",
                          },
                        }}
                      />
                      <div className="flex my-3">
                        <div className="border p-2 min-w-[50%] rounded-lg">
                          <span className="text-sm font-medium block">
                            Min price
                          </span>
                          <span className="text-base font-bold text-[--hyper-link]">
                            ${values.priceRange[0]} Lacs
                          </span>
                        </div>
                        <div className="border ml-5 min-w-[48%] p-2 rounded-lg">
                          <span className="text-sm font-medium block">
                            Max price
                          </span>
                          <span className="text-base font-bold text-[--hyper-link]">
                            ${values.priceRange[1]} + Crores
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-b-2">
                    <div>
                      <span className="block text-[--resend-color] font-bold">
                        Location
                      </span>
                      <span className="text-xs">Choose your Location</span>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2 my-3">
                      <div>
                        <Field
                          label="city"
                          name="city"
                          searchable
                          component={MultiSelect}
                          options={cityOptions}
                          onChange={(value: any) =>
                            setFieldValue("city", value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sticky flex justify-between bottom-0 bg-white z-10 pt-4">
                    <Button
                      className="text-[--text-color] border rounded-lg hover:bg-[--text-color] text-base bg-white font-medium hover:text-white flex items-center !py-3 !px-4"
                      onClick={() => {
                        setFieldValue("category", []);
                        setFieldValue("priceRange", [20, 37]);
                        setFieldValue("state", []);
                        setFieldValue("city", []);
                        setFormValues({
                          category: [],
                          priceRange: [20, 37],
                          state: [],
                          city: [],
                        });
                      }}
                    >
                      Clear all
                    </Button>
                    <Button
                      type="submit"
                      className="text-white bg-[--hyper-link] font-medium text-base flex items-center !py-3 !px-4 rounded-lg"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default FilterButton;
