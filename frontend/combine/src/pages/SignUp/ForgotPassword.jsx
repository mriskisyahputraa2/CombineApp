import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <section className="bg-gray-500 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-4">
        <form
          //   onSubmit={Auth}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* {isError && <p className="text-center text-red-500">{message}</p>} */}
          {/* {error && <p className="text-center text-red-500">{error}</p>} */}
          <h1 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h1>
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
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
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
              //   value={password}
              //   onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              {/* {isLoading ? "Loading..." : "Login"} */}
              Update
            </button>
          </div>
          <p className="text-sm text-center mt-4">
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
            <br />
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
