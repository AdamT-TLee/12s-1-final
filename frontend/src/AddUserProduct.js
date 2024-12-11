import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
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
    image: yup
      .mixed()
      .test("required", "You need to provide a file", (fileList) => {
        return fileList.length > 0;
      })
      .test(
        "fileSize",
        "The file is too large, max size is 100 MB",
        (fileList) => {
          return fileList.length > 0 && fileList[0].size < 8000000;
        }
      ),
  })
  .required();

export default function AddUserProduct() {
  const { id } = useParams();
  const [previewURL, setPreviewURL] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    let bodyData = new FormData(e.target);
    console.log(bodyData);

    try {
      const response = await fetch(process.env.REACT_APP_USER_ADD_PRODUCT, {
        method: "POST",
        body: bodyData,
        credentials: "include",
      });

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

  const handleFileChange = (e) => {
    setPreviewURL(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="container my-5">
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
                className="form-control"
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
                className="form-control"
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
                onChange={handleFileChange}
              ></input>
            </div>
            {errors.image && (
              <p className="text-danger">{errors.image.message}</p>
            )}
          </div>
        </div>

        <div className="row my-4">
          {previewURL && (
            <div className="col text-center">
              <label htmlFor="selected-preview" className="form-label">
                Selected Image
              </label>
              <div>
                <img
                  id="selected-preview"
                  className="preview img-fluid img-thumbnail border-3 p-2"
                  src={previewURL}
                />
              </div>
            </div>
          )}
        </div>

        <div className="row my-5">
          <div className="col text-start">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-plus"></i> Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
