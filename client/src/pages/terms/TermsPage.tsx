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

const TermsPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.terms}>
      <Typography className={styles.title} variant="h1" gutterBottom>
        {t("terms.title")}
      </Typography>
      <Divider sx={{ marginBottom: 4, color: "rgb(158, 186, 158)" }} />

      <Accordion
        sx={{
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
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{ fontWeight: "bold" }}>1.</i> {t("terms.rule-one")}
          </Typography>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{ fontWeight: "bold" }}>2.</i> {t("terms.rule-two")}
          </Typography>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{ fontWeight: "bold" }}>3.</i> {t("terms.rule-three")}
          </Typography>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{ fontWeight: "bold" }}>4.</i> {t("terms.rule-four")}
          </Typography>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{ fontWeight: "bold" }}>5.</i> {t("terms.rule-five")}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Paper
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
            paddingBottom: 2,
            fontSize: "2rem",
            color: "rgb(12, 23, 79)",
            marginBottom: 3,
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
      </Paper>
    </div>
  );
};

export default TermsPage;
