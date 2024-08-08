import express from "express";
import {
  forgotPassword,
  Login,
  Logout,
  Me,
  resetPassword,
} from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);

// Forgot Password
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;
