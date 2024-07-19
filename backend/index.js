import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import Book from "./models/BookModel.js";
import Note from "./models/NoteModel.js";

// mengizinkan menggunakan .env diakses
dotenv.config();

const app = express();

// inisialisasi database session
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// sinkronisasi database

// (async () => {
//   try {
//     await db.sync({ alter: true }); // Sinkronisasi semua model
//     console.log("Database synchronized");
//   } catch (error) {
//     console.error("Unable to sync database:", error);
//   }
// })();

// (async () => {
//   await db.sync();
// })();

// middleware session
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    store: store,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);

// middleware cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// middleware parsing JSON
app.use(express.json());

// sinkronisasi database session
// store.sync();

// middleware routes
app.use(UserRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
