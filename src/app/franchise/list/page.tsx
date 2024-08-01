"use client";

import { getFranchiseList } from "@/api/home";
import FranchiseListCard from "@/components/franchiseListCard/franchiseListCard";
import InquireForm from "@/components/inquireForm/inquireForm";
import QuickLinks from "@/components/quickLinks/quickLinks";
import { formatInvestmentRange } from "@/utills/CommonFunction";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const brandName = searchParams.get("brandName");

  const fetchdata = async () => {
    try {
      const params = new URLSearchParams();

      // Always add type
      params.append("type", String(type));

      // Helper function to add param if it's a valid, non-empty value
      const addParamIfValid = (
        key: string,
        value: string | number | null | undefined,
        excludeZero = false
      ) => {
        if (
          value !== null &&
          value !== undefined &&
          value !== "" &&
          !(typeof value === "number" && isNaN(value)) &&
          !(excludeZero && value === 0) &&
          !(key === "industry" && value === 0)
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
          if (minRange !== null && minRange !== "" && minRange !== "null") {
            params.append("minRange", minRange);
          }
          if (maxRange !== null && maxRange !== "" && maxRange !== "null") {
            params.append("maxRange", maxRange);
          }
          break;
        case "brand":
          addParamIfValid("brandName", brandName);
        default:
          console.warn("Unknown type:", type);
      }

      const url = `/form-details/list?${params.toString()}`;

      const response = await getFranchiseList(url);
      const formattedData = response.map((categorie: any) => ({
        id: categorie.id,
        franchiseImage: categorie.brandImages[0],
        // franchiseImage: "/images/bussinessImage.jpg",
        title: categorie.brandName,
        category: categorie.subCategory,
        investmentRange: formatInvestmentRange(categorie.investmentRange),
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

  // const breadcrumbItems = [
  //   { label: "Home", href: "/" },
  //   { label: "Food & Beverage", href: "javascript:void(0);" },
  //   { label: "Quick Bites", href: "javascript:void(0);" },
  //   { label: "Quick Service Restaurants", href: "javascript:void(0);" },
  // ];
  const quickLinksData = [
    {
      title: "Browse By Investment Range",
      linkItem: [
        { content: "Under 1 Lakh" },
        { content: "Under 2 Lakh" },
        { content: "Under 3 Lakh" },
        { content: "Under 5 Lakh" },
        {
          content: "Under 10 Lakh",
          path: "/list?type=categories&industry=null&sector=null&service=null",
        },
        {
          content: "Under 15 Lakh",
          path: "/list?type=categories&industry=null&sector=null&service=null",
        },
        {
          content: "Under 20 Lakh",
          path: "/list?type=categories&industry=null&sector=null&service=null",
        },
        {
          content: "Under 25 Lakh",
          path: "/list?type=categories&industry=null&sector=null&service=null",
        },
        {
          content: "Under 30 Lakh",
          path: "/list?type=categories&industry=null&sector=null&service=null",
        },
        {
          content: "Under 50 Lakh",
          path: "/list?type=categories&industry=null&sector=null&service=null",
        },
        {
          content: "Under 1 Crore",
          path: "/list?type=categories&industry=null&sector=null&service=null",
        },
      ],
    },
    {
      title: "Browse By Location",
      linkItem: [
        { content: "Maharashtra" },
        { content: "Delhi" },
        { content: "Karnataka" },
        { content: "Tamil Nadu" },
        { content: "West Bengal" },
        { content: "Gujarat" },
        { content: "Uttar Pradesh" },
        { content: "Madhya Pradesh" },
        { content: "Haryana" },
        { content: "Rajasthan" },
        { content: "Andhra Pradesh" },
        { content: "Kerala" },
        { content: "Punjab" },
        { content: "Chandigarh" },
      ],
    },
    {
      title: "Popular Cities",
      linkItem: [
        { content: "Agra" },
        { content: "Ahmedabad" },
        { content: "Amritsar" },
        { content: "Aurngabad" },
        { content: "Bengaluru" },
        { content: "Bhopal" },
        { content: "Bhubaneswar" },
        { content: "Chandigarh" },
        { content: "Chennai" },
        { content: "Coimbatore" },
        { content: "Dehradun" },
        { content: "Faridabad" },
        { content: "Ghaziabad" },
        { content: "Gurugram" },
        { content: "Guwahati" },
        { content: "Hyderabad" },
        { content: "Indore" },
        { content: "Jabalpur" },
        { content: "Jaipur" },
        { content: "Jamshedpur" },
        { content: "Jodhpur" },
        { content: "Kanpur" },
        { content: "Kochi" },
        { content: "Kolkata" },
        { content: "Kota" },
        { content: "Lucknow" },
        { content: "Ludhiana" },
        { content: "Madurai" },
        { content: "Mangalore" },
        { content: "Meerut" },
        { content: "Mumbai" },
        { content: "Mysuru" },
        { content: "Nagpur" },
        { content: "Nashik" },
        { content: "Navi Mumbai" },
        { content: "New Delhi" },
        { content: "Noida" },
        { content: "Patna" },
        { content: "Prayagraj" },
        { content: "Pune" },
        { content: "Raipur" },
        { content: "Rajkot" },
        { content: "Ranchi" },
        { content: "Shimla" },
        { content: "Surat" },
        { content: "Thiruvananthapuram" },
        { content: "Udaipur" },
        { content: "Vadodara" },
        { content: "Varanasi" },
        { content: "Vijayawada" },
        { content: "Visakhapatnam" },
      ],
    },
  ];

  return (
    <>
      {/* <div className="bg-[#f1f1f2] py-4 md:py-6">
        <div className="container">
          <Breadcrumbs
            items={breadcrumbItems}
            separator={<FaChevronRight size={12} />}
          />
        </div>
      </div> */}
      <div className="mt-8 mb-12 md:mt-10 md:mb-8">
        <div className="container">
          <FranchiseListCard items={brandData} />
        </div>
      </div>
      <div className="relative">
        <QuickLinks quickLink={quickLinksData} />
        <InquireForm />
      </div>
    </>
  );
};

export default ProductList;
