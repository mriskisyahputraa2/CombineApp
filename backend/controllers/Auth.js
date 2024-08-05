import User from "../models/UserModel.js";
import nodemailer from "nodemailer";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Configurasi nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER, // masukkan email Anda
    pass: process.env.GMAIL_PASS, // masukkan password email Anda
  },
});

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Email not found!" });
    }

    // Membuat token reset password
    const resetToken = jwt.sign(
      { userId: user.uuid },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: "1h" }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 jam

    await user.save();

    // Mengirim email
    const mailOptions = {
      to: user.email,
      from: process.env.GMAIL_USER,
      subject: "Password Reset",
      text: `
        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        http://${req.headers.host}/reset/${resetToken}
        If you did not request this, please ignore this email and your password will remain unchanged.
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error("Error in forgotPassword:", error); // Tambahkan logging ini
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);

    const user = await User.findOne({
      where: {
        uuid: decoded.userId,
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Password reset token is invalid or has expired." });
    }

    const hashedPassword = await argon2.hash(password);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ message: "Password has been reset!" });
  } catch (error) {
    console.error("Error in resetPassword:", error); // Tambahkan logging ini
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
      return res.status(400).json({ message: "Incorrect password!" });
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
