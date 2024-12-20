import { Paper, TextField, Typography } from "@mui/material";
import style from "./homePage.module.scss";

const HomePage = () => {
  return (
    <div className={style.container}>
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginBottom: 2,
          width: "45%",
          margin: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Mina berättelser
        </Typography>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginBottom: 2,
          width: "45%",
          margin: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hitta berättelse att bidra till
        </Typography>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginBottom: 2,
          width: "45%",
          margin: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Nya förfrågningar
        </Typography>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          padding: 6,
          marginBottom: 2,
          width: "45%",
          margin: 1,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Mina bidrag
        </Typography>
      </Paper>
    </div>
  );
};

export default HomePage;
