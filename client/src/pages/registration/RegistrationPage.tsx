import styles from "./registrationPage.module.scss";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import Button from "../../components/buttons/Button";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate("home");
  };

  return (
    <div className={styles.registration}>
      <Paper elevation={24} sx={{ padding: 6, maxWidth: 800, maxHeight: "100vh", marginBottom: 20,  border: "2px solid rgb(158, 186, 158)", }}>
        <Typography variant="h4" gutterBottom>
          Skapa ett användarkonto
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginBottom: 4, marginTop: 4 }}
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
             <TextField
            sx={{ marginBottom: 4 }}
            label="Bekräfta Lösenord"
            type="password"
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Jag accepterar villkoren och regler"
          />
          <p>(läs <Link to="/home"> villkor och regler</Link>)</p>
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
