import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";

interface YearSelectProps {
  id: string;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  startYear?: number;
}

const YearSelect: React.FC<YearSelectProps> = ({
  id,
  name,
  label,
  required = false,
  className,
  disabled,
  startYear = 1900,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const [localDisplayYear, setLocalDisplayYear] = useState(
    new Date().getFullYear()
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 12 },
    (_, i) => Math.min(localDisplayYear, currentYear) - 11 + i
  ).filter((year) => year >= startYear && year <= currentYear);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleYearClick = (year: number) => {
    helpers.setValue(year);
    setIsOpen(false);
  };

  const handlePrevYears = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalDisplayYear((prev) => Math.max(startYear, prev - 12));
  };

  const handleNextYears = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalDisplayYear((prev) => Math.min(currentYear, prev + 12));
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 font-medium text-[var(--text-color)]"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        onClick={toggleDropdown}
        className="block w-full border border-[rgba(115, 114, 115, 0.4)] rounded-lg py-2 px-4 focus:outline-none font-medium cursor-pointer"
      >
        {field.value || "Select Year"}
      </div>
      {isOpen && (
        <div className="absolute  left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div className="flex justify-between p-2 border-b">
            <button
              onClick={handlePrevYears}
              className="px-2 py-1 bg-gray-200 rounded"
              disabled={localDisplayYear <= startYear}
            >
              &lt;
            </button>
            <span>
              {years[0]} - {years[years.length - 1]}
            </span>
            <button
              onClick={handleNextYears}
              className="px-2 py-1 bg-gray-200 rounded"
              disabled={localDisplayYear >= currentYear}
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 p-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleYearClick(year);
                }}
                className={`p-2 rounded ${
                  year === field.value
                    ? "bg-footer-bg text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearSelect;
