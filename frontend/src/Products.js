import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as JsSearch from "js-search";

import "./Products.css";

export default function Products() {
  const { search } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let getProducts = async () => {
      console.log(process.env.REACT_APP_PRODUCTS);

      const response = await fetch(process.env.REACT_APP_PRODUCTS);
      const json = await response.json();

      console.log(json);

      if (search) {
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

  const productCards = products.map((product) => {
    return (
      <div className="row" key={product.id}>
        <div className="card shadow-sm">
          <img
            src={process.env.REACT_APP_BASE_API + product.image_url}
            alt={product.name}
            className="mt-3 img-fluid img-thumbnail border-light border-3 bg-light-subtle"
          />
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
    <div className="album py-5">
      <div className="container">
        <div className="row row-colsrow row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {productCards}
        </div>
      </div>
    </div>
  );
}

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    let fetchProduct = async () => {
      const response = await fetch(`${process.env.REACT_APP_PRODUCT}/${id}`);

      const json = await response.json();
      setProduct(json);
    };

    fetchProduct();
  }, []);

  let card = (
    <div className="card p-3 mt-5" data-bs-theme="dark">
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center">
          <img
            src={process.env.REACT_APP_BASE_API + product.image_url}
            className="img-fluid rounded-2 img-thumbnail border-light border-3 bg-light-subtle"
            alt={product.name}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">{product.name}</h3>
            <p className="card-text">{product.description}</p>
            <p className="card-text">
              <small className="text-muted">${product.price}</small>
            </p>
          </div>
        </div>
      </div>
      <div className="row g-0 mt-2">
        <div className="col-md-4 d-flex justify-content-center">
          <a href="#" className="btn btn-primary w-100" id="purchase-btn">
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  );

  return <div className="container">{card}</div>;
}
