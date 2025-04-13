type ButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const Button = ({ text, onClick, className, disabled }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
