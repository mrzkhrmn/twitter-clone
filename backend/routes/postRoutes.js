import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/all", protectedRoute, getAllPosts);
router.get("/following", protectedRoute, getFollowingPosts);
router.get("/user/:username", protectedRoute, getUserPosts);
router.get("/liked/:id", protectedRoute, getLikedPosts);
router.post("/create", protectedRoute, createPost);
router.post("/comment/:id", protectedRoute, commentOnPost);
router.put("/like/:id", protectedRoute, likeUnlikePost);
router.delete("/delete/:id", protectedRoute, deletePost);

export default router;
