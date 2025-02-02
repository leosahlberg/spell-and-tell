import styles from "./button.module.scss";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
  customStyle?: React.CSSProperties;
};

const Button = ({ text, customStyle , onClick }: ButtonProps) => {
  return <button className={styles.button} style={customStyle} onClick={onClick}><h1>{text}</h1></button>;
};

export default Button;
