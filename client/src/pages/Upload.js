import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Upload = () => {
    const { username } = useAuthContext();
    const { logout } = useLogout();

    const handleClick = () => {
        logout();
    }

    return (
        <form>
            <h1>Upload</h1>
            {username && (
                <div>
                    <span>Welcome: {username.username}</span>
                    <br />
                    <br />
                    <button onClick={handleClick}>Logout</button>
                </div>
            )}
            {!username && (
                <div>
                    <Navigate to="/login" />
                </div>
            )}
        </form>
    );
};

export default Upload;
