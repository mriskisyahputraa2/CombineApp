import Navbar from "../../components/Navbar/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <React.Fragment>
        <Navbar />
        <div className="columns mt-6" style={{ minHeight: "100vh" }}>
          <div className="column has-background-light">
            <main>{children}</main>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default Layout;
