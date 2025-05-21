import styles from "./button.module.scss";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;  
};

const Button = ({ text, onClick, disabled, style }: ButtonProps) => {
  return (
    <button
      className={styles?.button}  
      onClick={onClick}
      disabled={disabled}
      style={style} 
    >
      <h1>{text}</h1>
    </button>
  );
};

export default Button;
