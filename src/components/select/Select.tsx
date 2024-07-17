import React, { useState, useEffect, useRef } from "react";
import { useField, useFormikContext } from "formik";
import styles from "./MultiSelect.module.css";

interface SelectProps {
  options: { value: number; label: string }[];
  name: string;
  label?: string;
  className?: string;
  placeholder?: string; 
  onChange?: (value: number) => void; 
}

const Select: React.FC<SelectProps> = ({
  options,
  name,
  label,
  className,
  placeholder = "Please select an option", 
  onChange, 
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { submitCount } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (isOpen) {
          setIsTouched(true);
          helpers.setTouched(true);
        }
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectRef, helpers, isOpen]);

  const handleOptionClick = (option: { value: number; label: string }) => {
    helpers.setValue(option.value);
    setIsOpen(false);
    setIsTouched(true);
    if (onChange) {
      onChange(option.value);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const showError = (isTouched || submitCount > 0) && meta.error;

  const selectedLabel =
    options.find((option) => option.value === field.value)?.label || "";

  return (
    <div className="relative inline-block w-full">
      {label && (
        <label
          className="block mb-2 font-medium text-[rgba(115,114,115,1)]"
          htmlFor={name}
        >
          {label}
          <span className="text-red-500 ml-1">*</span>
        </label>
      )}
      <div className="relative inline-block w-full" ref={selectRef}>
        <div
          className={`${
            className
              ? className
              : "flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-full items-center justify-between"
          } `}
          onClick={toggleDropdown}
        >
          <span>
            {selectedLabel ? (
              selectedLabel
            ) : (
              <span className="text-[rgba(17,23,29,0.6)] font-medium text-xs">
                {placeholder}
              </span>
            )}
          </span>
          <div className="flex items-center pl-2 pointer-events-none">
            <svg
              className={`w-4 h-4 text-footer-bg transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
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
          <div className="absolute  z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg`">
            <div
              className={`max-h-60 overflow-y-auto ${styles.custom_scrollbar}`}
            >
              {options.map((option, index) => (
                <div
                  key={index}
                  className={` px-4 py-2 cursor-pointer hover:bg-gray-200 text-left ${
                    option.value === field.value ? "bg-gray-100 font-bold" : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* {showError && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )} */}
    </div>
  );
};

export default Select;
