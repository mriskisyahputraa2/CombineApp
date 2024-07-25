import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 mt-6">
        <div className="hidden md:block w-1/5 bg-gray-100 p-4">
          <Sidebar />
        </div>
        <div className="w-full bg-gray-200 p-4 mt-4">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
