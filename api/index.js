import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {})
  .catch((err) => {
    console.error(err);
  });
const app = express();

app.listen(3000, () => {
  console.log("Server is Running on Port 3000");
});

app.use("/api/user", userRouter);
