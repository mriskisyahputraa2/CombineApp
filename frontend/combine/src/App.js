import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";
import EditProduct from "./pages/Products/EditProduct";
import Books from "./pages/Books/Books";
import AddBooks from "./pages/Books/AddBooks";
import EditBooks from "./pages/Books/EditBooks";
import Notes from "./pages/Notes/Notes";
import AddNotes from "./pages/Notes/AddNotes";
import EditNotes from "./pages/Notes/EditNotes";
import Weathers from "./pages/Weathers/Weathers";
import ForgotPassword from "./pages/Forgot-Reset-Pass/ForgotPassword";
import Settings from "./pages/Settings/Settings";
import Users from "./pages/Users/Users";
import AddUsers from "./pages/Users/AddUsers";
import EditUser from "./pages/Users/EditUser";
import ResetPassword from "./pages/Forgot-Reset-Pass/ResetPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/forgot-password" exact element={<ForgotPassword />} />
          <Route
            path="/reset-password/:token"
            exact
            element={<ResetPassword />}
          />

          <Route path="/setting-account" exact element={<Settings />} />
          <Route path="/users" exact element={<Users />} />
          <Route path="/users/add" exact element={<AddUsers />} />
          <Route path="/users/edit/:id" exact element={<EditUser />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/products/add" exact element={<AddProduct />} />
          <Route path="/products/edit/:id" exact element={<EditProduct />} />
          <Route path="/books" exact element={<Books />} />
          <Route path="/books/add" exact element={<AddBooks />} />
          <Route path="/books/edit/:id" exact element={<EditBooks />} />
          <Route path="/notes/" exact element={<Notes />} />
          <Route path="/notes/add" exact element={<AddNotes />} />
          <Route path="/notes/edit/:id" exact element={<EditNotes />} />
          <Route path="/weather" exact element={<Weathers />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
