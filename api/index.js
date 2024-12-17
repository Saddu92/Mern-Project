import express from 'express';
import mongoose from 'mongoose';
import dotenv from'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>{  // mongo me agar @ pass mein rahega to uski cencoding likhne ka jaise mere mein %40 tha
    console.log("Connected to DB");
}).catch((err)=>{
    console.error(err);
});
const app= express();

app.listen(3000, ()=>{
    console.log("Server is Running on Port 3000");
});