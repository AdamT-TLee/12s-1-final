import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { Navbar } from "./Utils.js";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Product from "./Product";
import LoginRegister from "./LoginRegister";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:search" element={<Products />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="login" element={<LoginRegister />} />
            <Route path="register" element={<LoginRegister />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
