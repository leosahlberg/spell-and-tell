import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router";
import styles from "./terms.module.scss";

const TermsPage = () => {
  return (
    <div className={styles.terms}>
      <Typography className={styles.title} variant="h1" gutterBottom>
        Villkor och Regler
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
            Vad handlar spelet om?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            sx={{ fontSize: "1.5rem", color: "rgb(12, 23, 79)" }}
            variant="body1"
          >
            Spell & Tell är ett kreativt berättarspel för dig och dina vänner.
            Det fungerar lika bra i skolan som på fritiden. Skapa roliga och
            fantasifulla berättelser tillsammans genom att bidra med text stycke
            för stycke. Spelet börjar med att någon startar en berättelse och
            väljer vilka regler som ska gälla. Därefter skickas berättelsen
            vidare till en annan person eller görs tillgänglig för vem som helst
            att fortsätta skriva på. Målet är att skapa en unik historia
            tillsammans!
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
            Spelregler
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ color: "rgb(12, 23, 79)" }}>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{fontWeight: "bold"}}>1.</i> Starta en berättelse: Spelaren som börjar skriver första
            stycket och väljer regler för berättelsen.
          </Typography>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{fontWeight: "bold"}}>2.</i> Välj spelregler: Bestäm om det ska finnas några
            begränsningar, t.ex. Max antal ord per inlägg Tidsbegränsning för
            att skriva Specifika ord eller teman som måste användas Genre (t.ex.
            skräck, komedi, äventyr)
          </Typography>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{fontWeight: "bold"}}>3.</i> Bidra till berättelsen: När en spelare får berättelsen ska
            denne fortsätta med ett nytt stycke innan den skickas vidare.
          </Typography>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{fontWeight: "bold"}}>4.</i> Följ reglerna: Spelarna måste hålla sig till de regler som
            satts upp. Om någon bryter mot reglerna kan deras inlägg tas bort.
          </Typography>
          <Typography
            sx={{ paddingBottom: 1, fontSize: "1.5rem" }}
            variant="body1"
          >
            <i style={{fontWeight: "bold"}}>5.</i> Avsluta berättelsen: När historien känns färdig kan den
            publiceras som en färdig berättelse.
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
          Villkor att godkänna för att delta
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ Detta spel är avsett för kreativt samarbete och underhållning.
        </Typography>
        <Typography className={styles.content} variant="body1"></Typography>
        <Typography className={styles.content} variant="body1">
          ✅ Respektera andra spelare: Inga kränkande, stötande eller
          diskriminerande texter.
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ Följ reglerna: Varje berättelse har sina egna regler som måste
          följas.
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ Inga spoilers eller sabotage: Försök att bidra till berättelsen på
          ett sätt som gör den bättre.
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ Ingen spam eller reklam: Håll dig till spelet och undvik att posta
          irrelevant innehåll.
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ Godkänn att din text kan ändras: Andra spelare kan fortsätta på din
          berättelse och utveckla den i oväntade riktningar.
        </Typography>
        <Typography className={styles.content} variant="body1">
          ✅ Om en spelare bryter mot reglerna kan deras inlägg tas bort eller
          de kan bli avstängda från spelet.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to="/registration">
            <Button
              variant="text"
              sx={{ marginTop: 10, fontSize: "1.2rem" }}
            >
              Godkänn villkor & Skapa konto
            </Button>
          </Link>
        </Box>
      </Paper>
    </div>
  );
};

export default TermsPage;
