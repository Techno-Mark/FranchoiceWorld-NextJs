import React from "react";
import { useField } from "formik";
import styles from "./checkbox.module.css";
import { BsCheck2, BsCheckLg } from "react-icons/bs";

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  value?: string;
  defaultChecked?: boolean;
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
  defaultChecked,
  onChange,
  onBlur,
  className,
  formik = false,
}) => {
  const [field, , helpers] = useField({ name, type: "checkbox", value });
  React.useEffect(() => {
    if (defaultChecked) {
      helpers.setValue(true);
    }
  }, [defaultChecked, helpers]);
  return (
    <div className={className}>
      <div className={`flex items-center ${className}`}>
        <div className={`relative ${styles.checkboxInput}`}>
          <input
            className={`absolute w-full h-full top-0 left-0 z-10 opacity-0 ${styles.checkboxInput}`}
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={formik ? field.checked : defaultChecked}
            onChange={formik ? field.onChange : onChange}
            onBlur={formik ? field.onBlur : onBlur}
          />
          <div className={styles.checkmark}>
            {value && <BsCheckLg color="white" size={12} />}
          </div>
        </div>
        <label className="ml-2" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
