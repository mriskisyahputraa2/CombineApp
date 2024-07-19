import jwt from "jsonwebtoken";

// function authenticate token jwt
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // menerima token yang dikirim dari pengguna
  const token = authHeader && authHeader.split(" ")[1]; // mengambil token yang didapatkan dari pengguna

  // jika token tidak ada, mengembalikan status 401(Unauthorized)
  if (!token) return res.sendStatus(401);

  //jika ada, memverifikasi token jwt dengan ACCESS_TOKEN_SECRET, dengan 2 callback err dn user
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // jika token tidak cocok atau kadaluarwa, mengembalikan status 401(Unauthorized)
    if (err) return res.sendStatus(401);

    req.user = user; // jika ada, menyimpan informasi pengguna
    next(); // melanjutkan ke middleware berikutnya
  });
};
