import React, { ChangeEvent } from "react";

interface InputFieldProps {
  id: string;
  name?:string;
  type: string;
  label?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  name,
  label,
  value,
  required = false,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
        {required && label && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        className={className}
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
