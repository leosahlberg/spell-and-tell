import CardPublic from "../../components/card/CardPublic";
import bok from "../../assets/bok.jpg";
import groda from "../../assets/groda.jpg";
import buss from "../../assets/buss.jpg";
import pyramid from "../../assets/pyramid.jpg";
import sagolandet from "../../assets/sagolandet.jpg";
import tunnel from "../../assets/tunnel.jpg";
import styles from "./publicStorysPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Story } from "../../utils/types";
import { fetchPublicStories } from "../../redux/storySlice";
import { useEffect, useState } from "react";

const PublicStorysPage = () => {
  const [stories, setStories0] = useState<Story[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector<RootState>(
    (state) => state.story.stories
  ) as Story[];
  const token = useSelector<RootState>((state) => state.auth.token) as string;

  useEffect(() => {
    dispatch(fetchPublicStories(token));
  }, [dispatch]);

  useEffect(() => {
    setStories0(data);
    console.log(stories);
    console.log(token);
  }, [setStories0]);

  return (
    <div className={styles.publicstory}>
      {stories.map((story) => (
        <CardPublic imgs={bok} title={story.title} id={story._id} />
      ))}
    </div>
  );
};

export default PublicStorysPage;
