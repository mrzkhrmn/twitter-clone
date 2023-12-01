import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getExploreTweets,
  getUserTweets,
  likeOrDislike,
} from "../controllers/tweetController.js";

const router = express.Router();

router.post("/", verifyToken, createTweet);
router.delete("/delete/:id", verifyToken, deleteTweet);
router.put("/like/:id", verifyToken, likeOrDislike);
router.get("/get-all/:id", verifyToken, getAllTweets);
router.get("/get-user/:id", verifyToken, getUserTweets);
router.get("/get-explore", verifyToken, getExploreTweets);

export default router;
