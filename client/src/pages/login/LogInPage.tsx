import { Paper, TextField, Typography } from "@mui/material";
import style from "./logInPage.module.scss";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchLogin } from "../../redux/authSlice";

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
    <div className={style.container}>
      <Paper
        elevation={24}
        sx={{
          padding: 6,
          maxWidth: 800,
          maxHeight: "100vh",
          marginBottom: 2,
          border: "2px solid rgb(158, 186, 158)",
        }}
      >
        <Typography variant="h4" gutterBottom>
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
          <TextField
            label="Användarnamn"
            variant="outlined"
            sx={{ marginBottom: 4, marginTop: 4 }}
            fullWidth
            required
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
          <TextField
            sx={{ marginBottom: 4 }}
            label="Lösenord"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            fullWidth
            required
          />
          {error != null ? <p style={{ color: "red" }}>{error}</p> : <></>}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <input className={style.button} type="submit" value="Logga in" />
          </div>
        </form>
      </Paper>
      <Typography variant="h6" gutterBottom>
        Har du inget konto? Registrera dig{" "}
        <span className={style.link} onClick={() => navigate("/registration")}>
          här
        </span>
      </Typography>
    </div>
  );
};

export default LogInPage;
