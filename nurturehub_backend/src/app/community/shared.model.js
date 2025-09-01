import mongoose from "mongoose";

const sharedSchema = new mongoose.Schema(
  {
    
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "shared",
  }
);

export const Shared = mongoose.model("Shared", sharedSchema);
