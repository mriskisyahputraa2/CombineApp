import express from "express";
import {
  createNote,
  deleteNote,
  getAllNote,
  getNoteById,
  updateNote,
  updateNotePinned,
} from "../controllers/Note.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/get-all-notes", verifyUser, getAllNote);
router.get("/notes/:id", verifyUser, getNoteById);
router.post("/create-notes", verifyUser, createNote);
router.patch("/update-notes/:id", verifyUser, updateNote);
router.put("/update-note-pinned/:id", verifyUser, updateNotePinned);
router.delete("/delete-notes/:id", verifyUser, deleteNote);

export default router;
