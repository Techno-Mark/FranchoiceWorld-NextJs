import React, { ChangeEvent, FocusEvent } from "react";

interface TextAreaProps {
  id: string;
  name?: string;
  label?: string;
  value?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  label,
  value,
  required = false,
  placeholder,
  onChange,
  onBlur,
  className,
  rows = 4, // Default to 4 rows
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={className}
        id={id}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
      />
    </div>
  );
};

export default TextArea;
