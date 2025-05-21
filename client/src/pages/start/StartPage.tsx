import style from "./startPage.module.scss";
import imglogo from "../../assets/logoST2.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router";
import Button from "../../components/buttons/Button";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import React from "react";
import swe from "../../assets/sweden.jpg";
import eng from "../../assets/england.jpg";

const StartPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);
  const [selectedFlag, setSelectedFlag] = React.useState(swe);

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);

    if (language === "sv") {
      setSelectedFlag(swe);
    } else if (language === "en") {
      setSelectedFlag(eng);
    }
  };

  React.useEffect(() => {
    setSelectedLanguage(i18n.language);
    setSelectedFlag(i18n.language === "sv" ? swe : eng);
  }, [i18n.language]);
  

  return (
      <div className={style.container}>
        <header>
          <Typography className={style.header} variant="h1" gutterBottom>
            {t("welcome.welcometext")}
          </Typography>
        </header>
        <img
          src={imglogo}
          alt="Spell and Tell logotyp med en penna som symboliserar kreativt skrivande"
          width={400}
          height={250}
        />
        <Button
          text={t("welcome.loggin")}
          onClick={() => navigate("/login")}
        />
        <section>
          <Typography
            className={style.register}
            sx={{ fontSize: "2rem", mt: 5}}
            variant="h2"
            gutterBottom
          >
            {t("welcome.noaccount")}
            <Link className={style.link} to={"/registration"}>
              {t("welcome.register")}
            </Link>
          </Typography>
        </section>
        <div className={style.flags}>
          <Typography>{t("welcome.language")}</Typography>
          <select
            className={style.flagname}
            onChange={(e) => handleChangeLanguage(e.target.value)}
            value={selectedLanguage}
            aria-label={t("welcome.language")}
          >
            <option value="sv">Sve</option>
            <option value="en">Eng</option>
          </select>
          <img
            src={selectedFlag}
            alt={selectedLanguage === "sv" ? "Svenska" : "English"}
            className={style.flag}
          />
        </div>
      </div>
  );
};

export default StartPage;
