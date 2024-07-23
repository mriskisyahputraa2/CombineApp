import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./containers/Layout.jsx";
function App() {
  return (
    <>
      <Router>
        <Routes path="/dashboard" excat elemet={<Layout />} />
      </Router>
    </>
  );
}

export default App;
