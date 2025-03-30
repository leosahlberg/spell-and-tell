import CardPublic from "../../components/card/CardPublic";
import styles from "./publicStorysPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Story } from "../../utils/types";
import { fetchDeleteStory, fetchPublicStories } from "../../redux/storySlice";
import { useEffect, useState } from "react";
import { Box, ListItemText, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "../../components/customTabPanel/CustomTabPanel";
import Search from "../../components/search/Search";

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

  const names = ["anna", "pelle", "kalle", "anne"];

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          paddingTop: 10
        }}
      >
        <Box>
          <Search
            items={names}
            renderItem={(name) => <ListItemText primary={name} />}
            placeholder="Sök på författarens namn eller berättelsens titel.."
          />
        </Box>

        <Box
          sx={{
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
            <Tab
              label="Se alla berättelser"
              {...a11yProps(0)}
              sx={{ paddingRight: 5 }}
            />
            <Tab
              label="Läs färdiga berättelser"
              {...a11yProps(1)}
              sx={{ paddingRight: 5 }}
            />
            <Tab label="Fortsätt på berätteser" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Box>
      <CustomTabPanel value={value} index={0}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className={styles.container}>test 3</div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className={styles.container}>test 1</div>
      </CustomTabPanel>
    </>
  );
};

export default PublicStorysPage;
