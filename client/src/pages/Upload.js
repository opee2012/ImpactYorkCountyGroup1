import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";

const Upload = () => {
    const { username } = useAuthContext();
    const { logout } = useLogout();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClick = () => {
        logout();
    }

    return (
        <form>
            <h1>File Upload</h1>
            {username && (
                <div>
                    <form>
                           <p>  drag and drop file</p><br/>
                           <p>OR</p>
                           <input type="file" onChange={(e) => {setSelectedFile(e.target.value)}}/>
                           <p>{selectedFile}</p>
                           <a href="">Download template</a> <br/>
                        
                           <button>Back</button> <br/>
                           <button>Submit</button>
                    </form>
                </div>
            )}
            {!username && (
                <div>
                    <Link to="/login">Login</Link>
                </div>
            )}
        </form>
    );
};

export default Upload;