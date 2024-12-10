import "./Products.css";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as JsSearch from "js-search";

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
            src={`http://localhost:8081${product.image_url}`}
            alt={`${product.name}`}
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
                  <Link to={`product?id=${product.id}`}>
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

  return <div>{productCards}</div>;
}

export function Product() {
  const { id } = useParams();

  return <div></div>;
}
