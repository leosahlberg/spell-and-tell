import { Paper, TextField, Typography } from "@mui/material";
import style from "./logInPage.module.scss";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchLogin } from "../../redux/authSlice";
import backgroundImage from "../../assets/bookimg.jpg";
import Button from "../../components/buttons/Button";
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const LogInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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
          Logga in
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
            Användarnamn
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
            placeholder="Exempel.. Anna79"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />

          <label className={style.label} id="password-label" htmlFor="password">
            Lösenord
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
            placeholder="(minst 8 tecken)"
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
            <Button text="Logga in" className={style.button} />
          </div>
        </form>
      </Paper>
      <section>
        <Typography variant="h2" gutterBottom className={style.register}>
          Har du inget konto? <ArrowForwardOutlinedIcon sx={{marginLeft: 1, marginRight: 4}}/>
          <Link
            className={style.link}
            to={"/registration"}
            aria-label="Registrera ett konto"
          >
            Registrera dig här
          </Link>
        </Typography>
      </section>
    </div>
  );
};

export default LogInPage;
