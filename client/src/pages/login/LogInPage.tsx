import { Paper, TextField, Typography } from "@mui/material";
import style from "./logInPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchLogin } from "../../redux/authSlice";
import backgroundImage from "../../assets/bookimg.jpg";
import Button from "../../components/buttons/Button";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useTranslation } from "react-i18next";

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation(); 

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState>((state) => state.auth.error) as string;

  useEffect(() => {
    setError(data);
  }, [data]);

  return (
    <div
      className={style.container}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        maxHeight: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={24}
        className={style.form}
        sx={{
          padding: 6,
          maxWidth: 700,
          maxHeight: 650,
          border: "2px solid rgb(195, 158, 121)",
          backgroundColor: "#FFFEFA",
        }}
      >
        <Typography variant="h1" gutterBottom className={style.loggin}>
        {t("loginuser.login")}
        </Typography>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const actionresult = await dispatch(
              fetchLogin({ username: username, password: password })
            );
            if (fetchLogin.fulfilled.match(actionresult)) {
              navigate("/");
            }
          }}
        >
          <label className={style.label} id="username-label" htmlFor="username">
          {t("loginuser.username")}
          </label>
          <TextField
            variant="standard"
            slotProps={{
              input: {
                style: {
                  color: "black",
                  fontStyle: "italic",
                  fontSize: 18,
                },
              },
            }}
            sx={{ marginBottom: 4, marginTop: 1 }}
            fullWidth
            required
            id="username"
            placeholder= {t("loginuser.example")}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />

          <label className={style.label} id="password-label" htmlFor="password">
          {t("loginuser.password")}
          </label>
          <TextField
            slotProps={{
              input: {
                style: {
                  color: "black",
                  fontStyle: "italic",
                  fontSize: 18,
                },
              },
            }}
            variant="standard"
            type="password"
            id="password"
            placeholder={t("loginuser.min")}
            onChange={(e) => setPassword(e.currentTarget.value)}
            fullWidth
            required
            sx={{ marginBottom: 4, marginTop: 1 }}
          />

          {error != null ? <p style={{ color: "red" }}>{error}</p> : <></>}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "20px",
            }}
          >
            <Button text={t("loginuser.loginbtn")} className={style.button} />
          </div>
        </form>
      </Paper>
      <section>
        <Typography variant="h2" gutterBottom className={style.register}>
        {t("loginuser.noaccount")}? <ArrowForwardOutlinedIcon sx={{marginLeft: 1, marginRight: 4}}/>
          <Link
            className={style.link}
            to={"/registration"}
            aria-label="Registrera ett konto"
          >
            {t("loginuser.register")}
          </Link>
        </Typography>
      </section>
    </div>
  );
};

export default LogInPage;
