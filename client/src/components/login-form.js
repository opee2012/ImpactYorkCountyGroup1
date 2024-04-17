import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/loginform.css";

const LoginForm = ({ userIcon , passwordIcon }) => {
    //TODO:
    //change font

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorClient, setError] = useState('');
    const { login, forgot, isLoading, setIsLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email.trim() === '') {
            setError('Email is required');
            return;
        }
        if (password.trim() === '') {
            setError('Password is required');
            return;
        }

        try {
            await login(email, password);
            return;
        } catch (error) {
            setError(error.message);
            return;
        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            setError('Email is required');
            return;
        }
        setIsLoading(true);
        try {
            const confirmReset = window.confirm("Are you sure you want to reset your password?");
            if (confirmReset) {
                await forgot(email);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
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
            <div className="error-container">
                {errorClient.split('<br />').map((line, index) => (
                    <p key={index} style={{ color: 'red' }}>
                        {line}
                    </p>
                ))}
            </div>
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
            <button type="button" onClick={() => window.location.assign('/')} className="dashboard">
                Dashboard
            </button>
        </form>
    );
};

export default LoginForm;