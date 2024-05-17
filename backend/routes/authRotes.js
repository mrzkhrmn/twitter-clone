import express from "express";
import {
  getUser,
  login,
  logout,
  signup,
} from "../controllers/authController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/", protectedRoute, getUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
