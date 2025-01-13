import mongoose from "mongoose";

const rouleSetSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
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
