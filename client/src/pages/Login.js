// components
import LoginForm from "../components/login-form";

// icons
import userIcon from "../icons/user.png";
import passwordIcon from "../icons/lock.png";

// styles
import "../styles/Login.css";


const Login = () => {

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