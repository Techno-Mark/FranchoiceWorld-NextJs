import React from "react";
import { useField } from "formik";
import styles from "./checkbox.module.css";

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  formik?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  value,
  checked,
  onChange,
  onBlur,
  className,
  formik = false,
}) => {
  const [field, meta] = useField({ name, type: "checkbox", value });

  return (
    <div className={className}>
      <div className={`relative ${styles.checkboxInput}`}>
        <input
          className="absolute w-full h-full top-0 left-0"
          type="checkbox"
          id={id}
          name={name}
          value={value}
          checked={formik ? field.checked : checked}
          onChange={formik ? field.onChange : onChange}
          onBlur={formik ? field.onBlur : onBlur}
        />
        <div className="checkmark"></div>
      </div>
      <label htmlFor={id}>{label}</label>
      {formik && meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Checkbox;
