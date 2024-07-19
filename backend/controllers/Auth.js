import User from "../models/UserModel.js";
import argon2 from "argon2";

// Login a user
export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "User not found!" });
  }

  const macth = await argon2.verify(user.password, req.body.password);

  if (!macth) {
    return res.status(400).json({ msg: "Wrong password!" });
  }

  req.session.userId = user.uuid;

  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ uuid, name, email, role });
};

// Get me
export const Me = async (req, res) => {};

// Logout a user
export const Logout = async (req, res) => {};
