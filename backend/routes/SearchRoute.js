import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { searchItems } from "../controllers/Search.js";

const router = express.Router();

router.get("/search", verifyUser, searchItems);

export default router;
