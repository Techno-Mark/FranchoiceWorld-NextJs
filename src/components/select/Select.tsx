import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useField, useFormikContext } from "formik";
import styles from "./select.module.css";

interface SelectProps {
  options: { value: number; label: string }[];
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: number) => void;
  searchable?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  name,
  label,
  className,
  placeholder = "Please select an option",
  required,
  onChange,
  searchable = false,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { submitCount } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Add these functions to handle focus and blur
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

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

  useEffect(() => {
    if (isOpen && dropdownRef.current && selectRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const selectRect = selectRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - selectRect.bottom;
      const spaceAbove = selectRect.top;

      if (
        spaceBelow < dropdownRect.height &&
        spaceAbove > dropdownRect.height
      ) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [isOpen]);

  const handleOptionClick = (option: { value: number; label: string }) => {
    helpers.setValue(option.value);
    setIsOpen(false);
    setIsTouched(true);
    if (onChange) {
      onChange(option?.value);
    }
    setSearchQuery("");
    setFocusedOptionIndex(-1);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedOptionIndex(0);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setFocusedOptionIndex(0);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleDropdown();
      }
    } else {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedOptionIndex((prevIndex) =>
            Math.min(prevIndex + 1, filteredOptions.length - 1)
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedOptionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
          break;
        case "Enter":
          event.preventDefault();
          if (focusedOptionIndex >= 0) {
            handleOptionClick(filteredOptions[focusedOptionIndex]);
          }
          break;
        case "Escape":
        case "Tab":
          event.preventDefault();
          setIsOpen(false);
          setIsTouched(true);
          helpers.setTouched(true);
          if (event.key === "Tab") {
            // Allow the default tab behavior after closing the dropdown
            setTimeout(() => {
              if (selectRef.current) {
                selectRef.current.blur();
              }
            }, 0);
          }
          break;
      }
    }
  };

  const showError = (isTouched || submitCount > 0) && meta.error;

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedLabel =
    options.find((option) => option.value === field.value)?.label || "";

  return (
    <div className="relative inline-block w-full select-container">
      {label && (
        <label
          className="block mb-2 font-medium text-[rgba(115,114,115,1)]"
          htmlFor={name}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
  className="relative inline-block w-full"
  ref={selectRef}
  onKeyDown={handleKeyDown}
  onBlur={() => {
    setTimeout(() => {
      if (!selectRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        setIsTouched(true);
        helpers.setTouched(true);
        setIsFocused(false);
      }
    }, 0);
  }}
  tabIndex={0}
  role="combobox"
  aria-haspopup="listbox"
  aria-expanded={isOpen}
  aria-controls="select-dropdown"
  onFocus={handleFocus}
  style={{ outline: "none" }}
>
        <div
          className={`select-display ${
            className
              ? className
              : "flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded cursor-pointer h-full items-center justify-between"
          } ${isFocused ? "ring-2 ring-gray-300 border-gray-300" : ""}`}
          onClick={toggleDropdown}
        >
          <span className="font-medium w-full text-ellipsis overflow-hidden">
            {selectedLabel ? selectedLabel : placeholder}
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
          <div
            id="select-dropdown"
            className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg ${
              dropUp ? "bottom-full mb-1" : ""
            }`}
            ref={dropdownRef}
            role="listbox"
          >
            {searchable && (
              <div className="p-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full p-2 text-base border rounded focus:outline-none"
                  ref={searchInputRef}
                />
              </div>
            )}
            <div
              className={`max-h-60 overflow-y-auto ${styles.custom_scrollbar}`}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-200 text-left ${
                      option.value === field.value
                        ? "bg-gray-100 font-bold"
                        : ""
                    } ${index === focusedOptionIndex ? "bg-blue-100" : ""}`}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={option.value === field.value}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* {showError && (
        <div className="text-red-500 mt-2 text-sm">{meta.error}</div>
      )} */}
    </div>
  );
};

export default Select;
