import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/loginform.css";
import { generateRandomString } from "../pages/userManagement";

const LoginForm = ({ userIcon , passwordIcon }) => {
    //TODO:
    //change font

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    const handleForgotPassword = () => {
        const confirmReset = window.confirm("Are you sure you want to reset your password?");
        if (confirmReset) {
            console.log("resetting password");
        }
    };

    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="input-container">
                <img src={userIcon} alt="user icon" className="icon" />
                <input
                    type="text"
                    name="email"
                    id="Email"
                    className="formtext"
                    placeholder="EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div className="input-container">
                <img src={passwordIcon} alt="password icon" className="icon" />
                <input
                    type="password"
                    name="password"
                    id="Password"
                    className="formtext"
                    placeholder="PASSWORD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="button" onClick={handleForgotPassword} className="forgot-password">
                Forgot Password?
            </button>
            <br />
            <input
                type="submit"
                value="Login"
                id="submitbtn"
                disabled={isLoading}
            />
        </form>
    );
};

export default LoginForm;