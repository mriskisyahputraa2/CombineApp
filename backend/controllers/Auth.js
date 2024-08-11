import User from "../models/UserModel.js";
import { KirimEmail } from "../helpers/index.js";
import argon2 from "argon2";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Login a user
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body; // mendatpakan data email dan password dari pengguna

    // Validasi input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // mencari email pengguna
    const user = await User.findOne({ where: { email } });

    // validasi, jika email pengguna tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: "Email not found!" });
    }

    // verifikasi password pengguna dengan password di database, jika cocok hash lagi
    const match = await argon2.verify(user.password, password);

    // validasi jika password tidak cocok
    if (!match) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    // membuat token jwt payload berisi userId dan role pengguna
    const accessToken = jwt.sign(
      { userId: user.uuid, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "6h" } // token kadaluarsa dalam 6 jam
    );

    // menyimpan userId dalam session, untuk menjaga sesi pengguna
    req.session.userId = user.uuid;

    // mengatus cookie token, yang hanya dapat diakses oleh server httpOnly
    res.cookie("token", accessToken, {
      httpOnly: true, // Mencegah akses JavaScript di klien
      secure: process.env.NODE_ENV === "production", // Hanya mengirim cookie melalui HTTPS di production
      sameSite: "strict", // Mencegah serangan Cross-Site Request Forgery (CSRF).
    });

    // mengirim object data pengguna ke user
    const { uuid, name, role } = user;

    // menampilkan data yang ditampilkan
    res.status(200).json({ uuid, name, email: user.email, role, accessToken });

    // jika proses validasi gagal, maka tampilkan status 500 dan message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get me
export const Me = async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Please login to your account!" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) return res.status(404).json({ message: "User not found!" });
  res.status(200).json(user);
};

// Logout a user
export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Unable to log out" });
    res.status(200).json({ message: "You are logged out" });
  });
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Perbaikan findOne dengan menggunakan where
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.status(200).json({
      status: false,
      message: "Email tidak tersedia",
    });
  }

  const token = jwt.sign(
    { userId: user.uuid },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" } // Token kadaluarsa dalam 1 jam
  );

  await user.update({ resetPasswordLink: token });

  const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  const templateEmail = {
    from: "Rizki Programmer",
    to: email,
    subject: "Link Reset Password",
    html: `<p>Silahkan klik link dibawah untuk reset password anda</p> <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
  };
  console.log(`Reset URL: ${resetPasswordUrl}`); // Log URL untuk verifikasi
  console.log(templateEmail);

  try {
    await KirimEmail(templateEmail);
    return res
      .status(200)
      .json({ status: true, message: "Link reset password berhasil terkirim" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      status: false,
      message: "Kesalahan saat mengirim email reset password",
    });
  }
};

// reset password
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  // console.log("token", token);
  // console.log("password", password);

  try {
    const user = await User.findOne({ where: { resetPasswordLink: token } });

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid token or user not found.",
      });
    }

    const hashPassword = await argon2.hash(password, 12);
    user.password = hashPassword;
    user.resetPasswordLink = null; // Reset the resetPasswordLink after successful reset
    await user.save();

    return res.status(201).json({
      status: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};

// function change password
export const changePassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findOne({ where: { uuid: userId } });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    const hashPassword = await argon2.hash(password, 12);
    user.password = hashPassword;
    await user.save();

    return res.status(200).json({
      status: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
  }
};
