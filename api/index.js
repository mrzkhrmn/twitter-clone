import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
