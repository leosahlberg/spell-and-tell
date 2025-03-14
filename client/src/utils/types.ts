export type User = {
  userId: string;
  name: string;
  username: string;
  email: string;
};

export type RuleSet = {
  maxNumberOfWordsPerContribution: number;
  numberOfContribution: number;
  maxTime: number;
  scoring: boolean;
  spellChecking: boolean;
};

export type Story = {
  _id: string;
  title: string;
  created: Date;
  score: number;
  rouleSet: RuleSet;
  user: User;
  imgUrl: string;
  contributions: [
    {
      userId: string;
      text: string;
    }
  ];
  ruleSet: {
    maxNumberOfWordsPerCpntribution: number;
    numberOfContribution: number;
    maxTime: number;
    scoring: boolean;
    spellChecking: boolean;
  };
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
  token: string;
};
