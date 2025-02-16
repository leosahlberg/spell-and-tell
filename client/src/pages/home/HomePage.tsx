import { Paper, Typography } from "@mui/material";
import style from "./homePage.module.scss";
import image from "../../assets/backgroundletters.png";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";

const HomePage = () => {
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0); 

  const messages = [
    `${user?.name}! Dags att skriva! ✍️`,
    `${user?.name}, skapa något nytt? 🚀`,
    "Din berättelse väntar! 📖",
    "Lägg till något nytt! ✨",
    `Fortsätt där du slutade, ${user?.name}! 💡`,
    "Din historia är viktig! 🖋️",
    "Hitta inspiration och skriv! 📚",
    `Gör berättelsen magisk ${user?.name}! ✨`,
    "Din fantasi är fri! 🌟",
    "Gör din berättelse unik! 🔥",
    `Du har kommit långt, ${user?.name}! 🖋️`,
    "Lägg till nästa kapitel! 📜",
    "Följ din historia! ✨",
    "Skriver du vidare? 📝",
    "Berättelsen väntar! 📖",
    "Kanske en ny twist! 🔄",
    `Sätt igång, ${user?.name}! 🌍`,
    "Världen väntar! 🌍",
    "Skriver du nästa kapitel? 📚",
    "Fortsätt skapa! 💫",
    "Dela din historia! 🌟",
    `Det är din berättelse, ${user?.name}! ✨`
  ];
  
  useEffect(() => {
    if (user) {
      const lastMessageIndex = localStorage.getItem("lastMessageIndex");

      if (lastMessageIndex === null) {
        setMessageIndex(0);
        setOpen(true);
        setTimeout(() => {
          setOpen(false); 
          localStorage.setItem("lastMessageIndex", "0"); 
        }, 6000); 
      } else {
        const nextIndex = (parseInt(lastMessageIndex) + 1) % messages.length;
        setMessageIndex(nextIndex);
        setOpen(true);
        setTimeout(() => {
          setOpen(false); 
          localStorage.setItem("lastMessageIndex", nextIndex.toString()); 
        }, 6000); 
      }
    }
  }, [user, messageIndex, messages.length]);

  return (
    <div className={style.container}>
      {open && (
        <div className={style.welcomebubble}>
          <div className={style.bubblearrow}></div>
           {messages[messageIndex]}
        </div>
      )}

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
        <button className={style.button} onClick={() => navigation("/stories")}>
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
