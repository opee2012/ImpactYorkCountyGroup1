import { useEffect, useState } from "react";

// components
import LoginForm from "../components/login-form";

// icons
import userIcon from "../icons/user.png";
import passwordIcon from "../icons/lock.png";

// styles
import "../styles/Login.css";


const Login = () => {

    // const [login, setLogins] = useState(null);
    const [username, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(username, password);
    };

    // useEffect(() => {
    //     const fetchLogins = async () => {
    //         const response = await fetch('/login');
    //         const json = await response.json();

    //         if (response.status === 200) {
    //             setLogins(json);
    //         }
    //     };

    //     fetchLogins();
    // }, []);

    return (
        <div className="container">
            <div id="logo">
                <img src="IYC.png" />
            </div>
            <div id="loginform">
                <LoginForm userIcon={userIcon} passwordIcon={passwordIcon}/>
            </div>
        </div>
    );
};

export default Login;