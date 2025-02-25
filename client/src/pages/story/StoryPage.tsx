import storyimg from "../../assets/buss.jpg";
import { Link } from "react-router";
import styles from "./storyPage.module.scss";
import Button from "../../components/buttons/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { User } from "../../utils/types";

const StoryPage = () => {
  const user = useSelector<RootState>((state) => state.auth.user) as User;
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.storyCard}>
        <img src={storyimg} alt="Story Image" className={styles.storyImage} />
        <div className={styles.storyContent}>
          <h1 className={styles.storyTitle}>En Fängslande Berättelse</h1>
          <p className={styles.storyText}>
            Det var en gång en liten stad vid havet där människor levde i
            harmoni med naturen. Deras liv var enkla men fyllda med glädje,
            vänskap och äventyr. En dag upptäckte de en mystisk karta som ledde
            dem till ett förlorat skattslott gömt bland bergen...
          </p>
          <p className={styles.storyText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iste
            quod accusantium quos laboriosam dolores cumque nesciunt atque sint!
            Totam soluta voluptates iure fugit, temporibus nam. Minima vel natus
            quia.
          </p>
          <p className={styles.storyText}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat iste
            quod accusantium quos laboriosam dolores cumque nesciunt atque sint!
            Totam soluta voluptates iure fugit, temporibus nam. Minima vel natus
            quia.
          </p>
        </div>
        <div className={styles.link}>
          <div style={{display: "flex", flexDirection: "column"}}>
          <h2 style={{marginBottom: 5, fontSize: 20}}>Huvudförfattare: {user.name}</h2>
          <p style={{fontSize: 20}}> Deltagare: test namn sara</p>
          </div>
          <Link to="/contribute">
            <Button
              text="Fortsätt på denna berättelse"
              className={styles.continueButton}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
