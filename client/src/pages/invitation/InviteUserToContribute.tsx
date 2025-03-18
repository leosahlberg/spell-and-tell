import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  Box,
  List,
  Typography,
  TextField,
  ListItemButton,
} from "@mui/material";
import Button from "../../components/buttons/Button";
import { useState, useEffect } from "react";
import { PublicUser, Story } from "../../utils/types";
import { fetchGetAllUsers } from "../../redux/userSlice";
import { fetchCreateInvitation } from "../../redux/invitationSlice";
import styles from "./inviteUserToContribute.module.scss";

const InviteUserToContribute = () => {
  const [selectedPerson, setSelectedPerson] = useState<PublicUser | null>(null);
  const [user, setUsers] = useState<PublicUser[] | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [search, setSearch] = useState("");

  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const storyData = useSelector<RootState>(
    (state) => state.story.created
  ) as Story | null;

  const userData = useSelector<RootState>((state) => state.user.users) as
    | PublicUser[]
    | null;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (storyData) {
      setStory(storyData);
    }
  }, [storyData]);

  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData]);

  useEffect(() => {
    dispatch(fetchGetAllUsers({ token: token }));
  }, [storyData]);

  function sendInvitation() {
    if (story && selectedPerson) {
      dispatch(
        fetchCreateInvitation({
          storyId: story._id,
          userId: selectedPerson.userId,
          token: token,
        })
      );
    }
  }
  const filteredPeople = user?.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "1px solid rgb(195, 158, 121)",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <h2>
          Skicka inbjudan till en användare att bidra till din berättelse:{" "}
          {`${story?.title}`}
        </h2>

        <p>
          Vald person: {selectedPerson ? selectedPerson.name : "Ingen vald"}
        </p>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ mt: 4, fontSize: 25 }} variant="h1">
            Välj en person
          </Typography>
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
          {filteredPeople?.map((person) => (
            <ListItemButton
              sx={{ fontSize: 20 }}
              key={person.userId}
              onClick={() => {
                setSelectedPerson(person);
              }}
            >
              {person.name}
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Button
        text={`Skicka inbjudan till ${selectedPerson?.name}`}
        onClick={sendInvitation}
        className={styles.button}
      ></Button>
    </div>
  );
};

export default InviteUserToContribute;
