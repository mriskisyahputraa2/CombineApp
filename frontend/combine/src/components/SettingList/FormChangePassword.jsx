import React, { useEffect, useState } from "react";
import Toast from "../ToastMessage/Toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const FormChangePassword = () => {
  const { id } = useParams(); // Dapatkan token dari URL
  const navigate = useNavigate("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const token = localStorage.getItem("access");
        console.log("Token:", token);

        const res = await axios.put(
          `http://localhost:8080/change-password/${id}`,
          {
            password: formData.password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res);

        if (res.data.status) {
          toast.success(res.data.message);
          setFormData({
            password: "",
            confirmPassword: "",
          });
          setTimeout(() => {
            navigate("/setting-account");
          }, 1000); // Jeda 1 detik sebelum mengarahkan pengguna ke halaman setting account
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="p-6 flex items-center justify-center min-h-screen">
        <Toast />
        <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8 md:p-12 mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Change Password
          </h1>
          <form className="space-y-6" onSubmit={changePassword}>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter New Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Repeat Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Simpan
              </button>
              <Link
                to="/setting-account"
                className="w-full text-center bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormChangePassword;
