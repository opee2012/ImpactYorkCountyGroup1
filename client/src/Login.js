import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="container">
      <div id="logo">
        <img src="IYC.png" />
      </div>
      <div id="loginform">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
