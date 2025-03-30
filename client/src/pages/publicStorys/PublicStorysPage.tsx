import CardPublic from "../../components/card/CardPublic";
import styles from "./publicStorysPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Story } from "../../utils/types";
import { fetchDeleteStory, fetchPublicStories } from "../../redux/storySlice";
import { useEffect, useState } from "react";
import { CustomTabPanel } from "../../components/customTabs/CustomTabs";
import { Box, Tab, Tabs } from "@mui/material";

const PublicStorysPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState>(
    (state) => state.story.stories
  ) as Story[];
  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    dispatch(fetchPublicStories(token));
  }, [dispatch, token]);

  useEffect(() => {
    setStories(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    dispatch(fetchDeleteStory({ id, token }));
  };

  return (
    <>
      <Box sx={{ width: "100%%" }}>
        <Box
          sx={{
            paddingTop: 5,
            paddingRight: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Alla berättelser" {...a11yProps(0)} />
            <Tab label="Läsa färdiga berättelser" {...a11yProps(1)} />
            <Tab label="Fortsätta på berätteser" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className={styles.container}>test4</div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={styles.container}>test 3</div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className={styles.container}>test 1</div>
        </CustomTabPanel>
      </Box>
      <div className={styles.publicstory}>
        {stories.map((story) => (
          <CardPublic
            key={story._id}
            imgs={story.imgUrl}
            title={story.title}
            contributions={[...story.contributions]}
            id={story._id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default PublicStorysPage;
