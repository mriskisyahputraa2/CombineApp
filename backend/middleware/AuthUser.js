import User from "../models/UserModel.js";

// verifyUser ketika user ketika login
export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account!" });
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) {
    return res.status(404).json({ msg: "User not found!" });
  }
  req.userId = user.id;
  req.role = user.role;
  next();
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
    return res.status(404).json({ msg: "user not found!" });
  }
  // validasi jika user bukan admin
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ msg: "Access restricted, you are not an admin" });
  }
  next(); // jika ya, maka next kehalaman selanjutnya
};
