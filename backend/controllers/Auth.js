import User from "../models/UserModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

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
      return res.status(404).json({ message: "User not found!" });
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
  if (!req.session.userId) {
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
