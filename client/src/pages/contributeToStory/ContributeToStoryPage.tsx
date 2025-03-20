import { Box, TextField, Typography } from "@mui/material";
import ButtonTimer from "../../components/buttons/ButtonTimer";
import styles from "./contributeToStoryPage.module.scss";
import RuleSetList from "../../components/rouleSet/ruleSetList";
import { useParams } from "react-router-dom";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import { Story } from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUpdateStory } from "../../redux/storySlice";

const ContributeToStoryPage = () => {
  const [timeLeft, setTimeLeft] = useState(1);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [wordsWhenTimesUp, setWordsWhenTimesUp] = useState(0);
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const userToken = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch<AppDispatch>();

  const stories = useSelector<RootState>(
    (state) => state.story.stories
  ) as Story[];

  useEffect(() => {
    if (id) {
      const selectedStory = stories.find((story) => story._id === id);
      if (selectedStory) {
        setStory(selectedStory);
        setTimeLeft(selectedStory.maxTime * 60);
      }
    }
  }, [id, stories]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      const wordCount = text.trim().split(/\s+/).length;
      setWordsWhenTimesUp(wordCount);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const calculateScore = () => {
    let score = 0;

    const wordCount = text.trim().split(/\s+/).length;
    if (story) {
      const maxWords = story.maxNumberOfWordsPerContribution;

      if (wordCount > maxWords) {
        const extraWords = wordCount - maxWords;
        score = maxWords - extraWords;
      } else {
        score = wordCount;
      }

      if (wordsWhenTimesUp > wordCount) {
        const extraWordsAfterTimesUp = wordsWhenTimesUp - wordCount;
        score -= extraWordsAfterTimesUp;
      }
    }
    console.log(score);
    return score;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) {
      setStarted(true);
    }
    setText(e.target.value);
  };

  const handlePublish = () => {
    if (text.trim() && story) {
      const score = calculateScore();
      const newContribution = {
        text: text,
        userId: {
          userId: currentUser?.userId ?? "",
          name: currentUser?.name ?? "Okänd användare",
        },
        _id: Date.now().toString(),
      };

      dispatch(
        fetchUpdateStory({
          id: story._id,
          text: text,
          userId: currentUser?.userId ?? "",
          score: score,
          token: userToken || "",
        })
      );

      setStory((prevStory) => {
        if (prevStory) {
          const updatedStory: Story = {
            ...prevStory,
            contributions: [...prevStory.contributions, newContribution],
          };
          return updatedStory;
        }
        return prevStory;
      });

      setText("");
    }
  };

  if (!story) {
    return <Typography variant="h1">Berättelsen hittades inte.</Typography>;
  }

  return (
    <Box className={styles.pageWrapper}>
      <RuleSetList
        ruleSet={{
          maxNumberOfWordsPerContribution:
            story.maxNumberOfWordsPerContribution,
          maxTime: story.maxTime,
          scoring: story.scoring,
          spellChecking: story.spellChecking,
          numberOfContribution: story.numberOfContributors,
        }}
        edit={false}
      />
      <Box className={styles.mainContent}>
        <Typography gutterBottom>
          {started ? (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {timeLeft ? (
                <Typography variant="h5" className={styles.timerText}>
                  Tänk på att avsluta innan tiden tar slut..
                </Typography>
              ) : (
                <Typography variant="h5" className={styles.timerText}>
                  {story.scoring
                    ? "Tiden är tyvärr slut! Om du fortsätter skriva kommer du få minuspoäng..."
                    : "Tiden är tyvärr slut!"}
                </Typography>
              )}
              <Typography variant="h5" className={styles.timer}>
                Tid: {formatTime(timeLeft)}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="h1"
                sx={{ paddingBottom: 3, paddingRight: 5, fontSize: "2.5rem" }}
              >
                Fortsätt på berättelsen
              </Typography>
              <ButtonTimer
                text="Starta tiden"
                onClick={() => setStarted(true)}
              />
            </Box>
          )}
        </Typography>
        <Typography className={styles.storyText}>
          {story.contributions.map((contribution, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography
                variant="body1"
                sx={{ marginTop: 3, marginBottom: 5 }}
              >
                {contribution.text}
              </Typography>
              <Typography
                variant="h6"
                component="h2"
                sx={{ border: "1px solid lightgray", padding: 1 }}
              >
                Författare: {contribution.userId.name}
              </Typography>
            </Box>
          ))}
        </Typography>

        <TextField
          label="fortsätt på berättelsen"
          onChange={handleInputChange}
          value={text}
          fullWidth
          multiline
          rows={20}
          variant="outlined"
          placeholder="Skriv här..."
          className={styles.textField}
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 1,
          }}
          spellCheck={story.spellChecking ? "true" : "false"}
        />
        <Box className={styles.buttonWrapper}>
          <Button className={styles.button} text="Skicka vidare" />
          <Button
            className={styles.button}
            text="Publicera"
            onClick={handlePublish}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ContributeToStoryPage;
