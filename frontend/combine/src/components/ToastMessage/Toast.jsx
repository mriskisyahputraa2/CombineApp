import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"
      //   autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      pauseOnFocusLoss
      style={{ top: "63px" }}
    />
  );
};

export default Toast;
