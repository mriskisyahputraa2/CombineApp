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
