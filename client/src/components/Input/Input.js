import styles from "./Input.module.scss";

const Input = ({
  onChange,
  className,
  ...rest
}) => {
  return (
    <input
      onChange={(e) => onChange && onChange(e)}
      className={className ? `${styles.input} ${className}` : styles.input}
      {...rest}
    />
  );
};

export default Input;
