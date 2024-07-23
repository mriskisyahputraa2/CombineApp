import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LoginUser, reset } from "../../features/authSlice";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import axiosInstance from "../../utils/axiosinstance.js";
import { validateEmail } from "../../utils/helper.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  // const navigate = useNavigate();

  // tombol form handleLogin
  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   // validasi, jika email tidak ada
  //   if (!validateEmail(email)) {
  //     setError("Please enter a valid email address.");
  //     return;
  //   }

  //   // validasi, jika password tidak ada
  //   if (!password) {
  //     setError("Please enter the password.");
  //     return;
  //   }

  //   setError("");

  //   // Login API Call
  //   try {
  //     // mengirim permintaan post ke endpoint "login"
  //     const response = await axiosInstance.post("login", {
  //       // dengan email dan password
  //       email: email,
  //       password: password,
  //     });

  //     // validasi, jika response data dan response data access token ada
  //     if (response.data && response.data.accessToken) {
  //       localStorage.setItem("token", response.data.accessToken); // token akan disimpan dalam localStorage dengan key "Token"
  //       navigate("/dashboard"); // setelah berhasil, maka pengguna akan dibawa kehalaman dashboard
  //     }

  //     //  jika terjadi error selama autentikasi
  //   } catch (error) {
  //     // validasi, jika semua response error ini ada
  //     if (
  //       error.response &&
  //       error.response.data &&
  //       error.response.data.message
  //     ) {
  //       // maka pesan kesalahan dari server ditetapkan ke state error menggunakan fungsi setError.
  //       setError(error.response.data.message);
  //     } else {
  //       // jika tidak, maka tampilkan pesan "coba lagi"
  //       setError("An unexpected error occurred, Please try again.");
  //     }
  //   }
  // };

  return (
    // <div className="flex items-center justify-center mt-28">
    //   <div className="w-96 border rounded bg-white px-7 py-10">
    //     <form onSubmit={handleLogin}>
    //       <h4 className="text-2xl mb-7">Login</h4>

    //       {/* inputan */}
    //       <input
    //         type="text"
    //         placeholder="Email"
    //         className="input-box"
    //         onChange={(e) => setEmail(e.target.value)}
    //       />

    //       {/* file password di component input password */}
    //       <PasswordInput
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />

    //       {/* jika email atau password tidak dimasukkan, munculkan error  */}
    //       {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

    //       <button type="submit" className="btn-primary">
    //         Login
    //       </button>

    //       {/* link kehalaman signUp */}
    //       <p className="text-sm text-center mt-4">
    //         Not registered yet{" "}
    //         <Link to="/signUp" className="font-medium text-primary underline">
    //           Create an Account
    //         </Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>
    <section className="hero has-background-grey is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {isError && <p className="has-text-centered">{message}</p>}
                <h1 className="title is-2 text-centered">Sign In</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      placeholder="**********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
                {/* link kehalaman signUp */}
                <p className="text-sm text-center mt-4">
                  Not registered yet{" "}
                  <Link
                    to="/signUp"
                    className="font-medium text-primary underline"
                  >
                    Create an Account
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
