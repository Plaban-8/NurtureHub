import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      lowercase: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
  { colleciton: "community" }
);

export const Community = mongoose.model("Community", communitySchema);
