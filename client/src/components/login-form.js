import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/loginform.css";

const LoginForm = ({ userIcon , passwordIcon }) => {
    //TODO:
    //change font

    const [profile, setProfile] = useState({});
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setProfile((prev) => ({
        ...prev,
        [name]: value,
    }));
    console.log(profile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
                const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (response.status === 200) {
                setStatus('Login successful');
                navigate('/upload');
            } else {
                setStatus('Invalid login credentials');
            }
        } catch (error) {
            console.error('Error during login validation:', error);
            setStatus('Error during login validation');
        }
    }

    return (
    <form onSubmit={handleSubmit}>
        <div className="input-container">
        <img src={userIcon} alt="user icon" className="icon" />
        <input
        type="text"
        name="username"
        id="Username"
        className="formtext"
        placeholder="USERNAME"
        value={profile.username}
        onChange={handleOnChange}
        />
        </div>
        
        <div className="input-container">
        <img src={passwordIcon} alt="password icon" className="icon" />
        <input
        type="password"
        name="password"
        className="formtext"
        placeholder="PASSWORD"
        value={profile.password}
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