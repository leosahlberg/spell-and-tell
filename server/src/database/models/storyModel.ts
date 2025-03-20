import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    default: 0,
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
  maxNumberOfWordsPerContribution: {
    type: Number,
    required: true,
  },
  numberOfContributors: {
    type: Number,
    required: true,
  },
  maxTime: {
    type: Number,
    required: true,
  },
  scoring: {
    type: Boolean,
    required: true,
  },
  spellChecking: {
    type: Boolean,
    required: true,
  },
  public: {
    type: Boolean,
    required: true,
  },
});

export const storyModel = mongoose.model("Story", storySchema);
