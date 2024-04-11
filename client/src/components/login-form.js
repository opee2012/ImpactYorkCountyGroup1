/**
 * A React component that renders a login form for user authentication.
 */

import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/loginform.css";

/**
 * LoginForm component for user authentication.
 * @param {Object} props - Component properties.
 * @param {string} props.userIcon - Path to the user icon image.
 * @param {string} props.passwordIcon - Path to the password icon image.
 * @returns {React.Component} A login form component.
 */
const LoginForm = ({ userIcon, passwordIcon }) => {
    // State hooks for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Custom hook for handling login
    const { login, isLoading, error } = useLogin();

    /**
     * Handles form submission and initiates the login process.
     * @param {Event} e - The form submission event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    // Render the login form
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
