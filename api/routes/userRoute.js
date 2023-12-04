import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  follow,
  unFollow,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get/:id", getUser);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.put("/follow/:id", verifyToken, follow);
router.put("/unFollow/:id", verifyToken, unFollow);

export default router;
