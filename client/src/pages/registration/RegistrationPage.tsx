import styles from "./registrationPage.module.scss";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/bookimg.jpg";
import Button from "../../components/buttons/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchRegistrateUser } from "../../redux/authSlice";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState>((state) => state.auth.error) as string;

  useEffect(() => {
    setError(data);
  }, [data]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const actionresult = await dispatch(
      fetchRegistrateUser({
        name: name,
        username: username,
        email: email,
        password: password,
      })
    );
    if (fetchRegistrateUser.fulfilled.match(actionresult)) {
      navigate("/login");
    }
  };

  function confirmPassword(pass: string) {
    if (pass !== password) {
      setErrorPassword("Password don't match");
    } else {
      setErrorPassword(null);
    }
  }

  return (
    <div
      className={styles.registration}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        maxHeight: "100%",
        width: "100%",
      }}
    >
      <Paper
        elevation={24}
        className={styles.form}
        sx={{
          padding: 4,
          maxWidth: 800,
          marginBottom: 20,
          border: "2px solid rgb(195, 158, 121)",
          backgroundColor: "#FFFEFA",
          marginTop: 5,
          borderRadius: "8px",
        }}
      >
        <Typography
          className={styles.regtitle}
          variant="h1"
          sx={{ fontSize: "3rem" }}
          gutterBottom
        >
          Skapa ett användarkonto
        </Typography>

        <form onSubmit={handleSubmit}>
          <label className={styles.label} id="name-label" htmlFor="name">
            Namn
          </label>
          <TextField
            variant="standard"
            id="name"
            fullWidth
            required
            placeholder="Ange namn"
            onChange={(e) => setName(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 18 },
            }}
          />
          <label
            className={styles.label}
            id="username-label"
            htmlFor="username"
          >
            Användarnamn
          </label>
          <TextField
            variant="standard"
            id="username"
            fullWidth
            required
            placeholder="Ange användarnamn (exempel: Anna79)"
            onChange={(e) => setUsername(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 18 },
            }}
          />

          <label className={styles.label} id="email-label" htmlFor="email">
            E-postadress
          </label>
          <TextField
            variant="standard"
            id="email"
            fullWidth
            required
            type="email"
            placeholder="Ange din e-postadress (exempel anna@gmail.com)"
            onChange={(e) => setEmail(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 18 },
            }}
          />

          <label
            className={styles.label}
            id="password-label"
            htmlFor="password"
          >
            Lösenord
          </label>
          <TextField
            variant="standard"
            id="password"
            type="password"
            fullWidth
            required
            placeholder="Ange lösenord (minst 8 tecken)"
            onChange={(e) => setPassword(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 18 },
            }}
          />

          <label
            className={styles.label}
            id="confirm-password-label"
            htmlFor="confirm-password"
          >
            Bekräfta Lösenord
          </label>
          <TextField
            variant="standard"
            id="confirm-password"
            type="password"
            fullWidth
            required
            placeholder="Bekräfta ditt lösenord"
            onChange={(e) => confirmPassword(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 18 },
            }}
          />
          {errorPassword != null ? (
            <p style={{ color: "red" }}>{errorPassword}</p>
          ) : (
            <></>
          )}
          <FormControlLabel
            control={<Checkbox />}
            label="Jag accepterar villkor och regler"
            required
            sx={{
              marginBottom: 1,
              color: "rgb(12, 23, 79)",
              fontSize: 18,
            }}
          />

          <Typography variant="body2" sx={{ fontSize: 18, color: "purple" }}>
            (läs{" "}
            <Link to="/terms" style={{ color: "purple" }}>
              villkor och regler
            </Link>
            )
          </Typography>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button text="Skapa" className={styles.button} />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default RegistrationPage;
