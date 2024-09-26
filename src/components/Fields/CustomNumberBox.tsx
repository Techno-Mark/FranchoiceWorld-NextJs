import React, { ChangeEvent, FocusEvent } from "react";

interface NumberFieldProps {
  id: string;
  name?: string;
  type: string;
  label?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

const NumberField: React.FC<NumberFieldProps> = ({
  id,
  type,
  name,
  label,
  value,
  required = false,
  placeholder,
  onChange,
  onBlur,
  className,
  disabled,
}) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 font-medium text-[var(--text-color)]"
        >
          {label}
          {required && label && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <span className="absolute inset-y-0 border-[var(--number-border)] left-0 px-3 my-2 py-2 flex items-center justify-center font-semibold border-r-[1px] text-[var(--text-color)]">
          +91
        </span>
        <input
          // className={`block w-full border border-[rgba(115,114,115,0.4)] rounded-lg py-2 px-4 focus:outline-none font-medium ${
          //   disabled && "pointer-event-none bg-[rgba(115,114,115,0.2)]"
          // } ${className}`}
          className={`${
            className
              ? className
              : `pl-12 block w-full border border-[rgba(115,114,115,0.4)] rounded-lg py-2 px-4 focus:outline-none text-base font-semibold ${
                  disabled && "pointer-event-none bg-[rgba(115,114,115,0.2)]"
                } `
          }`}
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={disabled}
        />
      </div>
    </>
  );
};

export default NumberField;
