import React, { useEffect, useState } from "react";
import adminImg from "../../assets/images/admin.png";
import userImg from "../../assets/images/user.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SettingList = () => {
  const [user, setUser] = useState([]); // State untuk menyimpan informasi pengguna
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const { user } = useSelector((state) => state.auth);

  // mendapatkan role pengguna
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUserProfile();
  }, []);

  const profileImg = user.role === "admin" ? adminImg : userImg;

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg max-w-lg mx-auto p-6 sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 text-center">
          Account Settings
        </h1>
        <div className="flex flex-col items-center justify-center mb-6">
          <img
            src={profileImg}
            alt="Profile"
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border border-gray-300 object-cover"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div className="mt-4 text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Email: {user.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 w-full">
          <Link
            to={"/change-password"}
            className="bg-blue-500 text-center text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Change Password
          </Link>
          <Link
            to={"/update-profile"}
            className="bg-green-500 text-white text-center py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Update Profile
          </Link>
          <Link
            to={`/delete-account/${user.uuid}`}
            className="bg-red-500 text-center text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingList;
