import axios from "axios";

export const getWeather = async (req, res) => {
  const { city } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Kirim status 404 jika kota tidak ditemukan
      res.status(404).json({ message: "City not found" });
    } else {
      // Kirim status 500 untuk kesalahan lainnya
      res.status(500).json({ message: "Error fetching weather data" });
    }
  }
};
