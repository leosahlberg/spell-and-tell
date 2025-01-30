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

    <Accordion sx={{ border: "1px solid rgb(195, 158, 121)" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={styles.subtitle} variant="h2">
          Vad handlar spelet om?
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{fontSize: "1.5rem",  color: "rgb(12, 23, 79)"}} variant="h3">
          Spelet handlar om att skapa historier tillsammans med andra. Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Fugit accusamus
          fuga nostrum cum vero doloribus maiores animi velit, adipisci dicta
          neque a possimus facere pariatur alias iure voluptates, odio natus!
        </Typography>
      </AccordionDetails>
    </Accordion>

    <Accordion sx={{ marginTop: 5, border: "1px solid rgb(195, 158, 121)" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={styles.subtitle}  variant="h2">
          Spelregler!
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ color: "rgb(12, 23, 79)"}}>
        <Typography sx={{ paddingBottom: 1 }} variant="body1">
          1. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          architecto iste, excepturi neque amet odio sed eos a earum.
        </Typography>
        <Typography sx={{ paddingBottom: 1 }} variant="body1">
          2. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          architecto iste, excepturi neque amet odio sed eos a earum.
        </Typography>
        <Typography sx={{ paddingBottom: 1 }} variant="body1">
          3. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          architecto iste, excepturi neque amet odio sed eos a earum.
        </Typography>
        <Typography sx={{ paddingBottom: 1 }} variant="body1">
          4. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          architecto iste, excepturi neque amet odio sed eos a earum.
        </Typography>
        <Typography sx={{ paddingBottom: 1 }} variant="body1">
          5. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          architecto iste, excepturi neque amet odio sed eos a earum.
        </Typography>
        <Typography sx={{ paddingBottom: 1 }} variant="body1">
          6. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          architecto iste, excepturi neque amet odio sed eos a earum.
        </Typography>
        <Typography sx={{ paddingBottom: 1 }} variant="body1">
          7. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          architecto iste, excepturi neque amet odio sed eos a earum.
        </Typography>
        <Typography sx={{ paddingBottom: 1 }} variant="body1">
          8. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
          architecto iste, excepturi neque amet odio sed eos a earum.
        </Typography>
      </AccordionDetails>
    </Accordion>

    <Paper
      elevation={3}
      sx={{ padding: 4, marginY: 6, border: "1px solid rgb(195, 158, 121)" }}
    >
      <Typography  sx={{ fontWeight: "bold", paddingBottom: 2, fontSize: "2.5rem",   color: "rgb(12, 23, 79)" }} variant="h3">
        Villkor att godkänna för att delta.
      </Typography>
      <Typography className={styles.content}  variant="body1">
        - Detta spel är avsett för kreativt samarbete och underhållning.
      </Typography>
      <Typography className={styles.content} variant="body1">
        - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex ea
        impedit, laboriosam enim cumque odit debitis asperiores possimus rerum
        ratione et illo. Explicabo est iusto inventore labore quibusdam
        ratione maxime? underhållning.
      </Typography>
      <Typography className={styles.content}  variant="body1">
        - Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
        voluptatem velit aspernatur. Obcaecati quasi corrupti quia voluptatum!
        Incidunt distinctio consequuntur corporis adipisci eum dignissimos
        veniam! Ut suscipit quo eum autem?
      </Typography>
      <Typography  className={styles.content} variant="body1">
        - Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
        nostrum eum quo voluptate quasi itaque, eius expedita, at nam facilis
        velit! Nulla corporis libero inventore quasi possimus excepturi
        blanditiis similique.
      </Typography>
      <Typography className={styles.content} variant="body1">
        - Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita,
        ducimus culpa soluta vel accusamus officia repellendus. Quaerat ad
        eaque asperiores aliquid, temporibus reprehenderit cum maiores, quidem
        officia exercitationem distinctio pariatur.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/registration">
          <Button variant="text" sx={{ marginTop: 10 , color: "purple",}}>
            Tillbaka till skapa konto
          </Button>
        </Link>
      </Box>
    </Paper>
  </div>
);
};

export default TermsPage;
