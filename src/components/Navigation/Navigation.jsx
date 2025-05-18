import styles from "./Navigation.module.css";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const isActive = ({ isActive }) => {
    return clsx(styles.link, {
      [styles.active]: isActive,
    });
  };
  return (
    <div className={styles.container}>
      <NavLink to="/" className={isActive}>
        Home page
      </NavLink>
      <NavLink to="/movies" className={isActive}>
        Movies
      </NavLink>
    </div>
  );
}
