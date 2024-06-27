import styles from "./card.module.css";
const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={`${className} ${styles.cardBox}`}>{children}</div>;
};

export default Card;
