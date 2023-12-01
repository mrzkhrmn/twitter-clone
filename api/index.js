import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import tweetRouter from "./routes/tweetRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/tweets", tweetRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
