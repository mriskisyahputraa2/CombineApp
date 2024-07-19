import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// create a user
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const errors = [];
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  const hasPassword = await argon2.hash(password);

  try {
    const isUser = await User.findOne({ where: { email } });

    if (isUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = new User({ name, email, password: hasPassword, role });

    // menyimpan data user ke database
    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m", // token akan expire dalam 6 jam
    });

    return res.status(200).json({
      user,
      accessToken,
      message: "Register Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update a user
export const updateUser = async () => {};

// delete a user
export const deleteUser = async () => {};

// Get a user
export const getUser = async () => {};

// Get user by id
export const getUserById = async () => {};
