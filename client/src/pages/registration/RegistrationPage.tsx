import styles from "./registrationPage.module.scss";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import Button from "../../components/buttons/Button";
import backgroundImage from "../../assets/bookimg.jpg";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("home");
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          padding: 4,
          maxWidth: 800,
          marginBottom: 30,
          border: "2px solid rgb(195, 158, 121)",
          backgroundColor: "#FFFEFA",
          marginTop: 5

        }}
      >
        <Typography className={styles.regtitle} variant="h1" gutterBottom>
          Skapa ett användarkonto
        </Typography>

        <Divider sx={{ marginBottom: 4, borderColor: "rgb(195, 158, 121)" }} />

        <form onSubmit={handleSubmit}>
          <label
            className={styles.label}
            id="username-label"
            htmlFor="username"
          >
            Användarnamn
          </label>
          <TextField
            variant="outlined"
            id="username"
            fullWidth
            required
            placeholder="Ange ditt användarnamn"
            sx={{ marginBottom: 3 }}
            slotProps={{
              input: {
                style: {
                  color: "black",
                  fontStyle: "italic",
                  marginTop:10
                },
              },
            }}
          />
          <label
            className={styles.label}
            id="email-label"
            htmlFor="email"
          >
            E-postadress
          </label>
          <TextField
            variant="outlined"
            id="email"
            fullWidth
            required
            type="email"
            placeholder="Ange din e-postadress"
            sx={{ marginBottom: 3, marginTop:1 }}
          />
          
          <label
            className={styles.label}
            id="password-label"
            htmlFor="password"
          >
            Lösenord
          </label>
          <TextField
            variant="outlined"
            id="password"
            type="password"
            fullWidth
            required
            placeholder="Välj ett starkt lösenord"
            sx={{ marginBottom: 3, marginTop:1 }}
          />
          <label
            className={styles.label}
            id="confirm-password-label"
            htmlFor="confirm-password"
          >
            Bekräfta Lösenord
          </label>
          <TextField
            variant="outlined"
            id="confirm-password"
            type="password"
            fullWidth
            required
            placeholder="Bekräfta ditt lösenord"
            sx={{ marginBottom: 3, marginTop:1 }}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="Jag accepterar villkor och regler"
            required
            sx={{ marginBottom: 3, color: "rgb(12, 23, 79)" }}
          />

          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            (läs <Link to="/terms">villkor och regler</Link>)
          </Typography>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button text="Skapa" />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default RegistrationPage;
