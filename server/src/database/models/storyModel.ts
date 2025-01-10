import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contributors: [{
    type: String,
    
  }]
});

export const storyModel = mongoose.model("Story", storySchema);