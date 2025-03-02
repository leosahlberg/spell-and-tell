export type User = {
  userId: string;
  name: string;
  username: string;
  email: string;
};

export type RouleSet = {
  maxNumberOfWordsPerCpntribution: Number;
  numberOfContribution: Number;
  maxTime: Number;
  scoring: Boolean;
  spellChecking: Boolean;
  type: "default" | "custom";
};

export type Story = {
  _id: string;
  title: string;
  created: Date;
  score: Number;
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
