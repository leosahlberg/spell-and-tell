import { Invitation, Story, User } from "../../utils/types";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profilePage.module.scss";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
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
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState>((state) => state.auth.user) as User;
  const token = useSelector<RootState>((state) => state.auth.token) as string;
  const [value, setValue] = useState(0);
  const navigation = useNavigate();

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
            <Tab
              label="Mina bidrag och skapade berättelser"
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className={styles.container}>
            <h3>Konto information</h3>

            <div className={styles.details}>
              <p>Namn: {user.name}</p>
              <p>Användarnamn: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Lösenord: ******</p>
            </div>
            <Button className={styles.button} text="Redigera" />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={styles.container}>
            <div>
              <h3>Inbjudningar:</h3>
              <p>
                Här kan du se berättelser som andra användare bjudit in dig till
                att skriva på. <br />
                <br />
                Tänk på att en inbjudan inte är en garanti på att du kan skriva
                på berättelsen. <br />
                Det finns begränsat antal platser för varje berättelse och en
                inbjudan kan ha skickats till flera personer.
                <br />
                <br /> Det är först till kvarn som gäller!
              </p>
              {invitation?.map((invitation) => {
                return (
                  <div
                    className={styles.settings}
                    onClick={() =>
                      navigation(`/story/${invitation.storyId._id}`)
                    }
                  >
                    <img
                      src={invitation.storyId.imgUrl}
                      alt=""
                      className="rounded-md shadow-md"
                      width={100}
                      height={100}
                    />
                    <p>Titel: {invitation.storyId?.title}</p>
                    <p>
                      Antal platser kvar:{" "}
                      {invitation.storyId.numberOfContributors -
                        invitation.storyId.contributions.length}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className={styles.container}>
            <div>
              <h3>
                Antal berättelser du skapat eller bidragit till: {""}
                {stories.length}
              </h3>
              <p>
                Här kan du se berättelser som du varit med och skrivit på.
                Inklusive de berättelser du själv skapat!
              </p>
              {stories.length > 0 ? (
                stories.map((story) => {
                  return (
                    <div
                      className={styles.settings}
                      onClick={() => navigation(`/story/${story._id}`)}
                    >
                      <img
                        src={story.imgUrl}
                        alt=""
                        className="rounded-md shadow-md"
                        width={100}
                        height={100}
                      />
                      <p>{story.title}</p>
                    </div>
                  );
                })
              ) : (
                <p>
                  Du har inte skapat eller bidragit till någon berättelse ännu.
                  När du gjort det kommer du att se det här.
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
