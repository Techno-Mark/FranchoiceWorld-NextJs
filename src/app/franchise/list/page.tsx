"use client";

import React, { useEffect, useMemo, useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import FranchiseListCard from "@/components/franchiseListCard/franchiseListCard";
import { FaChevronRight } from "react-icons/fa";
import QuickLinks from "@/components/quickLinks/quickLinks";
import { useSearchParams } from "next/navigation";
import { getFranchiseList } from "@/api/home";

const ProductList = () => {
  const searchParams = useSearchParams();

  const [brandData, setBrandData] = useState([]);

  // Access the query parameters
  const type = searchParams.get("type");
  const industry = Number(searchParams.get("industry"));

  const sector = Number(searchParams.get("sector"));
  const service = Number(searchParams.get("service"));
  const state = searchParams.get("state");
  const city = searchParams.get("city");
  const minRange = searchParams.get("minRange");
  const maxRange = searchParams.get("maxRange");

  const fetchdata = async () => {
    try {
      const params = new URLSearchParams();

      // Always add type
      params.append("type", String(type));

      // Helper function to add param if it's a valid, non-empty value
      const addParamIfValid = (
        key: string,
        value: string | number | null | undefined
      ) => {
        if (
          value !== null &&
          value !== undefined &&
          value !== "" &&
          !(typeof value === "number" && isNaN(value))
        ) {
          params.append(key, String(value));
        }
      };

      // Add industry if valid
      addParamIfValid("industry", industry);

      // Add additional parameters based on the type
      switch (type) {
        case "categories":
          addParamIfValid("sector", sector);
          addParamIfValid("service", service);
          break;
        case "location":
          if (typeof state === "number" && !isNaN(state)) {
            addParamIfValid("state", state);
          }
          if (typeof city === "number" && !isNaN(city)) {
            addParamIfValid("city", city);
          }
          break;
        case "investment":
          // Only add minRange and maxRange if they are valid numbers
          if (typeof minRange === "number" && !isNaN(minRange)) {
            params.append("minRange", String(minRange));
          }
          if (typeof maxRange === "number" && !isNaN(maxRange)) {
            params.append("maxRange", String(maxRange));
          }
          break;
        default:
          console.warn("Unknown type:", type);
      }

      const url = `/form-details/list?${params.toString()}`;

      const response = await getFranchiseList(url);
      const formattedData = response.map((categorie: any) => ({
        id: categorie.id,
        franchiseImage: "/images/bussinessImage.jpg",
        title: categorie.brandName,
        category: categorie.subCategory,
        investmentRange: categorie.investmentRange,
        areaRequired: categorie.areaaRequired,
        franchiseOutlet: categorie.numberOfLocations,
        favorite: false,
        // logo: categorie.logo,
      }));
      setBrandData(formattedData);
    } catch (error) {
      console.error("Error fetching categories types:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [type, industry, sector, service, state, city, minRange, maxRange]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Food & Beverage", href: "javascript:void(0);" },
    { label: "Quick Bites", href: "javascript:void(0);" },
    { label: "Quick Service Restaurants", href: "javascript:void(0);" },
  ];
  const quickLinksData = [
    {
      title: "Browse By Investment Range",
      linkItem: [
        { content: "Under 1 Lakh", path: "#" },
        { content: "Under 2 Lakh", path: "#" },
        { content: "Under 3 Lakh", path: "#" },
        { content: "Under 5 Lakh", path: "#" },
        { content: "Under 10 Lakh", path: "#" },
        { content: "Under 15 Lakh", path: "#" },
        { content: "Under 20 Lakh", path: "#" },
        { content: "Under 25 Lakh", path: "#" },
        { content: "Under 30 Lakh", path: "#" },
        { content: "Under 50 Lakh", path: "#" },
        { content: "Under 1 Crore", path: "#" },
      ],
    },
    {
      title: "Browse By Location",
      linkItem: [
        { content: "Maharashtra", path: "#" },
        { content: "Delhi", path: "#" },
        { content: "Karnataka", path: "#" },
        { content: "Tamil Nadu", path: "#" },
        { content: "West Bengal", path: "#" },
        { content: "Gujarat", path: "#" },
        { content: "Uttar Pradesh", path: "#" },
        { content: "Madhya Pradesh", path: "#" },
        { content: "Haryana", path: "#" },
        { content: "Rajasthan", path: "#" },
        { content: "Andhra Pradesh", path: "#" },
        { content: "Kerala", path: "#" },
        { content: "Punjab", path: "#" },
        { content: "Chandigarh", path: "#" },
      ],
    },
    {
      title: "Popular Cities",
      linkItem: [
        { content: "Agra", path: "#" },
        { content: "Ahmedabad", path: "#" },
        { content: "Amritsar", path: "#" },
        { content: "Aurngabad", path: "#" },
        { content: "Bengaluru", path: "#" },
        { content: "Bhopal", path: "#" },
        { content: "Bhubaneswar", path: "#" },
        { content: "Chandigarh", path: "#" },
        { content: "Chennai", path: "#" },
        { content: "Coimbatore", path: "#" },
        { content: "Dehradun", path: "#" },
        { content: "Faridabad", path: "#" },
        { content: "Ghaziabad", path: "#" },
        { content: "Gurugram", path: "#" },
        { content: "Guwahati", path: "#" },
        { content: "Hyderabad", path: "#" },
        { content: "Indore", path: "#" },
        { content: "Jabalpur", path: "#" },
        { content: "Jaipur", path: "#" },
        { content: "Jamshedpur", path: "#" },
        { content: "Jodhpur", path: "#" },
        { content: "Kanpur", path: "#" },
        { content: "Kochi", path: "#" },
        { content: "Kolkata", path: "#" },
        { content: "Kota", path: "#" },
        { content: "Lucknow", path: "#" },
        { content: "Ludhiana", path: "#" },
        { content: "Madurai", path: "#" },
        { content: "Mangalore", path: "#" },
        { content: "Meerut", path: "#" },
        { content: "Mumbai", path: "#" },
        { content: "Mysuru", path: "#" },
        { content: "Nagpur", path: "#" },
        { content: "Nashik", path: "#" },
        { content: "Navi Mumbai", path: "#" },
        { content: "New Delhi", path: "#" },
        { content: "Noida", path: "#" },
        { content: "Patna", path: "#" },
        { content: "Prayagraj", path: "#" },
        { content: "Pune", path: "#" },
        { content: "Raipur", path: "#" },
        { content: "Rajkot", path: "#" },
        { content: "Ranchi", path: "#" },
        { content: "Shimla", path: "#" },
        { content: "Surat", path: "#" },
        { content: "Thiruvananthapuram", path: "#" },
        { content: "Udaipur", path: "#" },
        { content: "Vadodara", path: "#" },
        { content: "Varanasi", path: "#" },
        { content: "Vijayawada", path: "#" },
        { content: "Visakhapatnam", path: "#" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-[#f1f1f2] py-4 md:py-6">
        <div className="container">
          <Breadcrumbs
            items={breadcrumbItems}
            separator={<FaChevronRight size={12} />}
          />
        </div>
      </div>
      <div className="mt-8 mb-12 md:mt-10 md:mb-8">
        <div className="container">
          <FranchiseListCard items={brandData} />
        </div>
      </div>
      <QuickLinks quickLink={quickLinksData} />
    </>
  );
};

export default ProductList;
