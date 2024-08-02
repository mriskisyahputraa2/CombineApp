import User from "../models/UserModel.js";
import argon2 from "argon2";

// function createAdmin
export const createAdmin = async () => {
  try {
    const adminExists = await User.findOne({
      where: { email: "rizkiAdmin@gmail.com" },
    });

    if (!adminExists) {
      const hashedPassword = await argon2.hash("admin");
      await User.create({
        name: "Muhammad Rizki Syahputra",
        email: "rizkiAdmin@gmail.com",
        password: hashedPassword,
        role: "admin", // Set role untuk admin
      });
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

// verifyUser ketika user ketika login
export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Please login to your account!" });
  }

  try {
    const user = await User.findOne({
      where: {
        uuid: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = user;
    req.userId = user.id;
    req.role = user.role;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// function for check if your admin or not
export const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });

  // validasi jika user tidak ditemukan
  if (!user) {
    return res.status(404).json({ message: "user not found!" });
  }
  // validasi jika user bukan admin
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access restricted, you are not an admin" });
  }
  next(); // jika ya, maka next kehalaman selanjutnya
};
