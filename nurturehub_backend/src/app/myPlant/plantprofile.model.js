import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,   
    },
},
  { timestamps: true },
  { colleciton: "users" }
);

export const Plant = mongoose.model("Plant", plantSchema);
