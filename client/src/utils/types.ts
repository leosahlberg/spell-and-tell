export type User = {
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
  status: "created" | "in progress" | "completed";
  score: Number;
  rouleSet: RouleSet;
  user: User;
};
