import CardPublic from "../../components/card/CardPublic";
import styles from "./publicStorysPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Story } from "../../utils/types";
import { fetchPublicStories } from "../../redux/storySlice";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Tab, Tabs, Typography } from "@mui/material";
import CustomTabPanel from "../../components/customTabPanel/CustomTabPanel";
import { fetchGetAllUsers } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { isMaxContributionsReached } from "../../utils/helpers";
import { useTranslation } from "react-i18next";

const PublicStorysPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [searchListItem, setSearchListItem] = useState("");
  const [value, setValue] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  // const handleDelete = async (id: string) => {
  //   dispatch(fetchDeleteStory({ id, token }));
  // };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div style={{backgroundColor: "white"}}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          paddingTop: 3,
          backgroundColor: " rgba(160, 207, 293, 0.15)",
          borderBottom: "1px solid  rgba(180, 207, 253, 0.45)",
          paddingBottom: 2,
        }}
      >
        <Box sx={{ paddingRight: 5 }}>
          <p style={{ paddingLeft: 3, color: "#071145", fontSize: 20 }}>
            {t("publicStories.searchLabel")} 🖋️📚
          </p>
          <TextField
            label={t("publicStories.searchPlaceholder")}
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
            sx={{ marginLeft: 4, marginTop: 2, backgroundColor: "rgb(259, 199, 130)",
              padding:2,
              color: "rgb(22, 83, 56)",
              fontWeight: "bold", }}
            onClick={handleSearch}
            className={styles.searchbtn}
          >
            {t("publicStories.searchButton")}
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
            <Tab
            sx={{fontSize: 17, color: "#071145"}}
              tabIndex={0}
              label={t("publicStories.tabAll")}
              {...a11yProps(0)}
            />
            <Tab
             sx={{fontSize: 17, color: "#071145" }}
              tabIndex={0}
              label={t("publicStories.tabCompleted")}
              {...a11yProps(1)}
            />
            <Tab
             sx={{fontSize: 17, color: "#071145"}}
              tabIndex={0}
              label={t("publicStories.tabInProgress")}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div className={styles.publicstory}>
          {stories.length > 0 ? (
            stories.map((story) => (
              <CardPublic
                key={story._id}
                imgs={story.imgUrl}
                title={story.title}
                contributions={[...story.contributions]}
                id={story._id}
               
              >
                {isMaxContributionsReached(story) ? (
                  <Typography
                    variant="h6"
                    color="error"
                    sx={{ pb: 10, pt:2, textAlign: "center", fontSize: 15 }}
                  >
                    {t("publicStories.contributionsMaxed")}
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    color="success"
                    sx={{ pb: 10, pt: 2, textAlign: "center" }}
                  >
                    {t("publicStories.contribute")}
                  </Typography>
                )}
              </CardPublic>
            ))
          ) : (
            <Typography sx={{ mt: 2, color: "gray", textAlign: "center" }}>
              {t("publicStories.notfound")}
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
          {t("publicStories.titleReadStory")}
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
                    sx={{  pb: 10, pt: 2, textAlign: "center" }}
                  >
                    {t("publicStories.contributionsMaxed")}
                  </Typography>
                </CardPublic>
              ))
          ) : (
            <Typography sx={{ mt: 2, color: "gray", textAlign: "center" }}>
              {t("publicStories.notfound")}
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
          {t("publicStories.titleContributeStory")}
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
                >
                  <Typography
                    variant="body2"
                    color="success"
                    sx={{  pb: 10, pt: 2, textAlign: "center" }}
                  >
                    {t("publicStories.contribute")}
                  </Typography>
                </CardPublic>
              ))
          ) : (
            <Typography sx={{ mt: 2, color: "gray", textAlign: "center" }}>
              {t("publicStories.notfound")}
            </Typography>
          )}
        </div>
      </CustomTabPanel>
    </div>
  );
};

export default PublicStorysPage;
