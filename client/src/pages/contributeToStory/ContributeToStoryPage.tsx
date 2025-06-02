import { Box, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/buttons/Button";
import RuleSetList from "../../components/rouleSet/ruleSetList";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUpdateStory } from "../../redux/storySlice";
import { Story } from "../../utils/types";
import styles from "./contributeToStoryPage.module.scss";
import { useTranslation } from "react-i18next";

const ContributeToStoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [story, setStory] = useState<Story | null>(null);
  const [text, setText] = useState("");
  const [timeLeft, setTimeLeft] = useState(1);
  const [started, setStarted] = useState(false);
  const [wordsWhenTimesUp, setWordsWhenTimesUp] = useState(0);

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const userToken = useSelector((state: RootState) => state.auth.token);
  const stories = useSelector(
    (state: RootState) => state.story.stories
  ) as Story[];
  const navigate = useNavigate();

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
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setWordsWhenTimesUp(text.trim().split(/\s+/).length);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft, text]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const calculateScore = () => {
    let score = 0;
    if (story) {
      const wordCount = text.trim().split(/\s+/).length;
      const maxWords = story.maxNumberOfWordsPerContribution;

      score =
        wordCount > maxWords ? maxWords - (wordCount - maxWords) : wordCount;
      score -= wordsWhenTimesUp > wordCount ? wordsWhenTimesUp - wordCount : 0;
    }
    return score;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) setStarted(true);
    setText(e.target.value);
  };

  async function handlePublish() {
    if (text.trim() && story) {
      const score = story.scoring ? calculateScore() : 0;
      const actionResult = await dispatch(
        fetchUpdateStory({
          id: story._id,
          text,
          userId: currentUser?.userId ?? "",
          score,
          token: userToken || "",
        })
      );
      if (fetchUpdateStory.fulfilled.match(actionResult)) {
        navigate(`/invitation/${story._id}`);
      }
    }
  }

  if (!story)
    return (
      <Typography variant="h1">{t("contributeToStory.notfound")}</Typography>
    );

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
              <Typography variant="h5" className={styles.timerText}>
                {timeLeft
                  ? t("contributeToStory.timingInfo")
                  : story.scoring
                  ? t("contributeToStory.timesUpScoring")
                  : t("contributeToStory.timesUp")}
              </Typography>
              <Typography variant="h5" className={styles.timer}>
                {t("contributeToStory.time")} {formatTime(timeLeft)}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                component="h1"
                sx={{
                  paddingRight: 5,
                  paddingLeft: 1,
                  fontSize: "1.5rem",
                  color: "white",
                }}
              >
                {t("contributeToStory.continueStory")}
              </Typography>
              <Button
                text={t("contributeToStory.start")}
                onClick={() => setStarted(true)}
              />
            </Box>
          )}
        </Typography>

        <Box className={styles.storyContent}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: "200",
              color: "orange",
              paddingY: 2,
              paddingLeft: 1,
            }}
          >
            {t("story.score")}:
            <span className={styles.scoreCircle}>{story.score}</span>
          </Typography>

          <Typography
            sx={{ backgroundColor: "white", padding: 2, borderRadius: 2 }}
          >
            {story.contributions.map((contribution, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{ marginY: 2, fontSize: 22 }}
              >
                {contribution.text}
              </Typography>
            ))}
          </Typography>
          {story.contributions.length + 1 == story.numberOfContributors ? (
            <Typography
              variant="h6"
              sx={{
                marginBottom: 5,
                marginLeft: 3,
                paddingTop: 4,
                color: "white",
              }}
            >
              {t("contributeToStory.lastContribution")}
            </Typography>
          ) : (
            <Typography
              variant="h6"
              sx={{
                marginBottom: 1,
                marginLeft: 3,
                paddingTop: 4,
                color: "white",
              }}
            >
              {t("contributeToStory.contributionNumber")}{" "}
              {story.contributions.length + 1}/{story.numberOfContributors}.
            </Typography>
          )}
        </Box>

        <Box sx={{ p: 1, backgroundColor: "wheat", borderRadius: 2 }}>
          <TextField
            label={t("contributeToStory.storyPlaceholder")}
            onChange={handleInputChange}
            value={text}
            fullWidth
            multiline
            rows={12}
            variant="outlined"
            placeholder={t("contributeToStory.storyPlaceholder")}
            className={styles.textField}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,

              padding: 1,
            }}
            spellCheck={story.spellChecking}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", paddingBottom: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: "orange",
              marginRight: 2,
              paddingTop: 2,
              paddingLeft: 1,
            }}
          >
            {t("contributeToStory.author")}
          </Typography>
          {story.contributions.map((contribution, index) => (
            <Typography
              key={index}
              variant="h6"
              sx={{
                marginBottom: 5,
                marginLeft: 3,
                paddingTop: 2,
                color: "white",
              }}
            >
              {contribution.userId.name}
            </Typography>
          ))}
        </Box>
        <Box className={styles.buttonWrapper}>
          <Button text={t("general.save")} onClick={() => handlePublish()} />
        </Box>
      </Box>
    </Box>
  );
};

export default ContributeToStoryPage;
