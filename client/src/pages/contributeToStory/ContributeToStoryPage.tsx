import { Box, TextField, Typography } from "@mui/material";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import ButtonTimer from "../../components/buttons/ButtonTimer";

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
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, p: 5, ml:20, mr: 20 }}>
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
              <Typography variant="h4" sx={{paddingBottom: 3}}>Fortsätt på berättelsen </Typography><ButtonTimer text="Starta tiden" onClick={() => setStarted(true)} />
             </Typography>
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
          <Button text="Publicera"></Button>
        </div>
      </Box>
    </Box>
  );
};

export default ContributeToStoryPage;
