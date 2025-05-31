import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  Box,
  List,
  Typography,
  TextField,
  ListItemButton,
  Alert,
} from "@mui/material";
import Button from "../../components/buttons/Button";
import { useState, useEffect } from "react";
import { PublicUser, Story } from "../../utils/types";
import { fetchGetAllUsers } from "../../redux/userSlice";
import { fetchCreateInvitation } from "../../redux/invitationSlice";
import styles from "./inviteUserToContribute.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchPublicStories } from "../../redux/storySlice";
import backgroundImage from "../../assets/bookimg.jpg";

const InviteUserToContribute = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedPerson, setSelectedPerson] = useState<PublicUser | null>(null);
  const [user, setUsers] = useState<PublicUser[] | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [search, setSearch] = useState("");
  const [invitationSent, setInvitationSent] = useState(false);
  const { t } = useTranslation();

  const token = useSelector<RootState>((state) => state.auth.token) as string;

  const stories = useSelector(
    (state: RootState) => state.story.stories
  ) as Story[];
  const userData = useSelector<RootState>((state) => state.user.users) as
    | PublicUser[]
    | null;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      const selectedStory = stories.find((story) => story._id === id);
      if (selectedStory) {
        setStory(selectedStory);
      }
    }
  }, [id, stories]);

  useEffect(() => {
    if (userData) {
      setUsers(userData);
    }
  }, [userData]);

  useEffect(() => {
    dispatch(fetchGetAllUsers({ token }));
    dispatch(fetchPublicStories(token));
  }, [dispatch]);

  async function sendInvitation() {
    if (story && selectedPerson) {
      const actionResult = await dispatch(
        fetchCreateInvitation({
          storyId: story._id,
          userId: selectedPerson.userId,
          token: token,
        })
      );
      if (fetchCreateInvitation.fulfilled.match(actionResult)) {
        setInvitationSent(true);
        setTimeout(() => {
          navigate("/stories");
        }, 500);
      }
    }
  }

  const filteredPeople = user?.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box className={styles.pageWrapper} sx={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      maxHeight: "100%",
      width: "100%",
    }}>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "1px solid rgb(195, 158, 121)",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          width: "90vw",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            sx={{ fontSize: 30, mb: 8, color: "green", mt: 2 }}
          >
            {t("invitation.title")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
            width: "100%",
          }}
        >
          {selectedPerson && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography sx={{ mr: 2 }} component="h2">
                ✅ {t("invitation.selected-person")}{" "}
                <strong>{selectedPerson.name}</strong>
              </Typography>
              <Button text={t("invitation.send")} onClick={sendInvitation} />
            </Box>
          )}
          
          <Box sx={{ ml: "auto" , mr: 1}}>
            <Button
              text={t("invitation.stories")}
              onClick={() => navigate("/stories")}
            />
          </Box>
        </Box>

        {invitationSent && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {t("invitation.sent")} {selectedPerson?.name}!
          </Alert>
        )}
        
        <TextField
          fullWidth
          label="Sök..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2, mt: 4 }}
        />
        <List>
          {filteredPeople?.map((person) => (
            <ListItemButton
              sx={{
                fontSize: 20,
                backgroundColor:
                  selectedPerson?.userId === person.userId
                    ? "rgba(0, 128, 0, 0.1)"
                    : "transparent",
              }}
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
    </Box>
  );
};

export default InviteUserToContribute;
