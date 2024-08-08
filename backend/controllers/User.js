import User from "../models/UserModel.js";
import argon2, { hash } from "argon2";
import jwt from "jsonwebtoken";

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get All User
export const getUser = async (req, res) => {
  try {
    // Verifikasi apakah pengguna adalah admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// // Get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id, // Menggunakan ID dari parameter
      },
    });

    if (!user) return res.status(404).json({ message: "User not found!" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create a user
// export const createUser = async (req, res) => {
//   const { name, email, password, confPassword } = req.body;

//   const errors = [];
//   if (!name) errors.push("Name is required");
//   if (!email) errors.push("Email is required");
//   if (!password) errors.push("Password is required");
//   if (password !== confPassword) {
//     return res.status(400).json({
//       message: "Password and Confirmation Password does not match",
//     });
//   }

//   if (errors.length > 0) {
//     return res.status(400).json({ message: errors.join(", ") });
//   }

//   try {
//     const isUser = await User.findOne({ where: { email } });

//     if (isUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await argon2.hash(password);
//     const user = new User({ name, email, password: hashedPassword });

//     await user.save();

//     return res.status(200).json({
//       user,
//       message: "Register Successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const createUser = async (req, res) => {
  const { name, email, password, confPassword } = req.body; // menghilangkan role

  // membuat errors yang ditampung didalam array, dan melakukan validasi data
  const errors = [];
  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  if (password !== confPassword)
    return res.status(400).json({
      message: "Password and Confirmation Password does not match",
    });

  // jika salah satu data tidak dimasukkan, tampilkan status 400 dan message errors
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(", ") });
  }

  // membuat password menjadi acaka
  const hashedPassword = await argon2.hash(password);

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
    const user = new User({ name, email, password: hashedPassword });

    // menyimpan data pengguna ke database mysql
    await user.save();

    // jika berhasil tampilkan data pengguna dan message, dengan status 200
    return res.status(200).json({
      user,
      message: "Register Successfully",
    });
  } catch (error) {
    console.log(error);
    // tampilkan status 500(server gagal) dan message
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update a user
export const updateUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== confPassword)
    return res
      .status(400)
      .json({ message: "Password and Confirmation Password does not match" });

  try {
    // Generate new access token only if role has changed
    let accessToken;
    if (role !== user.role) {
      accessToken = jwt.sign(
        { userId: user.uuid, role: role }, // Menggunakan role yang baru
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "6h" }
      );
    } else {
      accessToken = user.accessToken; // Menggunakan token yang lama jika tidak ada perubahan pada role
    }

    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
        accessToken,
      },
      {
        where: {
          uuid: user.uuid,
        },
      }
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a user
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" }); // Gunakan status 404 untuk pengguna tidak ditemukan
  }

  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Gunakan status 500 untuk kesalahan server
  }
};
