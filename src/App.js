import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import AddProduct from "./components/pages/AddProduct";
import ViewProduct from "./components/pages/ViewProduct";
import EditProduct from "./components/pages/EditProduct";
import AdminLogin from "./components/pages/AdminLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/viewProduct" element={<ViewProduct />} />
      <Route path="/editProduct/:_id" element={<EditProduct />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
    </Routes>
  );
}

export default App;
