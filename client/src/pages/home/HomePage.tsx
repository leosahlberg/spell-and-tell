import { Paper, Typography } from "@mui/material";
import style from "./homePage.module.scss";
import image from "../../assets/backgroundletters.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, []);

  return (
    <div className={style.container} ref={mainRef}
    tabIndex={-1}>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
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
          padding: 4,
          width: { xs: "100%", sm: "45%" },
          margin: { xs: 1, sm: 2 },
          color: "rgb(7, 7, 58)",
          backgroundColor: "rgb(912, 941, 541)",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          component="h1"
          gutterBottom
          sx={{
            width: "fit-content",
            fontWeight: "300",
            fontSize: "2rem",
            height: "fit-content",
            pb: 2,
          }}
        >
          {t("home.findstory")}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.5rem" }}>
          {t("home.startnew")}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.5rem" }}>
          {t("home.contribute")}
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: "1.5rem", marginTop: 2, mb: 5 }}
        >
          {t("home.terms")}
          <Link className={style.link} to={"/terms"}>
            {t("home.find")}
          </Link>
        </Typography>
        <Button
          text={t("home.storys")}
          onClick={() => navigation("/stories")}
        />
      </Paper>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          width: { xs: "100%", sm: "45%" },
          margin: { xs: 1, sm: 2 },
          color: "rgb(7, 7, 58)",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          component="h2"
          gutterBottom
          sx={{
            width: "fit-content",
            fontWeight: "300",
            fontSize: "2rem",
            height: "fit-content",
            pb: 2,
          }}
        >
          {t("home.work")}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.5rem" }}>
          {t("home.spell")}
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: "1.5rem", mb: 5 }}
        >
          {t("home.create")}
        </Typography>

        <Button
          text={t("home.readterms")}
          onClick={() => navigation("/terms")}
        />
      </Paper>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
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
