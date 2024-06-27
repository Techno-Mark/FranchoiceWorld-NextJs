"use client";
import Link from "next/link";
import styles from "./menulink.module.css";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }: any) => {
  const pathname = usePathname();
  return (
    <Link
      href={item.path}
      className={`py-2 px-3 capitalize ${styles.menuItem} ${
        pathname === item.path && `font-bold ${styles.active}`
      }`}
    >
      {item.name}
    </Link>
  );
};
export default MenuLink;
