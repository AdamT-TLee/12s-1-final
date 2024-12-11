import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Link } from "react-router-dom";

export default function UserProducts() {
  const [userProducts, setUserProducts] = useState([]);

  const getUserProducts = async () => {
    const response = await fetch(process.env.REACT_APP_USER_PRODUCTS, {
      method: "GET",
      credentials: "include",
    });
    const json = await response.json();
    setUserProducts(json);
  };

  useEffect(() => {
    if (Cookies.get("user")) getUserProducts();
  }, []);

  const deleteItem = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_USER_DELETE_PRODUCT}/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const text = response.text();
    console.log(text);

    getUserProducts();
  };

  let userProductUI = userProducts.map((product) => {
    return (
      <div key={product.id}>
        <li className="list-group-item my-2 rounded" key={product.id}>
          <div className="container">
            <div className="row">
              <div className="col-2 text-center align-content-center">
                <img
                  src={process.env.REACT_APP_BASE_API + product.image_url}
                  alt={product.name}
                  className="img-fluid img-thumbnail border-3 border-light p-2"
                />
              </div>
              <div className="col-5 align-content-center text-start">
                <h2>{product.name}</h2>
                <p>${product.price}</p>
              </div>
              <div className="col-5 align-content-center text-end">
                <div>
                  <Link
                    to={`/user/product/${product.id}`}
                    className="btn btn-success w-100 my-2"
                  >
                    <i className="bi bi-pencil"></i> Edit
                  </Link>
                </div>
                <div>
                  <button
                    className="btn btn-danger w-100 my-2"
                    onClick={() => deleteItem(product.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
    );
  });

  return (
    <div className="container my-5" data-bs-theme="dark">
      {Cookies.get("user") ? (
        <>
          <h2 className="text-center">My Products</h2>
          <ul className="list-group">{userProductUI}</ul>
          <div className="text-center">
            <Link to="/user/addproduct" className="btn btn-primary">
              <i className="bi bi-plus"></i> Add New Product
            </Link>
          </div>
        </>
      ) : (
        <h2>Not logged in.</h2>
      )}
    </div>
  );
}
