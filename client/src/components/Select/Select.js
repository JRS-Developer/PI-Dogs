import styles from "./Select.module.scss";

const Select = ({ children, className, ...rest }) => {
  return (
    <select
      className={className ? `${styles.select}  ${className}` : styles.select}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
