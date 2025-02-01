import style from "./startPage.module.scss";
import imglogo from "../../assets/logoST2.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router";

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
      <button className={style.button} onClick={() => navigate("/login")}>
        <Typography className={style.btntext} variant="h2">Logga in</Typography>
      </button>
      <section>
        <Typography sx={{fontSize: "2rem"}} variant="h3" gutterBottom>
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
