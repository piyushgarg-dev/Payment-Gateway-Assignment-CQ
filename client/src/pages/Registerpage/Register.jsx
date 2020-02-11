import React, { useState } from "react";
import "./register.css";
const Register = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const handelSignupForm = () => {
    console.log(password);
    if (confirmPassword == password) {
      if (name && email) {
        let apiOption = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        };
        fetch("/api/auth/register", apiOption)
          .then(res => res.json())
          .then(response => {
            console.log(response.user);
            if (response.message == "success") {
              props.onSuceessSignup(JSON.stringify(response.user));
            } else {
              setErr(response.message);
            }
          })
          .catch(err => console.log(err));
      } else {
        setErr("All Fields are required");
      }
    } else {
      setErr("Password did'nt Match");
    }
  };

  return (
    <div className="register-page mt-5">
      <p className="register-page-head">Register</p>
      {err ? <p className="alert alert-danger">{err}</p> : ""}
      <div className="register-page-form">
        <label className="register-page-label" for="name">
          Full Name
        </label>
        <input
          value={name}
          type="text"
          id="name"
          onChange={val => setName(val.target.value)}
          className="register-form-input"
        />
        <label className="register-page-label" for="email">
          Email
        </label>
        <input
          value={email}
          type="email"
          onChange={val => setEmail(val.target.value)}
          id="email"
          className="register-form-input"
        />
        <label className="register-page-label" for="password">
          Password
        </label>
        <input
          value={password}
          type="password"
          onChange={val => setPassword(val.target.value)}
          id="password"
          className="register-form-input"
        />
        <label className="register-page-label" for="confirm">
          Confirm Password
        </label>
        <input
          value={confirmPassword}
          type="password"
          onChange={val => setConfirmPassword(val.target.value)}
          id="confirm"
          className="register-form-input"
        />
        <button
          onClick={handelSignupForm}
          className="register-page-button register-form-input"
        >
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
