import express from "express";
import {
  changePassword,
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

// route forgot Password & reset password
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

// route change-password for view FormChangePassword
router.put("/change-password/:id", changePassword);

export default router;
