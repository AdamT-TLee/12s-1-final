import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import "./UserProduct.css";

const schema = yup
  .object({
    name: yup.string().required("Name is required."),
    price: yup
      .string()
      .required("Price is required.")
      .test("isNumber", "Price must be number.", (value) => !isNaN(value)),
  })
  .required();

export default function UpdateUserProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  useEffect(() => {
    let fetchProduct = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_USER_PRODUCT}/${id}`,
        {
          credentials: "include",
        }
      );

      const json = await response.json();
      setProduct(json);
    };

    fetchProduct();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    let bodyData = new FormData(e.target);
    console.log(bodyData);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_USER_UPDATE_PRODUCT}/${id}`,
        {
          method: "PUT",
          body: bodyData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Response not ok");
      }

      navigate(-1);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onError = (errors, e) => {
    e.preventDefault();
    console.error(errors);
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setProduct({
        ...product,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="container my-5">
      {product && (
        <form className="container" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="row my-4">
            <div className="col-8">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <div className="input-group">
                <input
                  id="nameInput"
                  {...register("name")}
                  defaultValue={product.name}
                  className="form-control"
                  onChange={handleChange}
                ></input>
              </div>
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </div>
            <div className="col-4">
              <label htmlFor="priceInput" className="form-label">
                Price
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  id="priceInput"
                  {...register("price")}
                  defaultValue={product.price}
                  className="form-control"
                  onChange={handleChange}
                ></input>
              </div>
              {errors.price && (
                <p className="text-danger">{errors.price.message}</p>
              )}
            </div>
          </div>

          <div className="row my-4">
            <div className="col">
              <label htmlFor="descriptionInput" className="form-label">
                Description (Optional)
              </label>
              <div className="input-group">
                <textarea
                  id="descriptionInput"
                  {...register("description")}
                  defaultValue={product.description}
                  className="form-control"
                ></textarea>
              </div>
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="row my-4">
            <div className="col">
              <label htmlFor="imageInput" className="form-label">
                Change Image
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-image"></i>
                </span>
                <input
                  id="imageInput"
                  accept="image/*"
                  {...register("image")}
                  type="file"
                  className="form-control"
                  onChange={handleChange}
                ></input>
              </div>
              {errors.image && (
                <p className="text-danger">{errors.image.message}</p>
              )}
            </div>
          </div>

          <div className="row my-4">
            <div className="col-6 text-center">
              <label htmlFor="db-preview" className="form-label">
                Current Image
              </label>
              <div>
                <img
                  id="db-preview"
                  className="preview img-fluid img-thumbnail border-3 border-light p-2"
                  src={process.env.REACT_APP_BASE_API + product.image_url}
                />
              </div>
            </div>
            {product.image && (
              <div className="col-6 text-center">
                <label htmlFor="selected-preview" className="form-label">
                  Selected Image
                </label>
                <div>
                  <img
                    id="selected-preview"
                    className="preview img-fluid img-thumbnail border-3 border-light p-2"
                    src={URL.createObjectURL(product.image)}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="row my-5">
            <div className="col text-start">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-pencil"></i> Update Product
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
