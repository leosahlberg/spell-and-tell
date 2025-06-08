import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./terms.module.scss";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TermsPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.terms}>
      <Typography className={styles.title} variant="h1" gutterBottom>
        {t("terms.title")}
      </Typography>
      <Divider sx={{ marginBottom: 4, color: "rgb(158, 186, 158)" }} />

      <Accordion
        className={styles.boxes}
        sx={{
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box",
          border: "1px solid rgb(195, 158, 121)",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={styles.subtitle} variant="h2">
            {t("terms.subtitle-about")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            sx={{ fontSize: "1.5rem", color: "rgb(12, 23, 79)" }}
            variant="body1"
          >
            {t("terms.about")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className={styles.boxes}
        sx={{
          marginTop: 5,
          border: "1px solid rgb(195, 158, 121)",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={styles.subtitle} variant="h2">
            {t("terms.subtitle-rules")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "rgb(12, 23, 79)" }}>
          <ol>
            <li className={styles.content}>{t("terms.rule-one")}</li>
            <li className={styles.content}>{t("terms.rule-two")}</li>
            <li className={styles.content}>{t("terms.rule-three")}</li>
            <li className={styles.content}>{t("terms.rule-four")}</li>
            <li className={styles.content}>{t("terms.rule-five")}</li>
          </ol>
        </AccordionDetails>
      </Accordion>

      <Paper
        className={styles.boxes}
        elevation={3}
        sx={{
          padding: 4,
          marginY: 6,
          border: "1px solid rgb(195, 158, 121)",
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "rgb(12, 23, 79)",
            marginBottom: 2,
          }}
          variant="h2"
        >
          {t("terms.subtitle-conditions")}
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ {t("terms.condition-one")}
        </Typography>
        <Typography className={styles.content} variant="body1"></Typography>
        <Typography className={styles.content} variant="body1">
          ✅ {t("terms.condition-two")}
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ {t("terms.condition-three")}
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ {t("terms.condition-four")}
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ {t("terms.condition-five")}
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ {t("terms.condition-six")}
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ {t("terms.condition-seven")}
        </Typography>
        <Typography sx={{ paddingTop: 5 }}>
          <Link
            to="/registration"
            style={{ color: "rgb(22, 83, 56)", fontSize: 20 }}
          >
            {t("registration.back")}
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default TermsPage;
