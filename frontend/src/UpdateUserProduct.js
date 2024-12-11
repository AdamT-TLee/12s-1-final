import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

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
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

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
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
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
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>
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
                ></input>
                {errors.price && (
                  <p className="text-danger">{errors.price.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row my-4">
            <div className="col">
              <label htmlFor="descriptionInput" className="form-label">
                Description
              </label>
              <div className="input-group">
                <textarea
                  id="descriptionInput"
                  {...register("description")}
                  defaultValue={product.description}
                  className="form-control"
                ></textarea>
                {errors.image && (
                  <p className="text-danger">{errors.image.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row my-4">
            <div className="col">
              <label htmlFor="imageInput" className="form-label">
                Image
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-image"></i>
                </span>
                <input
                  id="imageInput"
                  {...register("image")}
                  type="file"
                  className="form-control"
                ></input>
                {errors.image && (
                  <p className="text-danger">{errors.image.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="row my-5">
            <div className="col text-start">
              <button type="submit" className="btn btn-primary">
                Update Product
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
