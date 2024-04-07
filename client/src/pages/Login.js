// Importing the necessary components, icons, and styles
import LoginForm from "../components/login-form";
import userIcon from "../icons/user.png";
import passwordIcon from "../icons/lock.png";
import "../styles/Login.css";

/**
* Login component for rendering the login page.
* This component is responsible for displaying the IYC logo and the LoginForm component.
* @returns {JSX.Element} The rendered Login component.
*/
const Login = () => {
    return (
        /**
        * Renders the Login component, consisting of two main sections:
        * 
        * 1. Logo: Displays the IYC logo at the top of the page.
        * 
        * 2. LoginForm: A form component for user authentication. It receives user and password icons as props
        *    to be displayed inside the input fields.
        * 
        * The layout is defined in a container div, with the logo and login form as its children.
        * 
        * @returns {JSX.Element} The Login component with a logo and the LoginForm.
        */
        <div className="container">
            <div id="logo">
                <img src="IYC.png" alt="IYC logo" />
            </div>
            <div id="loginform">
                <LoginForm userIcon={userIcon} passwordIcon={passwordIcon} />
            </div>
        </div>
    );
};

export default Login;
