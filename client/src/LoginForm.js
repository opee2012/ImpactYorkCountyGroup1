import React from "react";
import './loginform.css';

function LoginForm() {
  return (
    <form>
      <input type="text" id="Username" className="formtext"/> <br />
      <input type="text" id="Password" className="formtext"/>
      <br />
      <input type="submit"></input>
    </form>
  );
}

export default LoginForm;
