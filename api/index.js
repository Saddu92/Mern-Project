import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected To DB!");
  })
  .catch((err) => {
    console.error(err);
  });
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is Running on Port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//middleware
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});