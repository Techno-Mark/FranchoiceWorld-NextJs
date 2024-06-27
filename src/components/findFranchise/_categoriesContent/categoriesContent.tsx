import Button from "@/components/button/button";
import Dropdown from "@/components/select/dropdown";
import { useState } from "react";

const CategoriesContent = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const handelSubmitCategory = (e: any) => {
    e.preventDefault();

    console.log("submitForm", e);
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
      <form className="flex gap-4 flex-col md:flex-row" onSubmit={handelSubmitCategory}>
        <Dropdown
          options={Industry}
          value={selectedIndustry}
          onChange={setSelectedIndustry}
          placeholder="Select Industries"
        />
        <Dropdown
          options={Sector}
          value={selectedSector}
          onChange={setSelectedSector}
          placeholder="Select Sector"
        />
        <Dropdown
          options={Product}
          value={selectedProduct}
          onChange={setSelectedProduct}
          placeholder="Select Service/Product"
        />
         <Button variant="highlighted" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};
export default CategoriesContent;
