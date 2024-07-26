import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut, reset } from "../../features/authSlice";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  IoHome,
  IoPricetag,
  IoBook,
  IoLogOut,
  IoCloud,
  IoDocumentText,
} from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const Navbar = ({ value }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logOut());
    dispatch(reset());
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className=" bg-gray-100">
      <nav className="bg-white border-b border-gray-200 shadow-md fixed w-full z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <NavLink
                to="/dashboard"
                className="text-xl font-bold uppercase text-gray-900"
              >
                BELUM
              </NavLink>
            </div>

            <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
              <input
                type="text"
                placeholder="Search Note"
                className="w-full text-xs bg-transparent py-[11px] outline-none"
              />
              {value && (
                <IoMdClose
                  className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
                  // onClick={onClearSearch}
                />
              )}

              <FaMagnifyingGlass
                className=" text-slate-400 cursor-pointer hover:text-black"
                // onClick={handleSearch}
              />
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4">
              <NavLink
                to="/dashboard"
                className="text-gray-900 hover:text-blue-500 transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                className="text-gray-900 hover:text-blue-500 transition-colors"
              >
                Products
              </NavLink>
              <NavLink
                to="/books"
                className="text-gray-900 hover:text-blue-500 transition-colors"
              >
                Books
              </NavLink>
              <NavLink
                to="/notes"
                className="text-gray-900 hover:text-blue-500 transition-colors"
              >
                Notes
              </NavLink>
              <button
                onClick={logout}
                className="underline text-gray-900 transition-colors font-bold"
              >
                Logout
              </button>
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

      {/* Start responsive navbar sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 border-r border-gray-200 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium mt-20">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoHome
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoPricetag
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                />
                <span className="ms-3">Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/books"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoBook
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                />
                <span className="ms-3">Books</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notes"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoDocumentText
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                />
                <span className="ms-3">Notes</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/weather"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoCloud
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                />
                <span className="ms-3">Weather</span>
              </NavLink>
            </li>
            <li>
              <button
                type="button"
                onClick={logout}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <IoLogOut
                  className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

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
