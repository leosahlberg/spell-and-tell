export type User = {
  userId: string;
  name: string;
  username: string;
  email: string;
};

export type PublicUser = {
  userId: string;
  name: string;
};

export type RuleSet = {
  maxNumberOfWordsPerContribution: number;
  numberOfContribution: number;
  maxTime: number;
  scoring: boolean;
  spellChecking: boolean;
  public?: boolean;
};

export type Story = {
  _id: string;
  title: string;
  created: Date;
  score: number;
  rouleSet: RuleSet;
  user: PublicUser;
  imgUrl: string;
  contributions: { userId: PublicUser; text: string; _id: string }[]
  maxNumberOfWordsPerContribution: number;
  numberOfContributors: number;
  maxTime: number;
  scoring: boolean;
  spellChecking: boolean;
};

export type CreateStory = {
  title: string;
  id: string;
  imgUrl: string;
  text: string;
  maxNumberOfWordsPerContribution: number;
  numberOfContributors: number;
  maxTime: number;
  scoring: boolean;
  spellChecking: boolean;
  score: number;
  publicStory: boolean;
  token: string;
};

export type CreateInvitation = {
  storyId: string;
  userId: string;
  token: string;
};

export type Invitation = {
  storyId: string;
  userId: string;
  status: "pending" | "accepted";
};
