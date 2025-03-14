import {
  Box,
  List,
  Typography,
  TextField,
  Modal,
  ListItemButton,
} from "@mui/material";
import Button from "../../components/buttons/Button";
import { useState, useEffect } from "react";
import styles from "./createStoryPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCreateStory } from "../../redux/storySlice";
import ImagePicker from "../../components/ImagePicker";
import { RuleSet } from "../../utils/types";
import RouleSetList from "../../components/rouleSet/ruleSetList";

const people = [
  "Alice Andersson",
  "Bob Bergström",
  "Charlie Claesson",
  "David Dahl",
  "Emma Eriksson",
];

const CreateStoryPage = () => {
  const [started, setStarted] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ruleSet, setRuleSet] = useState<RuleSet>({
    maxNumberOfWordsPerContribution: 1000,
    numberOfContribution: 2,
    maxTime: 60,
    spellChecking: false,
    scoring: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector<RootState>(
    (state) => state.auth.user?.userId
  ) as string;
  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const ruleSetData = useSelector<RootState>(
    (state) => state.ruleSet.ruleSet
  ) as RuleSet | null;

  useEffect(() => {
    if (ruleSetData != null) {
      setRuleSet(ruleSetData);
    }
  }, [ruleSetData]);

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
          maxNumberOfWordsPerContribution:
            ruleSet.maxNumberOfWordsPerContribution,
          numberOfContributors: ruleSet.numberOfContribution,
          maxTime: ruleSet.maxTime,
          spellChecking: ruleSet.spellChecking,
          scoring: ruleSet.scoring,
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
      <RouleSetList ruleSet={{ ...ruleSet }} edit={true} />
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
            Skapa berättelse
          </Typography>
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
            text={"Spara och publicera"}
            onClick={() => createStory()}
          />
          <Button
            className={styles.button}
            text={
              selectedPerson
                ? `Skicka till: ${selectedPerson}`
                : "Spara och skicka vidare"
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
