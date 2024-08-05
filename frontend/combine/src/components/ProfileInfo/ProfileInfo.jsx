import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoChevronDown, IoLogOut, IoSettings } from "react-icons/io5";
import { useNavigate } from "react-router";
import { logOut, reset } from "../../features/authSlice.js";
import adminImg from "../../assets/images/admin.png";
import userImg from "../../assets/images/user.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfileInfo = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State untuk menyimpan informasi pengguna
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // toggleMenu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // logout
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>; // Menampilkan loading saat data belum diambil
  }

  const profileImg = user.role === "admin" ? adminImg : userImg;

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleMenu}
        className="flex items-center focus:outline-none"
      >
        <img
          className="w-10 h-10 rounded-full"
          src={profileImg}
          alt="Profile"
        />
        <IoChevronDown className="ml-2 text-gray-700" />
      </button>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-2 px-4 text-gray-800">
            <h3 className="font-bold ml-4">
              {user.role === "admin" ? "Admin" : user.name}
            </h3>
            <Link
              to={"/setting-account"}
              className="mt-2 w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <IoSettings className="mr-2" />
              Setting Account
            </Link>
            <button
              onClick={logout}
              className="mt-2 w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <IoLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
