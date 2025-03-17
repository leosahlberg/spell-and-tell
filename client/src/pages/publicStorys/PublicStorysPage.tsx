import CardPublic from "../../components/card/CardPublic";
import styles from "./publicStorysPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Story } from "../../utils/types";
import { fetchDeleteStory, fetchPublicStories } from "../../redux/storySlice";
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
  }, [dispatch, token]);

  useEffect(() => {
    setStories(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    dispatch(fetchDeleteStory({ id, token }));
  };

  return (
    <div className={styles.publicstory}>
      {stories.map((story) => (
        <CardPublic
          key={story._id}
          imgs={story.imgUrl}
          title={story.title}
          contributions={[...story.contributions]}
          id={story._id}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default PublicStorysPage;
