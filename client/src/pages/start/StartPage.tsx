import style from "./startPage.module.scss";
import imglogo from "../../assets/logoST2.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <Typography variant="h1" gutterBottom>
        Välkommen
      </Typography>
      <img src={imglogo} alt="logo" />
      <button className={style.button} onClick={() => navigate("/login")}>
        <h1>Logga in</h1>
      </button>
      <Typography variant="h6" gutterBottom>
        Har du inget konto? Registrera dig{" "}
        <span className={style.link} onClick={() => navigate("/registration")}>
          här
        </span>
      </Typography>
    </div>
  );
};

export default StartPage;
