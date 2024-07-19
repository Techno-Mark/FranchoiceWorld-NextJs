import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import FranchiseListCard from "@/components/franchiseListCard/franchiseListCard";
import { FaChevronRight } from "react-icons/fa";
import QuickLinks from "@/components/quickLinks/quickLinks";

const ProductList = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Mission", href: "/about/our-mission" },
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

  const cardListitems = [
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: false,
    },
    {
      franchiseImage: "/images/bussinessImage.jpg",
      title: "Froozo",
      category: "F&B",
      investmentRange: "₹30L - 50L",
      areaRequired: "1000 - 1500",
      franchiseOutlet: "20 - 50",
      favorite: true,
    },
  ];

  return (
    <>
      <div className="bg-[#f1f1f2] py-6">
        <div className="container">
          <Breadcrumbs
            items={breadcrumbItems}
            separator={<FaChevronRight size={12} />}
          />
        </div>
      </div>
      <div className="my-10">
        <div className="container">
          <FranchiseListCard items={cardListitems} />
        </div>
      </div>
      <QuickLinks quickLink={quickLinksData} />
    </>
  );
};

export default ProductList;
