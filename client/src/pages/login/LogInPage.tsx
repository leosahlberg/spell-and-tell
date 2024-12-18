import { TextField } from "@mui/material";
import style from "./logInPage.module.scss";

const LogInPage = () => {
  return (
    <div className={style.container}>
      <form action="submit" className={style.form}>
        <TextField
          id="outlined-basic"
          label="Användarnamn"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Lösenord"
          variant="outlined"
          color="primary"
        />
        <button className={style.btn}>Logga in</button>
      </form>
    </div>
  );
};

export default LogInPage;
