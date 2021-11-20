import styles from "./Footer.module.scss";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Made with <FaHeart className={styles.icon} /> by{" "}
        <a
          href="https://github.com/JRS-Developer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jose Sanchez
        </a>{" "}
      </p>
    </footer>
  );
};

export default Footer;
