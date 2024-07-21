import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  updateProduct,
} from "../controllers/Product.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/get-all-products", verifyUser, getAllProduct);
router.get("/products/:id", verifyUser, getProductById);
router.post("/create-products", verifyUser, createProduct);
router.patch("/update-products/:id", verifyUser, updateProduct);
router.delete("/delete-products/:id", verifyUser, deleteProduct);

export default router;
