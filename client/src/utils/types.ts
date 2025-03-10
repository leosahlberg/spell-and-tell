export type User = {
  userId: string;
  name: string;
  username: string;
  email: string;
};

export type RouleSet = {
  maxNumberOfWordsPerCpntribution: number;
  numberOfContribution: number;
  maxTime: number;
  scoring: boolean;
  spellChecking: boolean;
  type: "default" | "custom";
};

export type Story = {
  _id: string;
  title: string;
  created: Date;
  score: number;
  rouleSet: RouleSet;
  user: User;
  imgUrl: string;
  contributions: [
    {
      userId: string;
      text: string;
    }
  ];
};
