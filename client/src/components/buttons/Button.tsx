import style from "./button.module.scss";

type ButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({ text, onClick, disabled }: ButtonProps) => {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>
      <h1>{text}</h1>
    </button>
  );
};

export default Button;
