import { User } from "../../utils/types";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import styles from "./profilePage.module.scss";
import Button from "../../components/buttons/Button";
import { Link } from "react-router";

const ProfilePage = () => {
  const user = useSelector<RootState>((state) => state.auth.user) as User;
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
          <h2>{user.name}</h2>
          <p>Användarnamn: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.activity}>
          <i>Antal berättelser du bidragit till: 3 stycken </i>
        </div>

        <div className={styles.settings}>
          <h3>Inställningar</h3>
          <Button className={styles.button} text="Redigera profil" />
          <Button className={styles.button} text="Byt lösenord" />
          <Button className={styles.button} text="Sekretessinställningar" />
        </div>

        <div className={styles.footer}>
          <Link to="/login">
            <Button className={styles.button} text="Logga ut" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
