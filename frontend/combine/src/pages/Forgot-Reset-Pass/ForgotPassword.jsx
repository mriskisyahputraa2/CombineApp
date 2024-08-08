import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../components/ToastMessage/Toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const kirim = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Email wajib diisi");
    } else {
      try {
        const res = await axios.put("http://localhost:8080/forgot-password", {
          email,
        });

        if (res.data.status) {
          setEmail("");
          toast.success("Silahkan cek email anda");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat mereset password");
        console.error("There was an error resetting the password!", error);
      }
    }
  };

  return (
    <section className="bg-gray-500 min-h-screen flex items-center justify-center">
      <Toast />
      <div className="w-full max-w-md mx-auto p-4">
        <form
          onSubmit={kirim}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Reset Password
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              value={email}
              onChange={changeEmail}
            />
          </div>
          <div className="flex flex-col justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Reset Password
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
  );
};

export default ForgotPassword;
