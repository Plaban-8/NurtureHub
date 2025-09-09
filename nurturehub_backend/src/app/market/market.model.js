import mongoose from "mongoose";

const marketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    photo: {
      type: String,
      default: "https://placehold.co/600x400.png",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, collection: "markets" }
);

export const Market = mongoose.model("Market", marketSchema);
