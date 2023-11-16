import React, { useState } from "react";
import "../styles/loginform.css";

const LoginForm = ({ userIcon , passwordIcon }) => {
    //TODO:
    //secure password
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
        <div className="input-container">
        <img src={userIcon} alt="user icon" className="icon" />
        <input
        type="text"
        name="Username"
        id="Username"
        className="formtext"
        placeholder="USERNAME"
        value={profile.user}
        onChange={handleOnChange}
        />
        </div>
        
        <div className="input-container">
        <img src={passwordIcon} alt="password icon" className="icon" />
        <input
        type="password"
        name="Password"
        className="formtext"
        placeholder="PASSWORD"
        value={profile.pass}
        onChange={handleOnChange}
        />
        </div>
        
        <p id="status">{status}</p>
        <input type="submit" id="submitbtn" value="Login"></input>
        <br />
        <form action = "/Dashboard">
        <input type="button" id="returnbtn" value="Back To Dashboard"></input>
        </form>
    </form>
    );
};

export default LoginForm;