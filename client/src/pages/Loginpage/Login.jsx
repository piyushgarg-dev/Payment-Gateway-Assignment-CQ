import React from "react";
import "./login.css";
const Login = () => {
  return (
    <div className="login-page mt-5">
      <p className="login-page-head">Login</p>
      <form method="POST" action="/api/auth/login" className="login-form">
        <label className="form-label">Email</label>
        <input type="email" name="email" required className="form-input" />

        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          required
          className="form-input"
        />

        <input
          type="submit"
          value="LOGIN"
          className="login-form-submit form-input"
        />
      </form>
    </div>
  );
};

export default Login;
