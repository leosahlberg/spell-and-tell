import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./storyPage.module.scss";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import { Story } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Typography } from "@mui/material";
import logo from "../../assets/logoST2.png";
import { isMaxContributionsReached, hasContributed } from "../../utils/helpers";
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

  return (
    <>
      <div
        role="button"
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
        <section className={styles.storyCard}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: 15,
                color: "whitesmoke",
                marginBottom: 3,
                alignSelf: "flex-start",
              }}
            >
              {t("story.score")}: {story.score}
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              className={styles.storyTitle}
              sx={{
                fontSize: 30,
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
            {story.contributions.map((contribution) => (
              <Box key={contribution._id} sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ fontSize: 22, marginTop: 3, color: "rgb(12, 23, 79)" }}
                >
                  {contribution.text}
                </Typography>
              </Box>
            ))}
            
            <Box sx={{ marginTop: 5 }}>
              <Typography variant="h6" sx={{ color: "rgb(12, 23, 79)" }}>
                {t("story.author")}:
              </Typography>
              <ul style={{ paddingLeft: 20 }}>
                {story.contributions.map((contribution) => (
                  <li key={contribution._id}>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgb(12, 23, 79)", fontSize: 18 }}
                    >
                      {contribution.userId.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>

          <Box className={styles.link}>
            <Typography>
              <img className={styles.img} src={logo} alt={t("story.logo")} />
            </Typography>
            {isMaxContributionsReached(story) ? (
              <Typography
                variant="h6"
                color="error"
                sx={{ pb: 10, pt: 2, textAlign: "center", fontSize: 18 }}
              >
                {t("publicStories.contributionsMaxed")}
              </Typography>
            ) : (
              <>
                {hasContributed(story, currentUser) ? (
                  <Typography
                    variant="h6"
                    color="error"
                    sx={{ pb: 10, pt: 2, textAlign: "center", fontSize: 18 }}
                  >
                    {t("story.alreadyContributed")}
                  </Typography>
                ) : (
                  <Link to={`/contribute/${id}`}>
                    <Button text={t("story.contribute")} />
                  </Link>
                )}
              </>
            )}
          </Box>
        </section>
      </Box>
    </>
  );
};

export default StoryPage;
