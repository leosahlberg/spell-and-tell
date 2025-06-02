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
import { clearCustomRuleSet } from "../../redux/rulesetSlice";
import { useTranslation } from "react-i18next";

const CreateStoryPage = () => {
  const { t } = useTranslation();
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
    public: true,
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
          publicStory: ruleSet.public ? ruleSet.public : true,
          token: token,
        })
      );

      dispatch(clearCustomRuleSet(null));

      if (fetchCreateStory.fulfilled.match(actionResult)) {
        navigate(`/invitation/${actionResult.payload._id}`);
      }
    }
  }

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <div
      style={{
        paddingTop: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: { xs: 2, md: 4 },
          marginLeft: { md: 5 },
          marginRight: { md: 5 },
          marginTop: 1,
        }}
      >
        <RouleSetList ruleSet={{ ...ruleSet }} edit={true} />
        <Box
          className={styles.box}
          sx={{ flexGrow: 1, padding: 4, borderRadius: 8 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              component="h1"
              sx={{
                marginBottom: 1,
                color: "white",
                fontSize: 25,
                marginRight: 3,
              }}
            >
              {t("create.createStory")}
            </Typography>
          </Box>

          <ImagePicker onSelectImage={handleImageSelect} />

          <TextField
            id="story-title"
            label={t("create.title")}
            value={title}
            onChange={handleInputChangeTitle}
            fullWidth
            multiline
            rows={1}
            variant="outlined"
            placeholder={t("create.titlePlaceholder")}
            aria-labelledby="story-title-label"
            sx={{
              marginBottom: 2,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 1,
              padding: 0.5,
            }}
          />
          <Box
            sx={{ p: 0.5, pt: 0.7, backgroundColor: "wheat", borderRadius: 2 }}
          >
            <TextField
              id="story-content"
              label={t("create.story")}
              value={text}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={15}
              variant="outlined"
              placeholder={t("create.storyPlaceholder")}
              aria-labelledby="story-content-label"
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 1,
                padding: 0.5,
              }}
            />
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            className={styles.buttonWrapper}
          >
            <Button text={t("general.save")} onClick={() => createStory()} />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default CreateStoryPage;
