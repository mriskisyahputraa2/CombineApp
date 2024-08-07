import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LoginUser, reset } from "../../features/authSlice";
import { Link } from "react-router-dom";
// import { validateEmail } from "../../utils/helper.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const Auth = (e) => {
    e.preventDefault();

    setError(""); // Reset error jika tidak ada masalah

    dispatch(LoginUser({ email, password }));
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  return (
    <section className="bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-4">
        <form
          onSubmit={Auth}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {isError && <p className="text-center text-red-500">{message}</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline flex justify-end text-sm mt-2"
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
          <p className="text-sm text-center mt-4">
            Not registered yet{" "}
            <Link to="/signUp" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
            <br />
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
