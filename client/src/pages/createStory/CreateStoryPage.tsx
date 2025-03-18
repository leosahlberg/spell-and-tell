import { Box, Typography, TextField } from "@mui/material";
import Button from "../../components/buttons/Button";
import { useState, useEffect } from "react";
import styles from "./createStoryPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCreateStory } from "../../redux/storySlice";
import ImagePicker from "../../components/ImagePicker";
import { RuleSet } from "../../utils/types";
import RouleSetList from "../../components/rouleSet/ruleSetList";
import { useNavigate } from "react-router-dom";

const CreateStoryPage = () => {
  const [started, setStarted] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ruleSet, setRuleSet] = useState<RuleSet>({
    maxNumberOfWordsPerContribution: 1000,
    numberOfContribution: 2,
    maxTime: 60,
    spellChecking: false,
    scoring: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector<RootState>(
    (state) => state.auth.user?.userId
  ) as string;
  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const ruleSetData = useSelector<RootState>(
    (state) => state.ruleSet.ruleSet
  ) as RuleSet | null;

  useEffect(() => {
    if (ruleSetData != null) {
      setRuleSet(ruleSetData);
    }
  }, [ruleSetData]);

  const handleInputChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) {
      setStarted(true);
    }
    setText(e.target.value);
  };

  const calculateScore = () => {
    let score;

    const wordCount = text.trim().split(/\s+/).length;
    const maxWords = ruleSet.maxNumberOfWordsPerContribution;

    if (wordCount > maxWords) {
      const extraWords = wordCount - maxWords;
      score = maxWords - extraWords;
    } else {
      score = wordCount;
    }

    return score;
  };

  async function createStory() {
    if (userId && token) {
      const actionResult = await dispatch(
        fetchCreateStory({
          title: title,
          id: userId,
          imgUrl: selectedImage || "test",
          text: text,
          maxNumberOfWordsPerContribution:
            ruleSet.maxNumberOfWordsPerContribution,
          numberOfContributors: ruleSet.numberOfContribution,
          maxTime: ruleSet.maxTime,
          spellChecking: ruleSet.spellChecking,
          scoring: ruleSet.scoring,
          score: ruleSet.scoring ? calculateScore() : 0,
          token: token,
        })
      );

      if (fetchCreateStory.fulfilled.match(actionResult)) {
        navigate("/invitation");
      }
    }
  }

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: { xs: 2, md: 4 },
        marginLeft: { md: 5 },
        marginRight: { md: 5 },
        marginTop: 5,
      }}
    >
      <RouleSetList ruleSet={{ ...ruleSet }} edit={true} />
      <Box
        className={styles.box}
        sx={{ flexGrow: 1, padding: 4, borderRadius: 8 }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="h1"
            sx={{
              marginBottom: 1,
              color: "rgb(12, 23, 79)",
              fontSize: 35,
              marginRight: 3,
            }}
          >
            Skapa berättelse
          </Typography>
        </Box>

        <ImagePicker onSelectImage={handleImageSelect} />

        <TextField
          id="story-title"
          label="Titel"
          value={title}
          onChange={handleInputChangeTitle}
          fullWidth
          multiline
          rows={1}
          variant="outlined"
          placeholder="Titel..."
          aria-labelledby="story-title-label"
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 0.5,
          }}
        />
        <TextField
          id="story-content"
          label="berättelse"
          value={text}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={15}
          variant="outlined"
          placeholder="Skriv din berättelse här..."
          aria-labelledby="story-content-label"
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 0.5,
          }}
        />

        <Box
          sx={{ display: "flex", justifyContent: "flex-end" }}
          className={styles.buttonWrapper}
        >
          <Button
            className={styles.button}
            text={"Spara och publicera"}
            onClick={() => createStory()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateStoryPage;
