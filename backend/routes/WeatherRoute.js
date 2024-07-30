import express from "express";
import { getWeather } from "../controllers/Wheater.js";

const router = express.Router();

router.get("/weather", getWeather);

export default router;
