import { Paper, Typography } from "@mui/material";
import style from "./homePage.module.scss";
import image from "../../assets/backgroundletters.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../components/buttons/Button";

const HomePage = () => {
  const navigation = useNavigate();
  const { t } = useTranslation();

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
          color: "rgb(7, 7, 58)",
          backgroundColor: "rgb(912, 941, 541)",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            width: "fit-content",
            fontWeight: "500",
            fontSize: "1.8rem",
            height: "fit-content",
          }}
        >
          {t("home.findstory")}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.3rem" }}>
          {t("home.startnew")}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.2rem" }}>
          {t("home.contribute")}
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: "1.2rem", marginTop: 5, mb:3 }}
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
          padding: 6,
          marginBottom: 2,
          width: { xs: "100%", sm: "45%" },
          margin: { xs: 1, sm: 2 },
          color: "rgb(7, 7, 58)",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            width: "fit-content",
            fontWeight: "500",
            fontSize: "1.8rem",
            height: "fit-content",
          }}
        >
          {t("home.work")}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.3rem" }}>
          {t("home.spell")}
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: "1.2rem", mb:3 }}>
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
