import React, { ChangeEvent, FocusEvent } from "react";

interface InputFieldProps {
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
  onBlur,
  className,
}) => {
  return (
    <div >
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
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
