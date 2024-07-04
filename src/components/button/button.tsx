import styles from "./button.module.css";
interface ButtonProps {
  variant?: "primary" | "secondary" | "highlighted";
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  onClick,
  children,
  type = "button",
  className,
}) => {
  const baseStyles = "px-4 py-2 font-bold rounded outline-none";
  const variantStyles = {
    primary: "bg-[var(--footer-bg)] text-white hover:bg-[var(--footer-hover)]",
    secondary: "bg-[var(--secondary-color)] text-white",
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
