import React from "react";
import "./register.css";
const Register = () => {
  return (
    <div className="register-page mt-5">
      <p className="register-page-head">Register</p>
      <div className="register-page-form">
        <label className="register-page-label" for="name">
          Full Name
        </label>
        <input type="text" id="name" className="register-form-input" />
        <label className="register-page-label" for="email">
          Email
        </label>
        <input type="email" id="email" className="register-form-input" />
        <label className="register-page-label" for="password">
          Password
        </label>
        <input type="password" id="password" className="register-form-input" />
        <label className="register-page-label" for="confirm">
          Confirm Password
        </label>
        <input type="password" id="confirm" className="register-form-input" />
        <button className="register-page-button register-form-input">
          SIGN UP
        </button>
        <div className="register-page-link">
          <a href="/">Back to login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
