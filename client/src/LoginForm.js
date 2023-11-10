import React, { useState } from "react";
import "./loginform.css";

function LoginForm() {
  //TODO:
  //secure password
  //add icons
  //change font
  //send data somewhere to be validated
  //add statuse for invalid login
  
  const [profile, setProfile] = useState({});
  const [status, setStatus] = useState('');

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(profile);
  };

  return (
    <form action="/Upload">
      <input
        type="text"
        name="Username"
        id="Username"
        className="formtext"
        placeholder="USERNAME"
        value={profile.user}
        onChange={handleOnChange}
      />
      <br />
      <input
        type="password"
        name="Password"
        className="formtext"
        placeholder="PASSWORD"
        value={profile.pass}
        onChange={handleOnChange}
      />
      <br />
      <p id="status">{status}</p>
      <input type="submit" id="submitbtn" value="Login"></input>
      <br />
      <form action = "/Dashboard">
      <input type="button" id="returnbtn" value="Back To Dashboard"></input>
      </form>
    </form>
  );
}

export default LoginForm;
