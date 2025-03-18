import { Link, useParams } from "react-router-dom";
import styles from "./storyPage.module.scss";
import Button from "../../components/buttons/Button";
import { useEffect, useState } from "react";
import { Story } from "../../utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Typography } from "@mui/material";

const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);

  const stories = useSelector<RootState>(
    (state) => state.story.stories
  ) as Story[];

  useEffect(() => {
    if (id) {
      const selectedStory = stories.find((story) => story._id === id);
      if (selectedStory) {
        setStory(selectedStory);
      }
    }
  }, [id, stories]);

  if (!story) {
    return <Typography variant="h1">Berättelsen hittades inte.</Typography>;
  }

  return (
    <Box className={styles.pageWrapper}>
      <Typography className={styles.storyCard}>
        <Typography
          variant="h2"
          component="h1"
          className={styles.storyTitle}
          sx={{ fontSize: 40 }}
        >
          {story.title}
        </Typography>
        <img
          src={story.imgUrl}
          alt="Story Image"
          className={styles.storyImage}
        />
        <Box className={styles.storyContent}>
          <Typography>Poäng: {story.score}</Typography>

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
                >{`Författare: ${contribution.userId.name}`}</Typography>
              </Box>
            ))}
          </Typography>
        </Box>
        <Box className={styles.link}>
          <Link to={`/contribute/${id}`}>
            <Button
              text="Fortsätt på denna berättelse"
              className={styles.continueButton}
            />
          </Link>
        </Box>
      </Typography>
    </Box>
  );
};

export default StoryPage;
