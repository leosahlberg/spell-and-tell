import { Invitation, Story, User } from "../../utils/types";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profilePage.module.scss";
import Button from "../../components/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchGetInvitations } from "../../redux/invitationSlice";
import { fetchStoriesByUserId } from "../../redux/storySlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const [invitation, setInvitation] = useState<Invitation[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState>((state) => state.auth.user) as User;
  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const invitations = useSelector<RootState>(
    (state) => state.invitation.invitations
  ) as Invitation[];
  const storiesByUser = useSelector<RootState>(
    (state) => state.story.storiesByUser
  ) as Story[];

  useEffect(() => {
    dispatch(
      fetchGetInvitations({
        id: user.userId,
        token: token,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchStoriesByUserId({
        userId: user.userId,
        token: token,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (invitations) {
      setInvitation(invitations);
    }
  }, [invitation]);

  useEffect(() => {
    if (storiesByUser) {
      setStories(storiesByUser);
    }
  }, [storiesByUser]);

  function getStoriesCreatedByUser() {
    console.log(stories);
    console.log(user.userId);
    return stories.filter((story) => story.userId._id === user.userId);
  }

  function getStoriesContributedToByUser() {
    return stories.filter((story) =>
      story.contributions.filter((c) => c.userId._id === user.userId)
    );
  }

  return (
    <div className={styles.profilecontainer}>
      <div className={styles.info}>
        <img
          src="/profileimg.jpg"
          width={225}
          height={225}
          alt="Profilbild"
          className={styles.img}
        />
        <h1>{user.name}</h1>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Konto information" {...a11yProps(0)} />
            <Tab label="Inbjudningar" {...a11yProps(1)} />
            <Tab label="Mina bidrag till berättelser" {...a11yProps(2)} />
            <Tab label="Mina skapade berättelser" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className={styles.container}>
            <div className={styles.settings}>
              <h3>Konto information</h3>
              <div className={styles.details}>
                <p>Namn: {user.name}</p>
                <p>Användarnamn: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Lösenord: ******</p>
              </div>
              <Button className={styles.button} text="Redigera" />
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={styles.container}>
            <div className={styles.settings}>
              <h3>Inbjudningar:</h3>
              {invitation?.map((invitation) => {
                return (
                  <div className={styles.invitation}>
                    <>
                      <p>Berättelse: {invitation.storyId?.title}</p>
                      <p>
                        Status:
                        {invitation.status}
                      </p>
                    </>
                    {invitation.status === "pending" ? (
                      <Button className={styles.button} text="Godkänn" />
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className={styles.container}>
            <div className={styles.settings}>
              <h3>
                Antal berättelser du bidragit till:
                {getStoriesContributedToByUser().length} stycken
              </h3>
              {getStoriesContributedToByUser().length > 0 ? (
                getStoriesContributedToByUser().map((story) => {
                  return (
                    <>
                      <Link to={`/story/${story._id}`}>
                        <p className={styles.link}>{story.title}</p>
                      </Link>
                    </>
                  );
                })
              ) : (
                <p>
                  Du har inte bidrag till någon berättelse ännu. När du gjort
                  ett bidrag kommer du att se det här.
                </p>
              )}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className={styles.container}>
            <div className={styles.settings}>
              <h3>
                Antal berättelser du skapat: {getStoriesCreatedByUser().length}
                stycken
              </h3>
              {getStoriesCreatedByUser().length > 0 ? (
                getStoriesCreatedByUser().map((story) => {
                  return (
                    <>
                      <Link to={`/story/${story._id}`}>
                        <p className={styles.link}>{story.title}</p>
                      </Link>
                    </>
                  );
                })
              ) : (
                <p>
                  Du har inte skapat någon berättelse ännu. När du skapat en
                  berättelse kommer du att se det här.
                </p>
              )}
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ProfilePage;
