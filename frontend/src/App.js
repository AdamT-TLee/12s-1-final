import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./Utils.js";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Product from "./Product";
import LoginRegister from "./LoginRegister";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <Navbar user={user} setUser={setUser} />
        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:search" element={<Products />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="login" element={<LoginRegister setUser={setUser} />} />
            <Route
              path="register"
              element={<LoginRegister setUser={setUser} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
