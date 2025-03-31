import CardPublic from "../../components/card/CardPublic";
import styles from "./publicStorysPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { PublicUser, Story } from "../../utils/types";
import { fetchDeleteStory, fetchPublicStories } from "../../redux/storySlice";
import { useEffect, useState } from "react";
import { Box, ListItemText, Tab, Tabs } from "@mui/material";
import { CustomTabPanel } from "../../components/customTabPanel/CustomTabPanel";
import Search from "../../components/search/Search";
import { fetchGetAllUsers } from "../../redux/userSlice";

const PublicStorysPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState>((state) => state.story.stories) as Story[];
  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const users = useSelector((state: RootState) => state.user.users) as PublicUser[];
  const [value, setValue] = useState(0);
  const [searchListItem, setSearchListItem] = useState("");

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
    dispatch(fetchGetAllUsers({ token }));
  }, [dispatch, token]);

  useEffect(() => {
    setStories(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    dispatch(fetchDeleteStory({ id, token }));
  };

  const filteredStories =  stories && stories.filter((story) =>
    story.contributions.some((contrib) =>
      contrib.userId.name.toLowerCase().includes(searchListItem.toLowerCase())
    )
  );

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 5,
          backgroundColor: "#fff5e6",
          paddingBottom:5
        }}
      >
         <Box  sx={{paddingRight: 10}}>
          <Search
            items={users && users.map((user) => user.name)} 
            renderItem={(name) => <ListItemText primary={name} />}
            placeholder="förnamn efternamn ex: Anna Andersson"
            onSearch={setSearchListItem} 
          />
        </Box>
         <Box
         sx={{paddingTop: 6}}
        >
          
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Se alla berättelser" {...a11yProps(0)} sx={{  fontSize: 18, marginRight: 5, backgroundColor:"white"}} />
            <Tab label="Läs färdiga berättelser" {...a11yProps(1)} sx={{ marginRight: 5, fontSize: 18, backgroundColor:"white" }} />
            <Tab label="Fortsätt på berättelser" {...a11yProps(2)}sx={{fontSize: 18, backgroundColor:"white"}} />
          </Tabs>
        </Box>
       

       
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div className={styles.publicstory}>
          {filteredStories.map((story) => (
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
