import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
