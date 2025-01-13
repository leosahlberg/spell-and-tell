import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rouleSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RouleSet",
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
    
  }]
});

export const storyModel = mongoose.model("Story", storySchema);