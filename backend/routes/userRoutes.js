import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import {
  followUnfollowUser,
  getSuggestedUser,
  getUserProfile,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:username", protectedRoute, getUserProfile);
router.get("/suggested", protectedRoute, getSuggestedUser);
router.post("/follow/:id", protectedRoute, followUnfollowUser);
router.put("/update", protectedRoute, updateUser);

export default router;
