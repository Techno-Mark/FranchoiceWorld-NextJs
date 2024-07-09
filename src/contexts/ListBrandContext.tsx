"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface ListBrandContextType {
  mobileNumber: string;
  selectedCountry: string;
  setMobileNumber: (value: string) => void;
  setSelectedCountry: (value: string) => void;
}

const ListBrandContext = createContext<ListBrandContextType | undefined>(
  undefined
);

export const ListBrandProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("+91");

  return (
    <ListBrandContext.Provider
      value={{
        mobileNumber,
        selectedCountry,
        setMobileNumber,
        setSelectedCountry,
      }}
    >
      {children}
    </ListBrandContext.Provider>
  );
};

export const useListBrand = () => {
  const context = useContext(ListBrandContext);
  if (context === undefined) {
    throw new Error("useListBrand must be used within a ListBrandProvider");
  }
  return context;
};
