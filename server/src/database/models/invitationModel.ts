import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
  },
});

export const invitationModel = mongoose.model("Invitation", invitationSchema);
