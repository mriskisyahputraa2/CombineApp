import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  getAllUsers,
} from "../controllers/User.js";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/users", verifyUser, getAllUsers);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/users", createUser);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);

export default router;
