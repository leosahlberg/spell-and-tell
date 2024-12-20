import { Paper, TextField, Typography } from "@mui/material";
import style from "./logInPage.module.scss";
import Button from "../../components/buttons/Button";

const LogInPage = () => {
  return (
    <div className={style.container}>
      <Paper
        elevation={24}
        sx={{
          padding: 6,
          maxWidth: 800,
          maxHeight: "100vh",
          marginBottom: 20,
          border: "2px solid rgb(158, 186, 158)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Logga in
        </Typography>
        <form onSubmit={() => console.log("loggar in")}>
          <TextField
            label="Användarnamn"
            variant="outlined"
            sx={{ marginBottom: 4, marginTop: 4 }}
            fullWidth
            required
          />
          <TextField
            sx={{ marginBottom: 4 }}
            label="Lösenord"
            variant="outlined"
            type="password"
            fullWidth
            required
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button text="Logga in"></Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default LogInPage;
