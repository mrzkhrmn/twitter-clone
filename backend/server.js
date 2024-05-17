import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/authRotes.js";
import { connectDatabase } from "./db/connectDatabase.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
  connectDatabase();
});
