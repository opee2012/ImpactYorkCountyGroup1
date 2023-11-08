import React, { useState } from "react";
import "./loginform.css";

function LoginForm() {
  //TODO:
  //secure password
  //add icons
  //change font
  //add statuse for invalid login
  //send data somewhere to be validated
  const [profile, setProfile] = useState({});

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
        className="formtext"
        value={profile.user}
        onChange={handleOnChange}
      />
      <br />
      <input
        type="text"
        name="Password"
        className="formtext"
        value={profile.pass}
        onChange={handleOnChange}
      />
      <br />
      <input type="submit" id="submitbtn" value="Login"></input>
    </form>
  );
}

export default LoginForm;
