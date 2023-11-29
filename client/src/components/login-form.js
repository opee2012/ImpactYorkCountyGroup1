import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/loginform.css";

const LoginForm = ({ userIcon , passwordIcon }) => {
    //TODO:
    //change font

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password);
    }

    console.log(error);
    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="input-container">
                <img src={userIcon} alt="user icon" className="icon" />
                <input
                    type="text"
                    name="username"
                    id="Username"
                    className="formtext"
                    placeholder="USERNAME"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            
            <div className="input-container">
                <img src={passwordIcon} alt="password icon" className="icon" />
                <input
                    type="password"
                    name="password"
                    className="formtext"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            
            {error && <div className="error">{error}</div>}
            <input
                type="submit"
                value="Login"
                id="submitbtn"
                disabled={isLoading}
            />
            <form action = "/Dashboard">
                <input
                    type="button"
                    id="returnbtn"
                    value="Back To Dashboard"
                />
            </form>
        </form>
    );
};

export default LoginForm;