import { Paper, Typography } from "@mui/material";
import style from "./homePage.module.scss";
import image from "../../assets/backgroundletters.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const { t } = useTranslation(); 

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
          backgroundColor:"rgb(912, 941, 541)",
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
             {t("home.findstory")} 
        </Typography>
        <Typography variant="body1" gutterBottom
        sx={{fontSize: "1.3rem"}}
        >
         {t("home.startnew")}
        </Typography>
        <Typography variant="body1" gutterBottom
         sx={{fontSize: "1.2rem"}}
        >
           {t("home.contribute")}
        </Typography>

        <Typography variant="body1" gutterBottom
         sx={{fontSize: "1.2rem", marginTop: 5}}>
            {t("home.terms")}     
          <Link
            className={style.link}
            to={"/terms"}
          >
           {t("home.find")}
          </Link>
        </Typography>
        <button className={style.button} onClick={() => navigation("/stories")}>
          <h2> {t("home.storys")}</h2>
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
       {t("home.work")}
        </Typography>
        <Typography variant="body1" gutterBottom
          sx={{fontSize: "1.3rem"}}>
                {t("home.spell")}
        </Typography>
        <Typography variant="body1" gutterBottom
          sx={{fontSize: "1.2rem"}}>
         {t("home.create")}
        </Typography>

        <button className={style.button} onClick={() => navigation("/terms")}>
          <h2>{t("home.readterms")}</h2>
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
