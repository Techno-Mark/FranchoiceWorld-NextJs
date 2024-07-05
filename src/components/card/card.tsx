import styles from "./card.module.css";
const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={`${styles.cardBox} ${className}`}>{children}</div>;
};

export default Card;
