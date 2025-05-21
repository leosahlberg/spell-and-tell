import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  Box,
  List,
  Typography,
  TextField,
  ListItemButton,
  Collapse,
  Alert,
} from "@mui/material";
import Button from "../../components/buttons/Button";
import { useState, useEffect } from "react";
import { PublicUser, Story } from "../../utils/types";
import { fetchGetAllUsers } from "../../redux/userSlice";
import { fetchCreateInvitation } from "../../redux/invitationSlice";
import styles from "./inviteUserToContribute.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InviteUserToContribute = () => {
  const [selectedPerson, setSelectedPerson] = useState<PublicUser | null>(null);
  const [user, setUsers] = useState<PublicUser[] | null>(null);
  const [story, setStory] = useState<Story | null>(null);
  const [search, setSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  const { t } = useTranslation();

  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const storyData = useSelector<RootState>(
    (state) => state.story.created
  ) as Story | null;
  const userData = useSelector<RootState>((state) => state.user.users) as
    | PublicUser[]
    | null;

  const navigate = useNavigate();

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
          userId: selectedPerson._id,
          token: token,
        })
      );
      setInvitationSent(true);
      setTimeout(() => {
        setInvitationSent(false);
        setSelectedPerson(null);
      }, 3000);
    }
  }

  const filteredPeople = user?.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box className={styles.pageWrapper}>
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "1px solid rgb(195, 158, 121)",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
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
            variant="h1"
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
          }}
        >
          <Button
            text={
              searchVisible
                ? t("invitation.hide-search")
                : t("invitation.select-person")
            }
            onClick={() => setSearchVisible((prev) => !prev)}
            className={styles.button}
          />

          <Box>
            <Button
              text={t("invitation.stories")}
              onClick={() => navigate(`/stories`)}
              className={styles.button}
            />
          </Box>
        </Box>
        <Box>
          {selectedPerson && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Typography sx={{ mt: 4, ml: 2 }}>
                ✅ {t("invitation.selected-person")}
                <strong>{selectedPerson.name}</strong>
              </Typography>
              <Button
                text={t("invitation.send")}
                onClick={sendInvitation}
                className={styles.button}
              ></Button>
            </Box>
          )}
        </Box>

        {invitationSent && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {t("invitation.sent")} {selectedPerson?.name}!
          </Alert>
        )}

        <Collapse in={searchVisible}>
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
                key={person._id}
                onClick={() => {
                  setSelectedPerson(person);
                }}
              >
                {person.name}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </Box>
    </Box>
  );
};

export default InviteUserToContribute;
