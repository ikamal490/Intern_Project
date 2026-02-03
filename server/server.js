import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();          // ✅ MUST be before connectDB()
connectDB();              // ✅ now MONGO_URI exists

const app = express();

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
