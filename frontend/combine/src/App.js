import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/products/add" exact element={<AddProduct />} />
          <Route path="/products/edit/:id" exact element={<EditProduct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
