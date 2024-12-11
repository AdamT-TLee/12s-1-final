import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as JsSearch from "js-search";

import "./Products.css";

export default function Products() {
  const { search } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let getProducts = async () => {
      const response = await fetch(process.env.REACT_APP_PRODUCTS);
      const json = await response.json();

      if (search && search.trim() !== "") {
        let s = new JsSearch.Search("id");
        s.addIndex("name");
        s.addDocuments(json);

        setProducts(s.search(search));
      } else {
        setProducts(json);
      }
    };

    getProducts();
  }, [search]);

  const changeFilter = (e) => {
    const copy = [...products];

    switch (e.target.value) {
      case "id":
        copy.sort((a, b) => {
          return a.id - b.id;
        });
        break;

      case "alphabetical":
        copy.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;

      case "price":
        copy.sort((a, b) => {
          return a.price - b.price;
        });
        break;

      default:
        break;
    }
    setProducts(copy);
  };

  let productCards = products.map((product) => {
    return (
      <div className="col justify-content-center" key={product.id}>
        <div className="card w-100 h-100">
          <div className="card-header p-0 align-content-center justify-content-center text-center">
            <img
              src={process.env.REACT_APP_BASE_API + product.image_url}
              alt={product.name}
              className="card-img-top img-thumbnail border-3 border-light m-2"
            />
          </div>

          <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-text">{product.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  <Link to={`/product/${product.id}`}>
                    Buy {product.name} Now
                  </Link>
                </button>
              </div>
              <small className="text-body-secondary">${product.price}</small>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container my-5">
      <div className="container">
        <div className="row">
          <div className="col text-start">
            {search ? (
              <>
                <h2>Results for {search}</h2>
              </>
            ) : (
              <>
                <h2>All Products</h2>
              </>
            )}
          </div>
          <div className="col text-end">
            <div className="dropdown">
              <select
                className="form-select"
                aria-label="Select filter"
                onChange={changeFilter}
              >
                <option defaultValue hidden>
                  Select filter...
                </option>
                <option value="id">Product ID</option>
                <option value="alphabetical">Alphabetically</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="album my-5" data-bs-theme="dark">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {productCards}
        </div>
      </div>
    </div>
  );
}
