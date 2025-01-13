import mongoose from "mongoose";

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
  rouleSetId: {
    type: mongoose.Schema.ObjectId,
    ref: "RouleSet",
  },
});

export const storyModel = mongoose.model("Story", storySchema);
