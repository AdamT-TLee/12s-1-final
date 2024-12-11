import "./Carousel.css";

import { Link, useNavigate } from "react-router-dom";
import { useReducer } from "react";
import Cookies from "js-cookie";

export function Navbar() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();

  const searchProducts = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const search = data.get("search");

    let url = `/products/${search}`;

    if (search.trim() !== "") {
      navigate(url);
    }
  };

  const deleteUserCookie = () => {
    Cookies.remove("user");
    forceUpdate();
  };

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
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex me-2" onSubmit={searchProducts}>
              <input
                className="form-control me-2"
                type="search"
                name="search"
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
                {Cookies.get("user") ? (
                  <>
                    <li>
                      <h5 className="dropdown-item-text">
                        {JSON.parse(Cookies.get("user").slice(2)).email}
                      </h5>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/user/products">
                        My Products
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/cart">
                        My Cart
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        to="#"
                        onClick={deleteUserCookie}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login/Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function Carousel({ id, products }) {
  let cards = products.map((product, index) => {
    return (
      <div
        className={`carousel-item ${index === 0 ? " active" : ""}`}
        key={index}
      >
        <div className="card p-3">
          <div className="row g-0">
            <div className="col-md-4 ps-5 d-flex justify-content-center">
              <Link
                to={`/product?id=${product.id}`}
                className="align-content-center link-light link-opacity-50-hover link-underline-opacity-50-hover"
              >
                <img
                  src={process.env.REACT_APP_BASE_API + product.image_url}
                  className="img-fluid rounded-2 img-thumbnail border-light border-3 bg-light-subtle"
                  alt={`${product.name}`}
                />
              </Link>
            </div>
            <div className="col-md-8 pe-5">
              <div className="card-body">
                <h3 className="card-title">
                  <Link
                    to={`/product/${product.id}`}
                    className="link-light link-opacity-50-hover link-underline-opacity-50-hover"
                  >
                    {product.name}
                  </Link>
                </h3>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <small className="text-muted">${product.price}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  let indicators = products.map((element, index) => {
    return (
      <button
        key={index}
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide-to={`${index}`}
        aria-label={`Slide ${index + 1}`}
        className={`bg-light ${index === 0 ? "active" : ""}`}
        aria-current={index === 0 ? "true" : "false"}
      ></button>
    );
  });

  return (
    <div className="container">
      <div
        id={id}
        className="carousel slide rounded bg-dark"
        data-slides={cards.length}
        data-bs-theme="dark"
      >
        {/* Carousels items go in here */}
        <div className="carousel-inner">{cards}</div>

        {/* Indicators at the bottom of carousels go in here */}
        <div className="carousel-indicators">{indicators}</div>

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
