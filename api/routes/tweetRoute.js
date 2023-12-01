import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createTweet, deleteTweet } from "../controllers/tweetController.js";

const router = express.Router();

router.post("/", verifyToken, createTweet);
router.delete("/delete/:id", verifyToken, deleteTweet);

export default router;
