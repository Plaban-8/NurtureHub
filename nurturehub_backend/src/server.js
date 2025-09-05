import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { controller } from "./app/controller.js";

const app = express();

// MongoDB connection string from .env
const uri = process.env.URI;

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(cors());

// MongoDB connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => console.error("❌ Connection error:", err));

// Routes / Controllers
controller(app);

// Port setup (important for deployment)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
