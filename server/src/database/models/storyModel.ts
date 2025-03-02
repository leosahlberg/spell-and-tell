import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
  },
  score: {
    type: Number,
  },
  rouleSetId: {
    type: mongoose.Schema.ObjectId,
    ref: "RouleSet",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  contributions: [
    {
      text: {
        type: String,
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  imgUrl: {
    type: String,
    required: true,
  },
});

export const storyModel = mongoose.model("Story", storySchema);
