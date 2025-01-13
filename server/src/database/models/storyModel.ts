import mongoose from "mongoose";
import { contributionModel } from "./contributionModel";

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["created", "in progress", "completed"],
    required: true,
  },
  score: {
    type: Number,
  },
});

export const storyModel = mongoose.model("Story", storySchema);
