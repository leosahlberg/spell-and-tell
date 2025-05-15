import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./storyPage.module.scss";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import { Story } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Typography } from "@mui/material";
import logo from "../../assets/logoST2.png";
import { isMaxContributionsReached } from "../../utils/helpers";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTranslation } from "react-i18next";

const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const stories = useSelector<RootState>(
    (state) => state.story.stories
  ) as Story[];

  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/stories");
  };

  const handleKeydown = (e: { key: string }) => {
    if (e.key === "Enter") {
      navigate("/stories");
    }
  };

  useEffect(() => {
    if (id) {
      const selectedStory = stories.find((story) => story._id === id);
      if (selectedStory) {
        setStory(selectedStory);
      }
    }
  }, [id, stories]);

  if (!story) {
    return <Typography variant="h1">{t("story.notfound")}</Typography>;
  }

  const hasContributed = () => {
    return story?.contributions.some(
      (contribution) => contribution.userId._id === currentUser?.userId
    );
  };

  return (
    <>
      <div
        tabIndex={0}
        onClick={handleNavigate}
        onKeyDown={handleKeydown}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 30,
          marginLeft: 30,
          cursor: "pointer",
          width: 50,
        }}
      >
        <ArrowBackIosIcon /> <i style={{ marginTop: 4 }}>{t("story.back")}</i>
      </div>
      <Box className={styles.pageWrapper}>
        <Typography className={styles.storyCard}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: 20,
                color: "whitesmoke",
                marginBottom: 5,
                alignSelf: "flex-start",
                paddingTop: 2,
              }}
            >
              {t("story.score")}: {story.score}
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              className={styles.storyTitle}
              sx={{
                fontSize: 35,
                color: "rgb(12, 23, 79)",
                textAlign: "center",
                width: "100%",
              }}
            >
              {story.title}
            </Typography>
          </Box>
          <img
            src={story.imgUrl}
            alt="Story Image"
            className={styles.storyImage}
          />
          <Box className={styles.storyContent}>
            <Typography sx={{ marginBottom: 12, color: "rgb(12, 23, 79)" }}>
              {story.contributions.map((contribution, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 3, fontSize: 24 }}
                  >
                    {contribution.text}
                  </Typography>
                </Box>
              ))}
            </Typography>

            <Typography>
              <p
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "rgb(12, 23, 79)",
                }}
              >
                {t("story.author")}:
              </p>
              {story.contributions.map((contribution, index) => (
                <Box key={index}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ color: "rgb(12, 23, 79)" }}
                  >{`${contribution.userId.name}`}</Typography>
                </Box>
              ))}
            </Typography>
          </Box>
          <Box className={styles.link}>
            <Typography>
              <img className={styles.img} src={logo} alt={t("story.logo")} />
            </Typography>
            {!isMaxContributionsReached(story) && (
              <Link to={`/contribute/${id}`}>
                <Button
                  text={
                    hasContributed()
                      ? t("story.alreadyContributed")
                      : t("story.contribute")
                  }
                  className={styles.continueButton}
                  disabled={hasContributed()}
                />
              </Link>
            )}
          </Box>
        </Typography>
      </Box>
    </>
  );
};

export default StoryPage;
