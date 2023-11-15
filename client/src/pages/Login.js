import { useEffect, useState } from "react";

// components
import LoginDetails from "../components/login-component";


const Login = () => {

    const [login, setLogins] = useState(null);

    useEffect(() => {
        const fetchLogins = async () => {
            const response = await fetch('/login');
            const json = await response.json();

            if (response.status === 200) {
                setLogins(json);
            }
        };

        fetchLogins();
    }, []);

    return (
        <div className="login-page">
            <h1>Login</h1>
            <div className="logins">
                {login && login.map(login => (
                    <LoginDetails key={login._id} loginDetails={login} />
                ))}
            </div>
        </div>
    );
};

export default Login;