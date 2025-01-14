import mongoose from "mongoose";

const rouleSetSchema = new mongoose.Schema({
  maxNumberOfWordsPerContribution: {
    type: Number,
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
  type: {
    type: String,
    enum: ["default", "custom"]
  }
});

export const rouleSetModel = mongoose.model("RouleSet", rouleSetSchema);
