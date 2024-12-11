import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./Product.css";

export default function Product({cart, setCart}) {
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

  const addToCart = (product) => {
    setCart([...cart, product]);
    console.log(cart);
  };

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
          <a href="#" className="btn btn-primary w-100" id="purchase-btn" onClick={() => addToCart(product)}>
          <i className="bi bi-cart3 me-2"></i>Add to Cart
          </a>
        </div>
      </div>
    </div>
  );

  return <div className="container product">{card}</div>;
}
