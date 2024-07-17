"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import styles from "./countryDropdown.module.css";

const countries = [
  { code: "+91", name: "India", flag: "https://flagcdn.com/in.svg" },
  // { code: "+1", name: "Canada", flag: "https://flagcdn.com/ca.svg" },
  // { code: "+44", name: "UK", flag: "https://flagcdn.com/gb.svg" },
  // Add more countries as needed
];

interface CountryDropdownProps {
  variant?: "small" | "formDropdown" | "regular";
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  variant = "regular",
  className,
  disabled,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(
    value || countries[0].code
  );
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
    (country) => country.code === (value || internalValue)
  );

  const handleCountrySelect = (countryCode: string) => {
    if (onChange) {
      onChange(countryCode);
    } else {
      setInternalValue(countryCode);
    }
    setIsOpen(false);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "small":
        return "pl-2 pr-5 py-3 text-sm";
      case "formDropdown":
        return "pl-2 pr-4 py-2 text-base";
      case "regular":
      default:
        return "pl-2 py-3 pr-7 md:py-4 text-sm md:text-xl";
    }
  };

  return (
    <div className="relative inline-block h-full" ref={dropdownRef}>
      {/*  cursor-pointer */}
      <div
        className={`relative flex h-full w-full leading-tight border border-gray-300 rounded-md focus:outline-none ${getVariantClasses()} ${
          isOpen && styles.selectCountryDrop
        } ${
          disabled && "pointer-event-none bg-[rgba(115,114,115,0.2)]"
        } ${className}`}
        // onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedCountryData ? (
          <div className="flex items-center">
            <Image
              src={selectedCountryData.flag}
              alt={selectedCountryData.name}
              className={`w-3 h-2 md:w-4 md:h-3 mr-1 object-contain ${
                variant === "regular"
                  ? "w-4 h-3 md:w-6 md:h-4 mr-1 md:mr-2"
                  : ""
              }`}
              width={20}
              height={20}
            />
            <span
              className={`ml-auto font-medium text-[11px] ${
                variant === "regular" ? "md:text-lg" : "md:text-[14px]"
              }`}
            >
              ({selectedCountryData.code})
            </span>
          </div>
        ) : (
          "Select a country"
        )}
        {/* <div
          className={`absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none h-full ${
            variant === "regular"
              ? "md:px-2"
              : variant === "small"
              ? "md:px-0 "
              : ""
          }`}
        >
          <svg
            className="w-3 h-3 md:w-4 md:h-4 text-gray-500"
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
        </div> */}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-auto min-w-40">
          {countries.map((country) => (
            <li
              key={country.code}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                country.code === (value || internalValue)
                  ? "bg-gray-100 font-bold"
                  : ""
              }`}
              onClick={() => handleCountrySelect(country.code)}
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
