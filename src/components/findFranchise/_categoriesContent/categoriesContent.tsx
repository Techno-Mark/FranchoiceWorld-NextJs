import Button from "@/components/button/button";
import Dropdown from "@/components/select/dropdown";
import { useState } from "react";
import styles from "./categoriescontent.module.css";

const CategoriesContent = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");

  const handleDropdownChange = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (name: string | undefined, value: string) => {
      setter(value);
    };
  };

  const handleIndustryChange = handleDropdownChange(setSelectedIndustry);
  const handleSectorChange = handleDropdownChange(setSelectedSector);
  const handleProductChange = handleDropdownChange(setSelectedProduct);

  const handelSubmitCategory = (e: any) => {
    e.preventDefault();
  };
  const Industry = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const Sector = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  const Product = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];
  return (
    <>
      <form
        className={`flex flex-col md:flex-row ${styles.findForm}`}
        onSubmit={handelSubmitCategory}
      >
        <div className="mb-5 md:mb-0 md:mr-3 w-full">
          <Dropdown
            name="selectedIndustry"
            options={Industry}
            value={selectedIndustry}
            onChange={handleIndustryChange}
            placeholder="Select Industries"
          />
        </div>
        <div className="mb-5 md:mb-0 md:mr-3 w-full">
          <Dropdown
            options={Sector}
            value={selectedSector}
            onChange={handleSectorChange}
            placeholder="Select Sector"
          />
        </div>
        <div className="mb-5 md:mb-0 md:mr-3 w-full">
          <Dropdown
            options={Product}
            value={selectedProduct}
            onChange={handleProductChange}
            placeholder="Select Service/Product"
          />
        </div>
        <Button
          variant="highlighted"
          className={`px-4 md:px-6 rounded-md ${styles.search_btn}`}
          type="submit"
        >
          Search
        </Button>
      </form>
    </>
  );
};
export default CategoriesContent;
