import { Paper, Typography } from "@mui/material";
import style from "./homePage.module.scss";
import image from "../../assets/backgroundletters.png";
import { Link, useNavigate } from "react-router";

const HomePage = () => {
  const navigation = useNavigate();

  return (
    <div className={style.container}>
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginBottom: 2,
          width: { xs: "100%", sm: "45%" },
          margin: { xs: 1, sm: 2 },
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Paper>
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginBottom: 2,
          width: { xs: "100%", sm: "45%" },
          margin: { xs: 1, sm: 2 },
          color:"rgb(7, 7, 58)",
          display: "flex",
          justifyContent: "right",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            width: "fit-content",
            fontWeight: "500",
            fontSize:"1.8rem",
            height: "fit-content",
          }}
        >
          Hitta berättelse att bidra till
        </Typography>
        <Typography variant="body1" gutterBottom
        sx={{fontSize: "1.3rem"}}
        >
          Vill du inte starta en ny berättelse?
        </Typography>
        <Typography variant="body1" gutterBottom
         sx={{fontSize: "1.2rem"}}
        >
          Utforska öppna berättelser som du kan bidra till. Tänk på att läsa
          igenom berättelsen och vilka villkor som gäller för just den du valt
          innan du börjar!
        </Typography>

        <Typography variant="body1" gutterBottom
         sx={{fontSize: "1.2rem", marginTop: 5}}>
          Glöm inte att läsa våra regler och villkor också.     
          <Link
            className={style.link}
            to={"/terms"}
          >
            De hittar du här
          </Link>
        </Typography>
        <button className={style.button} onClick={() => navigation("/storys")}>
          <h2>Utforska berättelser</h2>
        </button>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginBottom: 2,
           width: { xs: "100%", sm: "45%" },
          margin: { xs: 1, sm: 2 },
          color:"rgb(7, 7, 58)",
          display: "flex",
          justifyContent: "right",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            width: "fit-content",
            fontWeight: "500",
            fontSize:"1.8rem",
            height: "fit-content",
          }}
        >
          Hur funkar det?
        </Typography>
        <Typography variant="body1" gutterBottom
          sx={{fontSize: "1.3rem"}}>
          Spell & Tell är ett berättar spel för dig och dina vänner. Det funkar
          lika bra att använda i skolan som på fritiden.
        </Typography>
        <Typography variant="body1" gutterBottom
          sx={{fontSize: "1.2rem"}}>
          Skapa roliga och kreativa berättelser tillsammans. Du startar en
          berättelse och väljer vilka regler du vill applicera, sen skickar du
          den vidare till en person eller lägger den öppen för vem som helst att
          bidra.
        </Typography>

        <button className={style.button} onClick={() => navigation("/terms")}>
          <h2>Läs regler och villkor</h2>
        </button>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginBottom: 2,
          width: { xs: "100%", sm: "45%" },
          margin: { xs: 1, sm: 2 },
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></Paper>
    </div>
  );
};

export default HomePage;
