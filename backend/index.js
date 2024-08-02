import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import BookRoute from "./routes/BookRoute.js";
import NoteRoute from "./routes/NoteRoute.js";
import WeatherRoute from "./routes/WeatherRoute.js";
import SearchRoute from "./routes/SearchRoute.js";
import { createAdmin } from "./middleware/AuthUser.js";

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

// Panggil fungsi createAdmin ketika seeding (untuk menetukan siapa adminnya)
// createAdmin().then(() => {
//   process.exit(0); // Keluar setelah seeding selesai
// });

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
app.use(ProductRoute);
app.use(BookRoute);
app.use(NoteRoute);
app.use(WeatherRoute);
app.use(SearchRoute);
app.use(createAdmin);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running");
});
