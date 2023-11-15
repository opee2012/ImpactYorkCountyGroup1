import { useEffect, useState } from "react";

const Login = () => {

    const [logins, setLogins] = useState(null);

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
        <div className="login">
            <h1>Login</h1>
            <div className="logins">
                {logins && logins.map((login) => (
                    <div key={login._id}>
                        <h2>{login.username}</h2>
                        <p>{login.password}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Login;