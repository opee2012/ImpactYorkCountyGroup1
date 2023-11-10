import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import userIcon from "./icons/user.png";
import passwordIcon from "./icons/lock.png";

function Login() {
  return (
    <div className="container">
      <div id="logo">
        <img src="IYC.png" />
      </div>
      <div id="loginform">
        <LoginForm userIcon={userIcon} passwordIcon={passwordIcon}/>
      </div>
    </div>
  );
}

export default Login;
