import CardPublic from "../../components/card/CardPublic";
import bok from "../../assets/bok.jpg";
import styles from "./publicStorysPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Story } from "../../utils/types";
import { fetchPublicStories } from "../../redux/storySlice";
import { useEffect, useState } from "react";

const PublicStorysPage = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState>(
    (state) => state.story.stories
  ) as Story[];
  const token = useSelector<RootState>((state) => state.auth.token) as string;

  useEffect(() => {
    dispatch(fetchPublicStories(token));
  }, [dispatch]);

  useEffect(() => {
    setStories(data);
  }, [data]);

  return (
    <div className={styles.publicstory}>
      {stories.map((story) => (
        <CardPublic imgs={bok} title={story.title} id={story._id} />
      ))}
    </div>
  );
};

export default PublicStorysPage;
