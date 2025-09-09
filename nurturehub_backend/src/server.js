import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { controller } from "./app/controller.js";

const app = express();
const uri = process.env.URI;

app.use(express.json({ limit: "5mb" }));
app.use(cors());

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => console.error("❌ Connection error:", err));

controller(app);
const PORT = /*process.env.PORT ||*/ 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
