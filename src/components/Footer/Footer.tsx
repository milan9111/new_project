import { FC } from "react";
import styles from "./footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.content}>University forms &copy;</p>
      </div>
    </footer>
  );
};

export default Footer;
