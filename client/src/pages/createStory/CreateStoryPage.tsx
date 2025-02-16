import { Box, List, ListItem, Typography, TextField } from "@mui/material";
import SixtyFpsSelectIcon from "@mui/icons-material/SixtyFpsSelect";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import ScoreboardTwoToneIcon from "@mui/icons-material/ScoreboardTwoTone";
import SpellcheckTwoToneIcon from "@mui/icons-material/SpellcheckTwoTone";
import ContrastTwoToneIcon from "@mui/icons-material/ContrastTwoTone";
import Button from "../../components/buttons/Button";
import ButtonTimer from "../../components/buttons/ButtonTimer";
import { useState, useEffect } from "react";
import styles from "./createStoryPage.module.scss";

const chooseFromMenu = [
  { title: "Antal ord", standard: "1000 ord", icon: <SixtyFpsSelectIcon /> },
  { title: "Max tid", standard: "20 min", icon: <HourglassTopTwoToneIcon /> },
  { title: "Deltagare", standard: "2 st", icon: <PeopleTwoToneIcon /> },
  { title: "Poängräkning", standard: "aktiv", icon: <ScoreboardTwoToneIcon /> },
  { title: "Rättstavning", standard: "aktiv", icon: <SpellcheckTwoToneIcon /> },
  { title: "Tema", standard: "ej aktiv", icon: <ContrastTwoToneIcon /> },
];

const CreateStoryPage = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [okWriting, setOkWriting] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setOkWriting(false);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) {
      setStarted(true);
    }
    setText(e.target.value);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, padding: { xs: 2, md: 4 },    marginLeft: { md: 5 },    marginRight: { md: 5 }, marginTop:5 }}>
      <Box
        sx={{
          width: { xs: "100%", md: 300 },
          marginRight: { md: 4 },
          border: "2px solid  rgb(212, 202, 187)",
          color: "rgb(12, 23, 79)",
          padding: 4,
          borderRadius: 8,
          boxShadow: 2,
          marginBottom: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Ändra tillval
        </Typography>

        <List sx={{ padding: 0 }}>
          {chooseFromMenu.map((item) => (
            <ListItem key={item.title} className={styles.list}>
              <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <Typography className={styles.title}>{item.title}</Typography>
                <Box sx={{ color: "rgb(12, 23, 79)" }}>{item.icon}</Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className={styles.box} sx={{ flexGrow: 1, padding: 4, borderRadius: 8 }}>
        <Typography variant="h4" sx={{ marginBottom: 1, color: "rgb(12, 23, 79)" }}>
          Skriv din berättelse
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          {started ? (
            <Typography variant="h5">
              {timeLeft > 0 ? (
                <>
                  <Typography variant="h5">Tänk på att avsluta innan tiden tar slut..</Typography>
                  <Typography variant="h5" color="rgb(238, 185, 121)">
                    Tid: {formatTime(timeLeft)}
                  </Typography>
                </>
              ) : (
                <Typography variant="h5" color="red">
                  Tiden är tyvärr slut!
                </Typography>
              )}
            </Typography>
          ) : (
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              <Typography variant="h5" sx={{ display: "inline-block", marginRight: 2 }}>
                Starta tiden
              </Typography>
              <ButtonTimer text="Starta" onClick={() => setStarted(true)} />
            </Typography>
          )}
        </Box>

        <TextField
          value={text}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={15}
          disabled={!okWriting}
          variant="outlined"
          placeholder="Skriv din berättelse här..."
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 2,
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }} className={styles.buttonWrapper}>
          <Button className={styles.button} text="Skicka vidare" />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateStoryPage;
