import styles from "./registrationPage.module.scss";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import backgroundImage from "../../assets/bookimg.jpg";
import Button from "../../components/buttons/Button";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("/home");
  };

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
          maxWidth: 650,
          marginBottom: 20,
          border: "2px solid rgb(195, 158, 121)",
          backgroundColor: "#FFFEFA",
          marginTop: 5,
          borderRadius: "8px",
        }}
      >
        <Typography className={styles.regtitle} variant="h1" sx={{fontSize: "3rem"}} gutterBottom>
          Skapa ett användarkonto
        </Typography>

        <form onSubmit={handleSubmit}>
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
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 15 },
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
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 15 },
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
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 15 },
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
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 15 },
            }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Jag accepterar villkor och regler"
            required
            sx={{
              marginBottom: 1,
              color: "rgb(12, 23, 79)",
              fontSize: 14,
            }}
          />

          <Typography variant="body2">
            (läs <Link to="/terms">villkor och regler</Link>)
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
