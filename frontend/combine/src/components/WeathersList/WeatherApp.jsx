import React, { useEffect, useState } from "react";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WeatherApp = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Aceh");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setLocation(inputValue);
    }
    setInputValue("");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/weather?city=${location}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 404) {
          toast.error("City not found. Please try another one.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  }, [location]);

  let icon;
  if (data) {
    switch (data.weather[0].main) {
      case "Clouds":
        icon = <IoMdCloudy />;
        break;
      case "Haze":
        icon = <BsCloudHaze2Fill />;
        break;
      case "Rain":
        icon = <IoMdRainy className="text-[#31cafb]" />;
        break;
      case "Clear":
        icon = <IoMdSunny className="text-[#ffde33]" />;
        break;
      case "Drizzle":
        icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
        break;
      case "Snow":
        icon = <IoMdSnow className="text-[#31cafb]" />;
        break;
      case "Thunderstorm":
        icon = <IoMdThunderstorm />;
        break;
      default:
        icon = <IoMdSunny />;
        break;
    }
  }

  const date = new Date();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 lg:px-0">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow-lg">
        Weather
      </h1>
      <form
        className="h-14 bg-gradient-to-r from-violet-800 to-sky-900  w-full max-w-[320px] rounded-full backdrop:blur-[12px] mb-6"
        onSubmit={handleSubmit}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            onChange={handleInputChange}
            className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-sm font-light pl-4 h-full"
            type="text"
            placeholder="Search by city or country"
            value={inputValue}
          />
          <button
            type="submit"
            className="hover:bg-purple-700 w-16 h-10 rounded-full flex justify-center items-center transition"
          >
            <IoMdSearch className="text-xl text-white" />
          </button>
        </div>
      </form>

      <div className="w-full max-w-[320px] bg-gradient-to-r from-violet-800 to-sky-900 min-h-[400px] text-white backdrop:blur-[12px] rounded-lg py-8 px-4">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <ImSpinner8 className="text-white text-4xl animate-spin" />
          </div>
        ) : (
          data && (
            <div>
              <div className="flex items-center gap-x-4">
                <div className="text-[72px]">{icon}</div>
                <div>
                  <div className="text-xl font-semibold">
                    {data.name}, {data.sys.country}
                  </div>
                  <div>
                    {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                    {date.getUTCFullYear()}
                  </div>
                </div>
              </div>
              <div className="my-12">
                <div className="flex justify-center items-center">
                  <div className="text-[96px] leading-none font-light">
                    {parseInt(data.main.temp)}
                  </div>
                  <div className="text-3xl">
                    <TbTemperatureCelsius />
                  </div>
                </div>
                <div className="capitalize text-center">
                  {data.weather[0].description}
                </div>
              </div>
              <div className="max-w-[300px] mx-auto flex flex-col gap-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-1">
                    <div className="text-[16px]">
                      <BsEye />
                    </div>
                    <div>
                      Visibility{" "}
                      <span className="ml-1">{data.visibility / 1000} km</span>{" "}
                    </div>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <div className="text-[16px]">
                      <BsThermometer />
                    </div>
                    <div className="flex">
                      Feels like
                      <div className="flex ml-1">
                        {parseInt(data.main.feels_like)}{" "}
                        <TbTemperatureCelsius />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-1">
                    <div className="text-[16px]">
                      <BsWater />
                    </div>
                    <div>
                      Humidity{" "}
                      <span className="ml-1">{data.main.humidity} %</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <div className="text-[16px]">
                      <BsWind />
                    </div>
                    <div>
                      Wind <span className="ml-1">{data.wind.speed} m/s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
        className="mt-12" // Adjust the margin to position it lower
      />
    </div>
  );
};

export default WeatherApp;
