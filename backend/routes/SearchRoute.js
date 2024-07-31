import express from "express";
import { verifyUser } from "../middleware/AuthUser.js";
import { searchNote } from "../controllers/Search.js";

const router = express.Router();

router.get("/search-notes", verifyUser, searchNote);

export default router;
