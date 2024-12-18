import styles from "./registrationPage.module.scss";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router";
import Button from "../../components/buttons/Button";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("home");
  };

  return (
    <div className={styles.registration}>
      <Paper elevation={24} sx={{ padding: 8, maxWidth: 800, width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          Skapa ett användarkonto
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginBottom: 4, marginTop: 2 }}
            label="Användarnamn"
            fullWidth
            required
          />
          <TextField
            sx={{ marginBottom: 4 }}
            label="Email"
            fullWidth
            required
          />
          <TextField
            sx={{ marginBottom: 4 }}
            label="Lösenord"
            type="password"
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Jag accepterar villkoren"
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              text="Skapa"
            ></Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default RegistrationPage;
