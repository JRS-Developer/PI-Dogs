import styles from "./Button.module.scss";

const Button = ({ children, onClick, type, className }) => {
  return (
    <button
      className={className ? `${styles.button} ${className}` : styles.button}
      type={type}
      onClick={(e) => onClick && onClick(e)}
    >
      {children}
    </button>
  );
};

export default Button;
