import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut, reset } from "../../features/authSlice";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import {
  IoHome,
  IoPricetag,
  IoBook,
  IoLogOut,
  IoCloud,
  IoDocumentText,
} from "react-icons/io5";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-gray-100">
      <nav className="bg-white border-b border-gray-200 shadow-md fixed w-full z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <NavLink
                to="/dashboard"
                className="text-xl font-bold uppercase text-gray-900"
              >
                <img
                  className="w-[70px] h-12  object-cover object-center"
                  src={Logo}
                  alt="Logo"
                />
              </NavLink>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-4">
              <ProfileInfo />
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleSidebar}
                className="text-gray-900 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {sidebarOpen ? (
                  <FaTimes className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <FaBars className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* start sidebar responsive ketika layar mobile*/}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 border-r border-gray-200 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium mt-16">
            <div className="mt-4 flex flex-col flex-end">
              <ProfileInfo />
            </div>
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center p-2 dark:text-white rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
              >
                <IoHome
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            {user && user.role === "admin" && (
              <li>
                <NavLink
                  to="/users"
                  className="flex items-center p-2 dark:text-white rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
                >
                  <FaUser
                    className="w-5 h-5 text-gray-500 transition duration-75"
                    aria-hidden="true"
                  />
                  <span className="ms-3">User</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/products"
                className="flex items-center p-2 dark:text-white rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
              >
                <IoPricetag
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                />
                <span className="ms-3">Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/books"
                className="flex items-center p-2 dark:text-white rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
              >
                <IoBook
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                />
                <span className="ms-3">Books</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notes"
                className="flex items-center p-2 dark:text-white rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
              >
                <IoDocumentText
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                />
                <span className="ms-3">Notes</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/weather"
                className="flex items-center p-2 dark:text-white rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
              >
                <IoCloud
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                />
                <span className="ms-3">Weather</span>
              </NavLink>
            </li>

            <li>
              <button
                type="button"
                onClick={logout}
                className="flex items-center p-2 dark:text-white rounded-lg hover:bg-gray-100 transition-colors dark:hover:bg-gray-700"
              >
                <IoLogOut
                  className="w-5 h-5 text-gray-500 transition duration-75"
                  aria-hidden="true"
                />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      {/* end sidebar responsive ketika layar mobile*/}

      <div className="md:hidden">
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-30 ${
            sidebarOpen ? "block" : "hidden"
          }`}
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
};

export default Navbar;
