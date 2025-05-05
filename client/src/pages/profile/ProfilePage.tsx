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
import { CustomTabPanel } from "../../components/customTabPanel/CustomTabPanel";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(); 

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

            <Tab label= {t("profile.accountInfo")} {...a11yProps(0)} />
            <Tab label= {t("profile.invitations")} {...a11yProps(1)} />

            <Tab
              label={t("profile.myStories")}
              {...a11yProps(2)}
              tabIndex={0}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className={styles.container}>
            <h3>  {t("profile.accountInfo")}</h3>

            <div className={styles.details}>
              <p>{t("profile.name")}: {user.name}</p>
              <p>{t("profile.username")}: {user.username}</p>
              <p>{t("profile.email")}: {user.email}</p>
              <p>{t("profile.password")}: ******</p>
            </div>
            <Button className={styles.button} text={t("profile.edit")} />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={styles.container}>
            <div>
              <h3>{t("profile.invitations")}:</h3>
              <p>
              {t("profile.invitationsDescription")}
             <br />
                <br />
                {t("profile.invitationNote")}
                <br />
                <br /> {t("profile.firstCome")}
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
                    <p>{t("profile.title")}: {invitation.storyId?.title}</p>
                    <p>
                    {t("profile.spotsLeft")}:{" "}
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
              {t("profile.storyCount")}: {""}
                {stories.length}
              </h3>
              <p>
              {t("profile.myStoriesDescription")}
              </p>
              {stories.length > 0 ? (
                stories.map((story) => {
                  return (
                    <div
                      tabIndex={0}
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
                 {t("profile.noStories")}
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
