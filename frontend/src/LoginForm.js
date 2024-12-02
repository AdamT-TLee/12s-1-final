import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function LoginForm() {
  // Form validation
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email is required")
        .email("Invalid email address"),
      password: yup.string().required("Password is required"),
    })
    .required();

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data);
  };

  const onError = (errors) => {
    console.error(errors);
  };

  // Password visibility
  let [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const input = document.getElementById("passwordInput");
    input.type = passwordVisible ? "text" : "password";
  }, [passwordVisible]);

  return (
    <div className="container">
      <form className="container" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="emailInput" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              id="emailInput"
              placeholder="example@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-danger">{errors.email?.message}</p>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                className="form-control"
                id="passwordInput"
                type="password"
                {...register("password", { required: true })}
              />
              <button
                className="btn btn-success"
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <i className="bi bi-eye-fill"></i>
                ) : (
                  <i className="bi bi-eye-slash-fill"></i>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-danger">{errors.password?.message}</p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          <i className="bi bi-door-open-fill"></i> Login
        </button>
      </form>
    </div>
  );
}
