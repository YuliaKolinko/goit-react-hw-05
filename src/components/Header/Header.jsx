import styles from "./Header.module.css";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  return (
    <div className={styles.container}>
      <Navigation />
    </div>
  );
}
