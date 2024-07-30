import axios from "axios";

export const getWeather = async (req, res) => {
  const { city } = req.query; // mengambil parameter query city dari request URL.
  const apiKey = process.env.WEATHER_API_KEY; // API key untuk mengakses OpenWeatherMap yang diambil dari file .env

  try {
    // mengirimkan permintaan GET ke API OpenWeatherMap dengan parameter kota dan API key.
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    // mengirimkan data cuaca dari API sebagai respons JSON ke klien.
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching weather data");
  }
};
