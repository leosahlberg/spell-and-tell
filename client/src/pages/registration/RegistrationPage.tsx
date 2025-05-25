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
import { useTranslation } from "react-i18next";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [, setError] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const { t } = useTranslation();
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
          padding: "20px 40px",
          maxWidth: 700,
          maxHeight: 700,
          marginBottom: 20,
          border: "2px solid rgb(195, 158, 121)",
          backgroundColor: "#FFFEFA",
          marginTop: 10,
          borderRadius: "8px",
        }}
      >
        <Typography
          className={styles.regtitle}
          variant="h1"
          sx={{ fontSize: "1.8rem" }}
          gutterBottom
        >
          {t("registration.createAccount")}
        </Typography>

        <form onSubmit={handleSubmit}>
          <label className={styles.label} id="name-label" htmlFor="name">
            {t("registration.name")}
          </label>
          <TextField
            variant="standard"
            id="name"
            fullWidth
            required
            placeholder={t("registration.name")}
            onChange={(e) => setName(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 14 },
            }}
          />
          <label
            className={styles.label}
            id="username-label"
            htmlFor="username"
          >
            {t("registration.username")}
          </label>
          <TextField
            variant="standard"
            id="username"
            fullWidth
            required
            placeholder={t("registration.username")}
            onChange={(e) => setUsername(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 14 },
            }}
          />

          <label className={styles.label} id="email-label" htmlFor="email">
            {t("registration.email")}
          </label>
          <TextField
            variant="standard"
            id="email"
            fullWidth
            required
            type="email"
            placeholder={t("registration.email")}
            onChange={(e) => setEmail(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 14 },
            }}
          />

          <label
            className={styles.label}
            id="password-label"
            htmlFor="password"
          >
            {t("registration.password")}
          </label>
          <TextField
            variant="standard"
            id="password"
            type="password"
            fullWidth
            required
            placeholder={t("registration.password")}
            onChange={(e) => setPassword(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 14 },
            }}
          />

          <label
            className={styles.label}
            id="confirm-password-label"
            htmlFor="confirm-password"
          >
            {t("registration.confirmPassword")}
          </label>
          <TextField
            variant="standard"
            id="confirm-password"
            type="password"
            fullWidth
            required
            placeholder={t("registration.confirmPassword")}
            onChange={(e) => confirmPassword(e.currentTarget.value)}
            sx={{
              marginBottom: 3,
              marginTop: 1,
              input: { color: "black", fontStyle: "italic", fontSize: 14 },
            }}
          />
          {errorPassword != null ? (
            <p style={{ color: "red" }}>{errorPassword}</p>
          ) : (
            <></>
          )}
          <FormControlLabel
            control={<Checkbox />}
            label={t("registration.acceptTerms")}
            required
            sx={{
              marginBottom: 1,
              color: "rgb(12, 23, 79)",
              fontSize: 18,
            }}
          />

          <Typography variant="body2" sx={{ fontSize: 18, color: "purple" }}>
            <Link to="/terms" style={{ color: "purple" }}>
              ({t("registration.terms")})
            </Link>
          </Typography>

          <div className={styles.regBtn}>
            <Button text={t("registration.createBtn")} />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default RegistrationPage;
