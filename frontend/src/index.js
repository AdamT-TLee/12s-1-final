import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Products from "./Products";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="products" element={<Products />} />
    </Route>
  )
);

root.render(
  <RouterProvider
    router={router}
    // What to show when loading routes
    fallbackElement={
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    }
  />
);
