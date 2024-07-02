"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import styles from "./countryDropdown.module.css";

const countries = [
  { code: "+91", name: "India", flag: "https://flagcdn.com/in.svg" },
  { code: "+1", name: "Canada", flag: "https://flagcdn.com/ca.svg" },
  { code: "+44", name: "UK", flag: "https://flagcdn.com/gb.svg" },
  // Add more countries as needed
];

const CountryDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countries[0].code
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedCountryData = countries.find(
    (country) => country.code === selectedCountry
  );

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className={`block w-full pl-2 pr-6 py-3 md:pr-7 md:py-4 leading-tight bg-white border border-gray-300 rounded-md cursor-pointer focus:outline-none ${
          isOpen && styles.selectCountryDrop
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountryData ? (
          <div className="flex items-center">
            <Image
              src={selectedCountryData.flag}
              alt={selectedCountryData.name}
              className="w-6 h-4 mr-2"
              width={20}
              height={20}
            />
            <span className="ml-auto font-medium text-lg">
              ({selectedCountryData.code})
            </span>
          </div>
        ) : (
          "Select a country"
        )}
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto min-w-40">
          {countries.map((country) => (
            <li
              key={country.code}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                country.code === selectedCountry ? "bg-gray-100 font-bold" : ""
              }`}
              onClick={() => {
                setSelectedCountry(country.code);
                setIsOpen(false);
              }}
            >
              <Image
                src={country.flag}
                alt={country.name}
                className="w-6 h-4 mr-2"
                width={20}
                height={20}
              />
              <span>{country.name}</span>
              <span className="ml-auto text-gray-500">({country.code})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryDropdown;
