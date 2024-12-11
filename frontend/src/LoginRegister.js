import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function LoginRegister({ setUser }) {
  // Navigation setup
  const navigate = useNavigate();

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
    register: registerL,
    handleSubmit: handleSubmitL,
    formState: { errors: errorsL },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const {
    register: registerR,
    handleSubmit: handleSubmitR,
    formState: { errors: errorsR },
  } = useForm({ mode: "onSubmit", resolver: yupResolver(schema) });

  const onSubmitL = async (data, e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.REACT_APP_BASE_API,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          const json = await response.json();
          setLoginErrorMessage(json.error);
          return;
        } else {
          throw new Error("Response not ok");
        }
      }

      const json = await response.json();
      setUser(json);

      navigate(-1);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitR = async (data, e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const json = await response.json();

          setRegisterErrorMessage(json.error);
          setRegisterSuccessMessage(null);
        }
        throw new Error("Failed to register, please try again");
      }

      const text = await response.text();
      setRegisterSuccessMessage(text);
      setRegisterErrorMessage(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onError = (errors) => {
    console.error(errors);
  };

  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState(null);
  const [registerErrorMessage, setRegisterErrorMessage] = useState(null);

  // Password visibility
  const [passwordVisibleL, setPasswordVisibleL] = useState(false);
  const [passwordVisibleR, setPasswordVisibleR] = useState(false);

  useEffect(() => {
    const input = document.getElementById("passwordInputL");
    input.type = passwordVisibleL ? "text" : "password";
  }, [passwordVisibleL]);

  useEffect(() => {
    const input = document.getElementById("passwordInputR");
    input.type = passwordVisibleR ? "text" : "password";
  }, [passwordVisibleR]);

  return (
    <div className="d-flex align-items-center justify-content-center align-content-center vh-100 vw-100">
      <div className="container bg-light rounded px-0">
        <ul className="nav nav-tabs nav-fill">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="login-tab"
              data-bs-toggle="tab"
              data-bs-target="#login-tab-pane"
              type="button"
              role="tab"
              aria-controls="login-tab-pane"
              aria-selected="true"
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="register-tab"
              data-bs-toggle="tab"
              data-bs-target="#register-tab-pane"
              type="button"
              role="tab"
              aria-controls="register-tab-pane"
              aria-selected="false"
            >
              Register
            </button>
          </li>
        </ul>

        <div className="tab-content bg-light p-4 rounded" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="login-tab-pane"
            role="tabpanel"
            aria-labelledby="login-tab"
            tabIndex="0"
          >
            <form
              className="container"
              onSubmit={handleSubmitL(onSubmitL, onError)}
            >
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="emailInput" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    id="emailInput"
                    placeholder="example@gmail.com"
                    {...registerL("email", { required: true })}
                  />
                  {errorsL.email && (
                    <p className="text-danger">{errorsL.email.message}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="passwordInputL" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      id="passwordInputL"
                      type="password"
                      {...registerL("password", { required: true })}
                    />
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => setPasswordVisibleL(!passwordVisibleL)}
                    >
                      {passwordVisibleL ? (
                        <i className="bi bi-eye-fill"></i>
                      ) : (
                        <i className="bi bi-eye-slash-fill"></i>
                      )}
                    </button>
                  </div>
                  {errorsL.password && (
                    <p className="text-danger">{errorsL.password.message}</p>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-success">
                <i className="bi bi-door-open-fill"></i> Login
              </button>
              {loginErrorMessage && (
                <p className="text-danger">{loginErrorMessage}</p>
              )}
            </form>
          </div>
          <div
            className="tab-pane fade"
            id="register-tab-pane"
            role="tabpanel"
            aria-labelledby="register-tab"
            tabIndex="1"
          >
            <form
              className="container"
              onSubmit={handleSubmitR(onSubmitR, onError)}
            >
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="emailInputR" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    id="emailInputR"
                    placeholder="example@gmail.com"
                    {...registerR("email", { required: true })}
                  />
                  {errorsR.email && (
                    <p className="text-danger">{errorsR.email.message}</p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="passwordInputR" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      id="passwordInputR"
                      type="password"
                      {...registerR("password", { required: true })}
                    />
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => setPasswordVisibleR(!passwordVisibleR)}
                    >
                      {passwordVisibleL ? (
                        <i className="bi bi-eye-fill"></i>
                      ) : (
                        <i className="bi bi-eye-slash-fill"></i>
                      )}
                    </button>
                  </div>
                  {errorsR.password && (
                    <p className="text-danger">{errorsR.password.message}</p>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-success">
                <i className="bi bi-door-open-fill"></i> Register
              </button>
              {registerSuccessMessage && (
                <p className="text-primary">{registerSuccessMessage}</p>
              )}
              {registerErrorMessage && (
                <p className="text-danger">{registerErrorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
