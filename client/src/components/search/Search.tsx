import { Box, Typography } from "@mui/material";
import { Story } from "../../utils/types";
import CardPublic from "../card/CardPublic";
import styles from "../search/search.module.scss";
import { isMaxContributionsReached } from "../../utils/helpers";
interface Search {
  filteredStories: Story[];
  searchedName: string;
}

const Search: React.FC<Search> = ({ filteredStories, searchedName }) => {
  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {searchedName && (
        <Typography variant="subtitle1" sx={{ marginBottom: 3, fontSize: 25 }}>
          Berättelser som <strong>{searchedName}</strong> deltagit i 📖
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
      </Box>
    </Box>
  );
};

export default Search;
