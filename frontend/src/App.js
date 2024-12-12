import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./Utils.js";
import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Product from "./Product";
import LoginRegister from "./LoginRegister";
import Cart from "./Cart";
import UserProducts from "./UserProducts.js";
import UpdateUserProduct from "./UpdateUserProduct.js";
import AddUserProduct from "./AddUserProduct.js";
import Confirmation from "./Confirmation";

export default function App() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({});

  const clearCart = () => {
    setCart([]); // Clear the cart
  };

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
            <Route
              path="product/:id"
              element={<Product cart={cart} setCart={setCart} />}
            />
            <Route path="user/products" element={<UserProducts />} />
            <Route path="user/product/:id" element={<UpdateUserProduct />} />
            <Route path="user/addproduct" element={<AddUserProduct />} />
            <Route path="user/login" element={<LoginRegister />} />
            <Route path="user/register" element={<LoginRegister />} />
            <Route
              path="cart"
              element={
                <Cart cart={cart} setCart={setCart} setFormData={setFormData} />
              }
            />
            <Route
              path="confirmation"
              element={
                <Confirmation
                  cart={cart}
                  dataF={formData}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}
