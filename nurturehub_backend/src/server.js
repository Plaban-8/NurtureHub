import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import { controller } from "./app/controller.js";
import cors from "cors";

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

app.listen(4000);
