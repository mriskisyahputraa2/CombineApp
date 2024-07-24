import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut, reset } from "../../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item uppercase">
            {/* <img src={logo} width="112" height="28" alt="logo" />
             */}
            BELUM
          </NavLink>

          <a
            href="!="
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logout} className="button is-light">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    // <nav className="bg-white border-gray-200 dark:bg-gray-900">
    //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //       Belum
    //     </span>

    //     <div className="hidden md:flex flex-grow justify-center">
    //       <SearchBar />
    //     </div>

    //     <button
    //       data-collapse-toggle="navbar-default"
    //       type="button"
    //       className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //       aria-controls="navbar-default"
    //       aria-expanded="false"
    //     >
    //       <span className="sr-only">Open main menu</span>
    //       <svg
    //         className="w-5 h-5"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 17 14"
    //       >
    //         <path
    //           stroke="currentColor"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="2"
    //           d="M1 1h15M1 7h15M1 13h15"
    //         />
    //       </svg>
    //     </button>

    //     <div className="hidden w-full md:block md:w-auto" id="navbar-default">
    //       <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //         <li>
    //           <NavLink
    //             to={"/dashboard"}
    //             href="#"
    //             className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    //             aria-current="page"
    //           >
    //             Home
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to={"/products"}
    //             href="#"
    //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Products
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to={"/books"}
    //             href="#"
    //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Books
    //           </NavLink>
    //         </li>
    //         <li>
    //           <NavLink
    //             to={"/notes"}
    //             href="#"
    //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Notes
    //           </NavLink>
    //         </li>
    //         <li>
    //           <ProfileInfo />
    //         </li>
    //       </ul>
    //     </div>
    //   </div>

    //   <div className="block md:hidden mt-4">
    //     <SearchBar />
    //   </div>
    // </nav>
  );
};

export default Navbar;
