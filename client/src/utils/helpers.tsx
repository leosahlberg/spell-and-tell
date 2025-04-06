import { Story } from "../utils/types"; 

export const isMaxContributionsReached = (story: Story) => {
  return story.contributions.length >= story.numberOfContributors;
};
