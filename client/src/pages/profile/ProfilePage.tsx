import { Story, User } from "../../utils/types";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profilePage.module.scss";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState>((state) => state.auth.user) as User;
  const stories = useSelector<RootState>(
    (state) => state.story.stories
  ) as Story[];

  const handleStoriesCount = () => {
    let count = 0;
    stories.forEach((story) => {
      const contributed = story.contributions.some(
        (contribution) => contribution.userId.userId === user.userId
      );
      if (contributed) {
        count++;
      }
    });
    return count;
  };

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
        <div className={styles.details}>
          <h1>{user.name}</h1>
          <p>Användarnamn: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.activity}>
          <i>
            Antal berättelser du bidragit till: {handleStoriesCount()} stycken
          </i>
        </div>

        <div className={styles.settings}>
          <h2 className={styles.submenu}>Inställningar</h2>
          <Button className={styles.button} text="Redigera profil" />
          <Button className={styles.button} text="Byt lösenord" />
          <Button className={styles.button} text="Sekretessinställningar" />
        </div>

        <div className={styles.footer}>
          <Button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            className={styles.button}
            text="Logga ut"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
