import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import SixtyFpsSelectIcon from "@mui/icons-material/SixtyFpsSelect";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import ScoreboardTwoToneIcon from "@mui/icons-material/ScoreboardTwoTone";
import SpellcheckTwoToneIcon from "@mui/icons-material/SpellcheckTwoTone";
import ContrastTwoToneIcon from "@mui/icons-material/ContrastTwoTone";
import styles from "./createStoryPage.module.scss";

const choose = [
  { title: "Antal ord", icon: <SixtyFpsSelectIcon />, path: "/contribute" },
  {
    title: "Max tid",
    icon: <HourglassTopTwoToneIcon />,
    path: "/createstory",
  },
  { title: "Deltagare", icon: <PeopleTwoToneIcon />, path: "/contribute" },
  {
    title: "Poängräkning",
    icon: <ScoreboardTwoToneIcon />,
    path: "/createstory",
  },
  {
    title: "Rättstavning",
    icon: <SpellcheckTwoToneIcon />,
    path: "/contribute",
  },
  {
    title: "Tema",
    icon: <ContrastTwoToneIcon />,
    path: "/createstory",
  },
];

const CreateStoryPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          padding: 5,
          width: 250,
          textAlign: "center",
          flexDirection: "column",
          backgroundColor: "rgb(225, 174, 112)",
          color: "white",
          height: "100vh",
        }}
      >
        <Typography
          sx={{ paddingBottom: 5, textDecorationLine: "underline" }}
          variant="h5"
        >
          Välj tillval
        </Typography>
        <List>
          {choose.map((text) => (
            <ListItem className={styles.list} key={text.title}>
              <ListItemText primary={text.title} sx={{paddingBottom: 1 , paddingTop: 1, fontSize: "1.rem", fontWeight: "bold"}} />
              <Box component="span" sx={{ marginLeft: "auto", paddingBottom: 1, paddingTop: 1 }}>
                {text.icon}
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Skriv en berättelse
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={15}
          variant="outlined"
          placeholder="Skriv din berättelse här..."
          sx={{
            marginBottom: 2,
          }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary">
            Spara berättelse
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default CreateStoryPage;
