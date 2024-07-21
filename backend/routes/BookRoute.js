import express from "express";
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";
import {
  createBooks,
  deleteBooks,
  extendDeadline,
  getAllBooks,
  getBooksById,
  updateBooks,
} from "../controllers/Books.js";

const router = express.Router();

router.get("/books", verifyUser, getAllBooks);
router.get("/books/:id", verifyUser, getBooksById);
router.post("/books", verifyUser, createBooks);
router.patch("/books/:id", verifyUser, updateBooks);
router.delete("/books/:id", verifyUser, deleteBooks);

// Rute untuk memperpanjang deadline, hanya admin yang bisa mengakses
router.put("/books/extend/:id", verifyUser, adminOnly, extendDeadline);

export default router;
