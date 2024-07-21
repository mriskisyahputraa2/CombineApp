import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

// function Get All Product
export const getAllProduct = async (req, res) => {
  try {
    let response;

    // validasi, jika role nya adalah admin, maka tampilkan semua data product
    if (req.role === "admin") {
      response = await Product.findAll({
        attributes: ["uuid", "name", "brand", "price"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });

      // jika bukan admin, maka tampilkan semua data product yang rolenya 'user'
    } else {
      response = await Product.findAll({
        attributes: ["uuid", "name", "brand", "price"],
        where: {
          userId: req.userId, // disini yang menentukan pengguna adalah 'user'
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

// function Get Product By Id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id, // uuid ialah name field table product, mendapatkan request parameter dari id yang dimasukkan pengguna
      },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "brand", "price"],
        where: {
          id: product.id, // id nya berdasarkan dari produt id
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
        attributes: ["uuid", "name", "brand", "price"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }], // pengecekan use operator and, apakah product id sesuai dengan data product dan apakah user id sesuai dengan id user
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

// function Create Product
export const createProduct = async (req, res) => {
  const { name, brand, price } = req.body;

  try {
    await Product.create({
      name: name,
      brand: brand,
      price: price,
      userId: req.userId,
    });

    res.status(200).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// function Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, brand, price } = req.body;

    // validasi, jika role pengguna adalah admin maka, admin bisa update data product dari role 'admin' dan role 'user'
    if (req.role === "admin") {
      await Product.update(
        { name, price, brand },
        {
          where: {
            id: product.id,
          },
        }
      );

      // jika role bukan admin ialah 'user'
    } else {
      // validasi, jika role nya adalah 'user', maka pengguna tidak bisa update data product 'admin'
      if (req.userId !== product.userId)
        return res
          .status(403)
          .json({ message: "Access restricted, you are not an admin" });

      // jika yang update data product ialah 'user', maka di updated
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
};

// function Delete Product
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
