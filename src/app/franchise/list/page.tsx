import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const ProductList = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Mission", href: "/about/our-mission" },
  ];
  return (
    <div className="bg-[#f1f1f2] py-6">
      <div className="container">
        <Breadcrumbs
          items={breadcrumbItems}
          separator={<FaChevronRight size={12} />}
        />
      </div>
    </div>
  );
};

export default ProductList;
