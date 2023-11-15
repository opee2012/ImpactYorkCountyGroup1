const LoginDetails = ({ loginDetails }) => {
    return (
        <div className="login-details" >
        <h2>Login Details</h2>
        <p>Username: {loginDetails.username}</p>
        <p>Password: {loginDetails.password}</p>
        </div>
    );
};

export default LoginDetails;