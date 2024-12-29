import styles from "./buttontimer.module.scss"

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

const ButtonTimer = ({ text, onClick }: ButtonProps) => {
  return <button className={styles.button} onClick={onClick}><h1>{text}</h1></button>;
};

export default ButtonTimer;
