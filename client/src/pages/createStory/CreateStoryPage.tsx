import {
  Box,
  List,
  ListItem,
  Typography,
  TextField,
  Modal,
  ListItemButton,
} from "@mui/material";
import SixtyFpsSelectIcon from "@mui/icons-material/SixtyFpsSelect";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import PeopleTwoToneIcon from "@mui/icons-material/PeopleTwoTone";
import ScoreboardTwoToneIcon from "@mui/icons-material/ScoreboardTwoTone";
import SpellcheckTwoToneIcon from "@mui/icons-material/SpellcheckTwoTone";
import ContrastTwoToneIcon from "@mui/icons-material/ContrastTwoTone";
import Button from "../../components/buttons/Button";
import ButtonTimer from "../../components/buttons/ButtonTimer";
import { useState, useEffect } from "react";
import styles from "./createStoryPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCreateStory } from "../../redux/storySlice";
import ImagePicker from "../../components/ImagePicker";

const chooseFromMenu = [
  { title: "Antal ord", standard: "1000 ord", icon: <SixtyFpsSelectIcon /> },
  { title: "Max tid", standard: "20 min", icon: <HourglassTopTwoToneIcon /> },
  { title: "Deltagare", standard: "2 st", icon: <PeopleTwoToneIcon /> },
  { title: "Poängräkning", standard: "aktiv", icon: <ScoreboardTwoToneIcon /> },
  { title: "Rättstavning", standard: "aktiv", icon: <SpellcheckTwoToneIcon /> },
  { title: "Tema", standard: "ej aktiv", icon: <ContrastTwoToneIcon /> },
];

const people = [
  "Alice Andersson",
  "Bob Bergström",
  "Charlie Claesson",
  "David Dahl",
  "Emma Eriksson",
];

const CreateStoryPage = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [okWriting, setOkWriting] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector<RootState>(
    (state) => state.auth.user?.userId
  ) as string;
  const token = useSelector<RootState>((state) => state.auth.token) as string;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setOkWriting(false);
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 120 ? "0" : ""}${secs}`;
  };

  const handleInputChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!started) {
      setStarted(true);
    }
    setText(e.target.value);
  };

  const filteredPeople = people.filter((person) =>
    person.toLowerCase().includes(search.toLowerCase())
  );

  function createStory() {
    if (userId && token) {
      dispatch(
        fetchCreateStory({
          title: title,
          id: userId,
          imgUrl: selectedImage || "test",
          text: text,
          token: token,
        })
      );
    }
  }

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: { xs: 2, md: 4 },
        marginLeft: { md: 5 },
        marginRight: { md: 5 },
        marginTop: 5,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: 300 },
          marginRight: { md: 4 },
          border: "2px solid  rgb(212, 202, 187)",
          color: "rgb(12, 23, 79)",
          padding: 4,
          borderRadius: 8,
          boxShadow: 2,
          marginBottom: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h1" sx={{ marginBottom: 3, fontSize: 30 }}>
          Ändra tillval
        </Typography>

        <List sx={{ padding: 0 }}>
          {chooseFromMenu.map((item) => (
            <ListItem key={item.title} className={styles.list}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography className={styles.title}>{item.title}</Typography>
                <Box sx={{ color: "rgb(12, 23, 79)" }}>{item.icon}</Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box
        className={styles.box}
        sx={{ flexGrow: 1, padding: 4, borderRadius: 8 }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography
            variant="h1"
            sx={{
              marginBottom: 1,
              color: "rgb(12, 23, 79)",
              fontSize: 35,
              marginRight: 3,
            }}
          >
            Skriv din berättelse
          </Typography>
          <ButtonTimer text="Starta" onClick={() => setStarted(true)} />
        </Box>

        <Box sx={{ marginBottom: 5, display: "flex", flexDirection: "row" }}>
          {started ? (
            <Typography variant="h2">
              {timeLeft > 0 ? (
                <>
                  <Typography variant="h3" color="rgb(238, 185, 121)" sx={{fontSize: 22}}>
                    Tid: {formatTime(timeLeft)}
                  </Typography>
                </>
              ) : (
                <Typography variant="h3" color="red" sx={{fontSize: 22}}>
                  Tiden är tyvärr slut!
                </Typography>
              )}
            </Typography>
          ) : null}
        </Box>

        <ImagePicker onSelectImage={handleImageSelect} />

        <TextField
          id="story-title"
          label="Titel"
          value={title}
          onChange={handleInputChangeTitle}
          fullWidth
          multiline
          rows={1}
          disabled={!okWriting}
          variant="outlined"
          placeholder="Titel..."
          aria-labelledby="story-title-label"
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 0.5,
          }}
        />
        <TextField
          id="story-content"
          label="berättelse"
          value={text}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={15}
          disabled={!okWriting}
          variant="outlined"
          placeholder="Skriv din berättelse här..."
          aria-labelledby="story-content-label"
          sx={{
            marginBottom: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 1,
            padding: 0.5,
          }}
        />

        <Box
          sx={{ display: "flex", justifyContent: "flex-end" }}
          className={styles.buttonWrapper}
        >
          <Button
            className={styles.button}
            text={"Spara"}
            onClick={() => createStory()}
          />
          <Button
            className={styles.button}
            text={
              selectedPerson
                ? `Skicka till: ${selectedPerson}`
                : "Välj person att skicka till"
            }
            onClick={() => setOpenModal(true)}
          />
        </Box>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 600,
              bgcolor: "background.paper",
              border: "1px solid rgb(195, 158, 121)",
              p: 3,
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ mt: 4, fontSize: 25 }} variant="h1">
                Välj en person
              </Typography>
              <Button
                className={styles.button}
                text="X"
                onClick={() => setOpenModal(false)}
              />
            </Box>
            <TextField
              fullWidth
              label="Sök..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2, mt: 2 }}
            />
            <List>
              {filteredPeople.map((person) => (
                <ListItemButton
                  sx={{ fontSize: 20 }}
                  key={person}
                  onClick={() => {
                    setSelectedPerson(person);
                    setOpenModal(false);
                  }}
                >
                  {person}
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default CreateStoryPage;
