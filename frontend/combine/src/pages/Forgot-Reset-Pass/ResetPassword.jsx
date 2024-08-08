import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useParams
import { toast } from "react-toastify";
import Toast from "../../components/ToastMessage/Toast";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams(); // Gunakan useParams untuk mendapatkan token
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

  const resetPassword = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = {
          token: token, // Gunakan token dari useParams
          password: formData.password,
        };

        const res = await axios.put(
          "http://localhost:8080/reset-password",
          data
        );

        if (res.data.status) {
          toast.success(res.data.message);
          setFormData({
            password: "",
            confirmPassword: "",
          });
          setTimeout(() => {
            navigate("/");
          }, 3000); // Jeda 3 detik sebelum mengarahkan pengguna ke halaman login
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <section className="bg-gray-500 min-h-screen flex items-center justify-center">
        <Toast />
        <div className="w-full max-w-md mx-auto p-4">
          <form
            onSubmit={resetPassword}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter New Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Repeat Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Simpan
              </button>
              <p className="text-sm text-center mt-4">
                Do you have an account?{" "}
                <Link to="/" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
