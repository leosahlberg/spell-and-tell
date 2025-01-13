import mongoose from "mongoose";

const rouleSetSchema = new mongoose.Schema({
  maxNumberOfWords: {
    type: String,
  },
  numberOfContributors: {
    type: Number,
  },
  assignedContributors: [{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  }],
  scoring: {
    type: Boolean
  },
  spellChecking: {
    type: Boolean
  }

});

export const rouleSetModel = mongoose.model("RouleSet", rouleSetSchema);