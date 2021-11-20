import styles from './ErrorMessage.module.scss'

const ErrorMessage = ({ children }) => (
  <p className={styles.errorText}>{children}</p>
);

export default ErrorMessage
