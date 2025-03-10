import style from "./startPage.module.scss";
import imglogo from "../../assets/logoST2.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import Button from "../../components/buttons/Button";

const StartPage = () => {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <header>
        <Typography className={style.header} variant="h1" gutterBottom>
          Välkommen till
        </Typography>
      </header>
      <img
        src={imglogo}
        alt="Spell and Tell logotyp med en penna som symboliserar kreativt skrivande"
        width={400}
        height={250}
      />
      <Button text="Logga in" className={style.button} onClick={() => navigate("/login")}/>
      <section>
        <Typography className={style.register} sx={{fontSize: "2rem"}} variant="h2" gutterBottom>
          Har du inget konto?
          <Link
            className={style.link}
            to={"/registration"}
          >
            Registrera dig här
          </Link>
        </Typography>
      </section>
    </div>
  );
};

export default StartPage;
