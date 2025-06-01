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
import { TextField } from "@mui/material";
import CustomTabPanel from "../../components/customTabPanel/CustomTabPanel";
import ImagePicker from "../../components/ImagePicker";
import { fetchUpdateUserProfile } from "../../redux/authSlice";
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
  const [editMode, setEditMode] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState({
    imgUrl: "",
    name: "",
    email: "",
  });
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

  const handleImageSelect = (image: string) => {
    setProfileInfo({ ...profileInfo, imgUrl: image });
  };

  const handleSaveProfileChanges = async () => {
    const actionResult = await dispatch(
      fetchUpdateUserProfile({
        userId: user.userId,
        imgUrl: profileInfo.imgUrl,
        name: profileInfo.name,
        email: profileInfo.email,
      })
    );

    if (fetchUpdateUserProfile.fulfilled.match(actionResult)) {
      setProfileInfo({
        name: "",
        imgUrl: "",
        email: "",
      });
      setEditMode(false);
    }
  };

  return (
    <div className={styles.profilecontainer}>
      <h1 className={styles.title}> {t("profile.accountInfo")}</h1>
      <div className={styles.info}>
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
            <Tab label={t("profile.accountInfo")} {...a11yProps(0)} />
            <Tab label={t("profile.invitations")} {...a11yProps(1)} />

            <Tab
              label={t("profile.myStories")}
              {...a11yProps(2)}
              tabIndex={0}
            />
          </Tabs>
        </Box>
      </div>
      <Box sx={{ width: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          <div className={styles.container}>
            <img
              src={
                user.imgUrl ? user.imgUrl : "/src/assets/profile_default.png"
              }
              width={175}
              height={175}
              alt="Profilbild"
              className={styles.img}
            />
            {/* <h2>{user.name}</h2> */}
            {editMode ? (
              <>
                <h2 className={styles.account}>
                  {t("profile.edit")} {t("profile.accountInfo")}:
                </h2>

                <ImagePicker onSelectImage={handleImageSelect} />
                <div className={styles.details}>
                  <TextField
                    fullWidth
                    label={t("profile.name")}
                    variant="outlined"
                    value={profileInfo.name}
                    onChange={(e) =>
                      setProfileInfo({
                        ...profileInfo,
                        name: e.currentTarget.value,
                      })
                    }
                    sx={{ mb: 2, mt: 2 }}
                  />

                  <TextField
                    fullWidth
                    label={t("profile.email")}
                    variant="outlined"
                    value={profileInfo.email}
                    onChange={(e) =>
                      setProfileInfo({
                        ...profileInfo,
                        email: e.currentTarget.value,
                      })
                    }
                    sx={{ mb: 2, mt: 2 }}
                  />
                </div>
                <div className={styles.btns}>
                  <Button
                    text={t("general.cancel")}
                    onClick={() => {
                      setEditMode(false);
                    }}
                  />
                  <Button
                    text={t("general.save")}
                    onClick={() => {
                      handleSaveProfileChanges();
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.details}>
                  <p>
                    {t("profile.name")}: {user.name}
                  </p>
                  <p>
                    {t("profile.username")}: {user.username}
                  </p>
                  <p>
                    {t("profile.email")}: {user.email}
                  </p>
                  <p>{t("profile.password")}: ******</p>
                </div>
                <Button
                  text={t("profile.edit")}
                  onClick={() => {
                    setProfileInfo({
                      name: user.name,
                      imgUrl: user.imgUrl,
                      email: user.email,
                    });
                    setEditMode(true);
                  }}
                />
              </>
            )}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className={styles.container}>
            <div>
              <h3>{t("profile.invitations")}:</h3>
              <p className={styles.detailsdes}>
                {t("profile.invitationsDescription")}
                <br />
                <br />
                {t("profile.invitationNote")}
                <br />
                <br /> {t("profile.firstCome")}
              </p>
              {invitation?.map((invitation) => {
                return (
                  <>
                    {invitation.storyId != null ||
                    invitation.storyId != undefined ? (
                      <div
                        className={styles.settings}
                        onClick={() =>
                          navigation(`/story/${invitation.storyId._id}`)
                        }
                        key={invitation.storyId._id}
                      >
                        <img
                          src={invitation.storyId.imgUrl}
                          alt=""
                          className="rounded-md shadow-md"
                          width={100}
                          height={100}
                        />
                        <p className={styles.details}>
                          {t("profile.title")}: {invitation.storyId.title}
                        </p>
                        <p className={styles.detailsdes}>
                          {t("profile.spotsLeft")}:{" "}
                          {invitation.storyId.numberOfContributors -
                            invitation.storyId.contributions.length}
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className={styles.container}>
            <div>
              <h3 className={styles.details}>
                {t("profile.storyCount")}: {""}
                {stories.length}
              </h3>
              <p className={styles.detailsdes}>
                {t("profile.myStoriesDescription")}
              </p>
              {stories.length > 0 ? (
                stories.map((story) => {
                  return (
                    <div
                      tabIndex={0}
                      className={styles.settings}
                      onClick={() => navigation(`/story/${story._id}`)}
                      key={story._id}
                    >
                      <img
                        src={story.imgUrl}
                        alt=""
                        className="rounded-md shadow-md"
                        width={100}
                        height={100}
                      />
                      <p className={styles.details}>{story.title}</p>
                    </div>
                  );
                })
              ) : (
                <p>{t("profile.noStories")}</p>
              )}
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ProfilePage;
