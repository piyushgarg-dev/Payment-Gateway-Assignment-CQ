import React, { useState } from "react";
import "./login.css";
// method="POST" action="/api/auth/login"
const Login = props => {
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [error, setError] = useState();
  const handelFormSubmit = () => {
    let apiOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    };
    fetch("/api/auth/login", apiOptions)
      .then(res => res.json())
      .then(response => {
        console.log(response);
        // handel Response
        if (response.message != "success") {
          setError(response.message);
        } else {
          if (response.user) {
            setError("");
            props.onSuccessLogin(response.user);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="login-page mt-5">
      <p className="login-page-head">Login</p>
      {error ? <p className="alert alert-danger">{error}</p> : ""}
      <div className="login-form">
        <label className="form-label">Email</label>
        <input
          type="email"
          onChange={value => setEmail(value.target.value)}
          //   value={email}
          name="email"
          required
          className="form-input"
        />

        <label className="form-label">Password</label>
        <input
          onChange={value => setPassword(value.target.value)}
          type="password"
          name="password"
          required
          //   value={password}
          className="form-input"
        />

        <button
          onClick={handelFormSubmit}
          className="login-form-submit form-input"
        >
          LOGIN
        </button>
      </div>
      <div className="login-page-link">
        <a href="/register">Create Account</a>
      </div>
    </div>
  );
};

export default Login;
