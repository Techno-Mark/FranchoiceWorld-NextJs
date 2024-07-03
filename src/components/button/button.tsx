import styles from "./button.module.css";
interface ButtonProps {
  variant?: "primary" | "secondary" | "highlighted";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children,
  type = "button",
  className,
}) => {
  const baseStyles = "px-4 py-2 font-bold rounded outline-none";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 ",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    highlighted: `${styles.highlightedBtn}`,
  };

  const variantStyle = variant ? variantStyles[variant] : "";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyle}  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
