import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser, reset } from "../../features/authSlice";
import { Link } from "react-router-dom";
import Toast from "../../components/ToastMessage/Toast";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  // console.log(user, isError, isSuccess, isLoading, message);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confPassword) {
      return alert("Passwords do not match.");
    }
    dispatch(registerUser({ name, email, password, confPassword }));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Register Successfully!"); // Menampilkan toast sukses
      // Delay 2 detik sebelum mengarahkan ke halaman login
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, message, navigate, dispatch]);

  return (
    <>
      <section className="bg-gray-500 min-h-screen flex items-center justify-center">
        <Toast />
        <div className="w-full max-w-md mx-auto p-4">
          <form
            onSubmit={handleSignUp}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            {isError && <p className="text-center text-red-500">{message}</p>}
            <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="**********"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <p className="text-sm text-center mt-4">
              Do you have an account?{" "}
              <Link to="/" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
