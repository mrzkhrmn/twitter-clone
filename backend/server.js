import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/authRotes.js";
import userRouter from "./routes/userRoutes.js";
import { connectDatabase } from "./db/connectDatabase.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
  connectDatabase();
});
