import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Get a user
export const getUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    response.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get user by id
export const getUserById = async () => {};

// create a user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body; // mendapatkan data

  // membuat errors yang ditampung didalam array, dan melakukan validasi data
  const errors = [];
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (!role) errors.push("Role is required");

  // jika salah satu data tidak dimasukkan, tampilkan status 400 dan message errors
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  // membuat password menjadi acaka
  const hasPassword = await argon2.hash(password);

  try {
    // mencari data pengguna dengan email yang ada
    const isUser = await User.findOne({ where: { email } });

    // validasi, jika data email sudah digunakan, tampilkan status 400 dan message
    if (isUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // jika proses validasi berhasil, ambil semua data pengguna yang melakukan register
    const user = new User({ name, email, password: hasPassword, role });

    // menyimpan data pengguna ke database mysql
    await user.save();

    // membuat token jwt
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m", // token akan expire dalam 6 jam
    });

    // jika berhasil tampilkan data pengguna, token jwt dan message, dengan status 200
    return res.status(200).json({
      user,
      accessToken,
      message: "Register Successfully",
    });

    // jika proses validasi gagal
  } catch (error) {
    console.log(error);
    // tampilkan status 500(server gagal) dan message
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update a user
export const updateUser = async () => {};

// delete a user
export const deleteUser = async () => {};
