import CardPublic from "../../components/card/CardPublic";
import styles from "./publicStorysPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Story } from "../../utils/types";
import { fetchDeleteStory, fetchPublicStories } from "../../redux/storySlice";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Tab, Tabs, Typography } from "@mui/material";
import { CustomTabPanel } from "../../components/customTabPanel/CustomTabPanel";
import { fetchGetAllUsers } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom"; 
import { isMaxContributionsReached } from "../../utils/helpers";

const PublicStorysPage = () => {
  const [stories, setStories] = useState<Story[]>([]); 
  const [searchListItem, setSearchListItem] = useState(""); 
  const [value, setValue] = useState(0); 
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

  const storie = useSelector<RootState>(
    (state) => state.story.stories
  ) as Story[];
  const token = useSelector<RootState>((state) => state.auth.token) as string;

  useEffect(() => {
    dispatch(fetchPublicStories(token)); 
    dispatch(fetchGetAllUsers({ token })); 
  }, [dispatch, token]);

  useEffect(() => {
    setStories(storie);
  }, [storie]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const filterStories = (searchTerm: string): Story[] => {
    if (!searchTerm.trim()) {
      return stories; 
    }
    return stories.filter((story) =>
      story.contributions.some((contrib) =>
        contrib.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSearch = () => {
    const filtered = filterStories(searchListItem); 
    navigate("/search-results", {
      state: {
        filteredStories: filtered,
        searchedName: searchListItem, 
      },
    });
  };

  const handleDelete = async (id: string) => {
    dispatch(fetchDeleteStory({ id, token }));
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          paddingTop: 3,
          backgroundColor: "#F9FBFD",
          paddingBottom: 2,
        }}
      >
        <Box sx={{ paddingRight: 5 }}>
          <p style={{ paddingLeft: 3 }}>Sök på författarens namn 🖋️📚</p>
          <TextField
            label="tex. anna"
            variant="outlined"
            value={searchListItem}
            onChange={(e) => setSearchListItem(e.target.value)} 
            sx={{
              marginBottom: 2,
              marginTop: 2,
              backgroundColor: "white",
              width: 300,
            }}
          />
          <Button
            sx={{ marginLeft: 4, marginTop: 4 }}
            variant="contained"
            color="primary"
            onClick={handleSearch} 
          >
            Sök
          </Button>
        </Box>
        <Box
          sx={{
            paddingTop: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="tabs">
            <Tab tabIndex={0} label="Se alla berättelser" {...a11yProps(0)} />
            <Tab tabIndex={0} label="Läs färdiga berättelser" {...a11yProps(1)} />
            <Tab tabIndex={0} label="Fortsätt på berättelser" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Box>
 
      <CustomTabPanel value={value} index={0}>
        <div className={styles.publicstory} >
          {stories.length > 0 ? (
            stories.map((story) => (
              <CardPublic
                key={story._id}
                imgs={story.imgUrl}
                title={story.title}
                contributions={[...story.contributions]}
                id={story._id}
                onDelete={handleDelete}
              >
                {isMaxContributionsReached(story) && (
                  <Typography
                    variant="h6"
                    color="error"
                    sx={{ paddingTop: 2.5, textAlign: "center", fontSize: 15 }}
                  >
                   Max antal bidrag är uppnått, går ej bidra mer!
                  </Typography>
                )}
                {!isMaxContributionsReached(story) && (
                  <Typography
                    variant="h6"
                    color="success"
                    sx={{ paddingTop: 2, textAlign: "center" }}
                  >
                    Fortsätt på denna berättelse
                  </Typography>
                )}
              </CardPublic>
            ))
          ) : (
            <Typography sx={{ mt: 2, color: "gray", textAlign: "center" }}>
              Inga berättelser hittades.
            </Typography>
          )}
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            color: "rgb(12, 23, 79)",
            paddingBottom: 4,
          }}
        >
          Klicka på den berättelse som du vill läsa!
        </Typography>
        <div className={styles.publicstory}>
          {stories.length > 0 ? (
            stories
              .filter((story) => isMaxContributionsReached(story))
              .map((story) => (
                <CardPublic
                  key={story._id}
                  imgs={story.imgUrl}
                  title={story.title}
                  contributions={[...story.contributions]}
                  id={story._id}
                >
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ paddingTop: 2, textAlign: "center" }}
                  >
                    ( Max antal bidrag är uppnått, går ej bidra mer! )
                  </Typography>
                </CardPublic>
              ))
          ) : (
            <Typography sx={{ mt: 2, color: "gray", textAlign: "center" }}>
              Inga färdiga berättelser hittades.
            </Typography>
          )}
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            color: "rgb(12, 23, 79)",
            paddingBottom: 4,
          }}
        >
          Klicka på den berättelse som du vill fortsätta på!
        </Typography>
        <div className={styles.publicstory}>
          {stories.length > 0 ? (
            stories
              .filter((story) => !isMaxContributionsReached(story)) 
              .map((story) => (
                <CardPublic
                  key={story._id}
                  imgs={story.imgUrl}
                  title={story.title}
                  contributions={[...story.contributions]}
                  id={story._id}
                  onDelete={handleDelete}
                >
                  <Typography
                    variant="body2"
                    color="success"
                    sx={{ paddingTop: 2, textAlign: "center" }}
                  >
                    Fortsätt gärna på denna berättelse.. 🙂
                  </Typography>
                </CardPublic>
              ))
          ) : (
            <Typography sx={{ mt: 2, color: "gray", textAlign: "center" }}>
              Inga berättelser hittades.
            </Typography>
          )}
        </div>
      </CustomTabPanel>
    </>
  );
};

export default PublicStorysPage;
