import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Carousel.css";

import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header data-bs-theme="dark">
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            TechWreck
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
            </ul>
            <form className="d-flex me-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>

            <div className="dropdown">
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <h5 className="dropdown-item-text">email@gmail.com</h5>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    My Products
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    My Cart
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function Carousel({ id, products }) {
  return (
    <div className="container">
      <div
        id={id}
        className="carousel slide rounded bg-dark"
        data-slides="0"
        data-bs-theme="dark"
      >
        {/* Carousels items go in here */}
        <div className="carousel-inner">
          {/* <div class="carousel-item active">
            <img src="..." class="d-block w-100" alt="..." />
          </div> */}
        </div>

        {/* Indicators at the bottom of carousels go in here */}
        <div className="carousel-indicators">
          {/* <button
            type="button"
            data-bs-target={`#${id}`}
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button> */}
        </div>

        {/* Carousel Next and Prev Buttons, make sure to set data-bs-target to the carousel's id */}
        <button
          className="carousel-control-prev ms-3"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next me-3"
          type="button"
          data-bs-target={`#${id}`}
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="text-body-secondary py-5">
      <div className="container">
        <p className="mb-1">
          &copy; Created by Alok Shrestha and Adam Lee using Bootstrap
        </p>
      </div>
    </footer>
  );
}
