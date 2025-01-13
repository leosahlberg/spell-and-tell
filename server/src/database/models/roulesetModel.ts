import mongoose from "mongoose";

const rouleSetSchema = new mongoose.Schema({
  maxNumberOfWordsPerContribution: {
    type: String,
  },
  numberOfContributors: {
    type: Number,
  },
  scoring: {
    type: Boolean,
  },
  spellChecking: {
    type: Boolean,
  },
});

export const rouleSetModel = mongoose.model("RouleSet", rouleSetSchema);
