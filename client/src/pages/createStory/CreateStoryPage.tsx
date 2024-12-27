import { Box, List, ListItem, TextField, Typography } from "@mui/material";
import SixtyFpsSelectIcon from "@mui/icons-material/SixtyFpsSelect";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import ScoreboardTwoToneIcon from "@mui/icons-material/ScoreboardTwoTone";
import SpellcheckTwoToneIcon from "@mui/icons-material/SpellcheckTwoTone";
import ContrastTwoToneIcon from "@mui/icons-material/ContrastTwoTone";
import styles from "./createStoryPage.module.scss";
import Button from "../../components/buttons/Button";

const choose = [
  {
    title: "Antal ord",
    standard: "1000 ord",
    icon: <SixtyFpsSelectIcon />,
    path: "/contribute",
  },
  {
    title: "Max tid",
    standard: "20 min",
    icon: <HourglassTopTwoToneIcon />,
    path: "/createstory",
  },
  {
    title: "Deltagare",
    standard: "2 st",
    icon: <PeopleTwoToneIcon />,
    path: "/contribute",
  },
  {
    title: "Poängräkning",
    standard: "aktiv",
    icon: <ScoreboardTwoToneIcon />,
    path: "/createstory",
  },
  {
    title: "Rättstavning",
    standard: "aktiv",
    icon: <SpellcheckTwoToneIcon />,
    path: "/contribute",
  },
  {
    title: "Tema",
    standrad: "ej aktiv",
    icon: <ContrastTwoToneIcon />,
    path: "/createstory",
  },
];

const CreateStoryPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: 250,
          textAlign: "center",
          flexDirection: "column",
          backgroundColor: "rgb(129, 160, 129)",
          color: "white",
          height: "100vh",
        }}
      >
        <Typography
          sx={{
            paddingBottom: 3,
            paddingTop: 3,
            textDecorationLine: "underline",
          }}
          variant="h5"
        >
          Ändra tillval
        </Typography>
        <List>
          {choose.map((text) => (
            <ListItem
              className={styles.list}
              key={text.title}
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">{text.title}</Typography>
                <Box component="span">{text.icon}</Box>
              </Box>
              <Typography sx={{ paddingBottom: 2, fontStyle: "italic" }}>
                - Standard: {text.standard} -
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1, p: 5 }}>
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: 20,
          }}
        >
          <Button text="Skicka vidare"></Button>
        </div>
      </Box>
    </Box>
  );
};

export default CreateStoryPage;
