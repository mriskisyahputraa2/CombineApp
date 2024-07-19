import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUserById,
  updateUser,
} from "../controllers/User.js";

const router = express.Router();

router.get("/getUsers", getUser);
router.get("/getUsers/:id", getUserById);
router.post("/createUser", createUser);
router.patch("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
