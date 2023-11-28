import express from "express";
import {
  createPost,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/get/:id", getUser);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
