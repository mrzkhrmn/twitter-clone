import express from "express";
import { createPost, getUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/get/:id", getUser);

export default router;
