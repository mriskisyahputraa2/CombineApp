import multer from "multer";
import path from "path";
import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// Konfigurasi multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only images are allowed!"), false);
    }
  },
});

// Function Get All Product
export const getAllProduct = async (req, res) => {
  try {
    let response;

    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "brand", "price", "imageUrl"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "brand", "price", "imageUrl"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function Get Product By Id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "brand", "price", "imageUrl"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "name", "brand", "price", "imageUrl"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function Create Product with Image Upload
export const createProduct = [
  upload.single("image"),
  async (req, res) => {
    const { name, brand, price } = req.body;
    const imageUrl = req.file
      ? `http://localhost:8080/uploads/${req.file.filename}`
      : null;

    try {
      await Product.create({
        name,
        brand,
        price,
        userId: req.userId,
        imageUrl, // Simpan URL gambar di database
      });

      res
        .status(200)
        .json({ message: "Product created successfully", imageUrl });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Function Update Product with Image Upload (Optional)
export const updateProduct = [
  upload.single("image"),
  async (req, res) => {
    try {
      const product = await Product.findOne({
        where: {
          uuid: req.params.id,
        },
      });

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      const { name, brand, price } = req.body;

      if (req.role === "admin") {
        await Product.update(
          { name, price, brand },
          {
            where: {
              id: product.id,
            },
          }
        );
      } else {
        if (req.userId !== product.userId)
          return res
            .status(403)
            .json({ message: "Access restricted, you are not an admin" });

        await Product.update(
          { name, price },
          {
            where: {
              [Op.and]: [{ id: product.id }, { userId: req.userId }],
            },
          }
        );
      }
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// Function Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res
          .status(403)
          .json({ message: "Access restricted, you are not an admin" });

      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
