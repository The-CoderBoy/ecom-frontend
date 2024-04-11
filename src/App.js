import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import AddProduct from "./components/pages/AddProduct";
import ViewProduct from "./components/pages/ViewProduct";
import EditProduct from "./components/pages/EditProduct";
import AdminLogin from "./components/pages/AdminLogin";
import AddBanner from "./components/pages/AddBanner";
import SignUp from "./components/pages/SignUp";
import UserLogin from "./components/pages/UserLogin";
import UserDetail from "./components/pages/UserDetail";
import ProductPage from "./components/pages/ProductPage";
import Cart from "./components/pages/Cart";
import CheckOutFromCart from "./components/pages/CheckOutFromCart";
import Order from "./components/pages/Order";
import UserOrder from "./components/pages/UserOrder";
import SearchProduct from "./components/pages/SearchProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/viewProduct" element={<ViewProduct />} />
      <Route path="/editProduct/:_id" element={<EditProduct />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/addBanner" element={<AddBanner />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/userLogin" element={<UserLogin />} />
      <Route path="/userDetail" element={<UserDetail />} />
      <Route path="/productPage/:_id" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkOutFromCart" element={<CheckOutFromCart />} />
      <Route path="/order" element={<Order />} />
      <Route path="/userOrder" element={<UserOrder />} />
      <Route path="/SearchProduct/:product" element={<SearchProduct />} />
    </Routes>
  );
}

export default App;
