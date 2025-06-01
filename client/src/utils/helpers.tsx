import { User, Story } from "../utils/types";

export const isMaxContributionsReached = (story: Story) => {
  return story.contributions.length >= story.numberOfContributors;
};

export const hasContributed = (story: Story, currentUser: User | null) => {
  return story?.contributions.some(
    (contribution) => contribution.userId.name === currentUser?.name
  );
};
