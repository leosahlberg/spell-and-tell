import { Box, List, ListItem, TextField, Typography } from "@mui/material";
import SixtyFpsSelectIcon from "@mui/icons-material/SixtyFpsSelect";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import ScoreboardTwoToneIcon from "@mui/icons-material/ScoreboardTwoTone";
import SpellcheckTwoToneIcon from "@mui/icons-material/SpellcheckTwoTone";
import ContrastTwoToneIcon from "@mui/icons-material/ContrastTwoTone";
import styles from "./createStoryPage.module.scss";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import ButtonTimer from "../../components/buttons/ButtonTimer";

const chooseFromMenu = [
  {
    title: "Antal ord",
    standard: "1000 ord",
    icon: <SixtyFpsSelectIcon />,
    path: "/contribute",
  },
  {
    title: "Max tid",
    standard: "20 min",
    icon: <HourglassTopTwoToneIcon />,
    path: "/createstory",
  },
  {
    title: "Deltagare",
    standard: "2 st",
    icon: <PeopleTwoToneIcon />,
    path: "/contribute",
  },
  {
    title: "Poängräkning",
    standard: "aktiv",
    icon: <ScoreboardTwoToneIcon />,
    path: "/createstory",
  },
  {
    title: "Rättstavning",
    standard: "aktiv",
    icon: <SpellcheckTwoToneIcon />,
    path: "/contribute",
  },
  {
    title: "Tema",
    standrad: "ej aktiv",
    icon: <ContrastTwoToneIcon />,
    path: "/createstory",
  },
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
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: 250,
          textAlign: "center",
          flexDirection: "column",
          backgroundColor: "rgb(129, 160, 129)",
          color: "white",
          height: "100vh",
        }}
      >
        <Typography
          sx={{
            paddingBottom: 3,
            paddingTop: 3,
            textDecorationLine: "underline",
          }}
          variant="h5"
        >
          Ändra tillval
        </Typography>
        <List>
          {chooseFromMenu.map((text) => (
            <ListItem
              className={styles.list}
              key={text.title}
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">{text.title}</Typography>
                <Box component="span">{text.icon}</Box>
              </Box>
              <Typography sx={{ paddingBottom: 2, fontStyle: "italic" }}>
                - Standard: {text.standard} -
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, p: 5 }}>
        <Typography gutterBottom>
          {started ? (
            <Typography >
                    {timeLeft ?  (
                      <Typography variant="h5"  >Tänk på att avsluta innan tiden tar slut..</Typography> 
                    ) : (
                      <Typography variant="h5"  >Tiden är tyvär slut!</Typography>
                    ) 
                  }   
              <Typography sx={{ paddingLeft:1, paddingTop: 2}}  color={timeLeft > 0 ? "rgb(238, 185, 121)" : "red"}variant="h5">Tid: {formatTime(timeLeft)}</Typography>
            </Typography>
          ) : (
             <Typography >
              <Typography variant="h4" sx={{paddingBottom: 3}}>Skriv en berättelse </Typography><ButtonTimer text="Starta tiden" onClick={() => setStarted(true)} />
             </Typography>
          )}
        </Typography>

        <TextField
          onChange={handleInputChange}
          disabled={!okWriting}
          value={text}
          fullWidth
          multiline
          rows={15}
          variant="outlined"
          placeholder="Skriv din berättelse här..."
          sx={{
            marginBottom: 2,
            marginTop: 4
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: 20,
          }}
        >
          <Button text="Skicka vidare"></Button>
        </div>
      </Box>
    </Box>
  );
};

export default CreateStoryPage;
