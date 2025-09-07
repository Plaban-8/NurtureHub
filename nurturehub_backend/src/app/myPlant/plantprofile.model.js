import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  species: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  waterLogged: [{ type: Date }],
});

export const Plant = mongoose.model("Plant", plantSchema);
