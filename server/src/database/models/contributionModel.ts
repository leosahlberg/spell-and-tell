import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  words: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
});

export const contributionModel = mongoose.model(
  "Contribution",
  contributionSchema
);
