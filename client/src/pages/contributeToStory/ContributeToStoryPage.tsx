import { Box, TextField, Typography } from "@mui/material";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import ButtonTimer from "../../components/buttons/ButtonTimer";
import styles from "./contributeToStoryPage.module.scss"; // Import your custom SCSS styles

const ContributeToStoryPage = () => {
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
    <Box className={styles.pageWrapper}>
      <Box className={styles.mainContent}>
        <Typography gutterBottom>
          {started ? (
            <Box>
              {timeLeft ? (
                <Typography variant="h5" className={styles.timerText}>
                  Tänk på att avsluta innan tiden tar slut..
                </Typography>
              ) : (
                <Typography variant="h5" className={styles.timerText}>
                  Tiden är tyvärr slut!
                </Typography>
              )}
              <Typography variant="h5" className={styles.timer}>
                Tid: {formatTime(timeLeft)}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" sx={{ paddingBottom: 3 }}>
                Fortsätt på berättelsen
              </Typography>
              <ButtonTimer text="Starta tiden" onClick={() => setStarted(true)} />
            </Box>
          )}
        </Typography>

        <TextField
          onChange={handleInputChange}
          disabled={!okWriting}
          value={text}
          fullWidth
          multiline
          rows={20}
          variant="outlined"
          placeholder="Förtsätt på berättelsen här..."
          className={styles.textField}
        />
        <Box className={styles.buttonWrapper}>
          <Button text="Skicka vidare" />
          <Button text="Publicera" />
        </Box>
      </Box>
    </Box>
  );
};

export default ContributeToStoryPage;
