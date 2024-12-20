import styles from "./button.module.scss";

type ButtonProps = {
  text: string;
  customStyle?: React.CSSProperties;
};

const Button = ({ text, customStyle }: ButtonProps) => {
  return <button className={styles.button} style={customStyle}><h1>{text}</h1></button>;
};

export default Button;
