type ButtonProps = {
  text?: string;
  onClick?: () => void;
  className?: string;
};

const Button = ({ text, onClick, className }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
