import { Box, Typography } from "@mui/material";
import { Story } from "../../utils/types";
import CardPublic from "../card/CardPublic";
import styles from "../search/search.module.scss";
import { isMaxContributionsReached } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTranslation } from "react-i18next";

type SearchProps = {
  filteredStories: Story[];
  searchedName: string;
};

const Search = ({ filteredStories, searchedName }: SearchProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = () => {
    navigate("/stories");
  };
  return (
    <>
      <div
        tabIndex={0}
        onClick={handleNavigate}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 30,
          marginLeft: 30,
          cursor: "pointer",
          width: 50,
        }}
      >
        <ArrowBackIosIcon /> <i style={{ marginTop: 4 }}>tillbaka</i>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {searchedName && (
          <Typography
            variant="subtitle1"
            sx={{ marginBottom: 3, fontSize: 25 }}
          >
            {t("search.subtitle1")} <strong>{searchedName}</strong>{" "}
            {t("search.subtitle2")} 📖
          </Typography>
        )}

        <Box className={styles.search}>
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
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
                    sx={{ paddingTop: 2.5, textAlign: "center", fontSize: 15 }}
                  >
                    {t("publicStories.contributionsMaxed")}
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    color="success"
                    sx={{ paddingTop: 2, textAlign: "center" }}
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
        </Box>
      </Box>
    </>
  );
};

export default Search;
