import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div
        className="flex w-full px-4 py-3 leading-tight bg-white border border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((option) => option.value === value)?.label
          : placeholder}
        <div className="flex items-center pl-2 pointer-events-none">
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
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                option.value === value ? "bg-gray-100 font-bold" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
