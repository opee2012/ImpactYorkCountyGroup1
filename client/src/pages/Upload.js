import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";

// styles
import "../styles/Upload.css";

const Upload = () => {
    const { username } = useAuthContext();
    const { logout } = useLogout();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleClick = () => {
        logout();
    }

    return (
    <div className="container">
        <div id="logo">
             <img className = "img-upload" src="IYC.png" />
        </div>  
    
        <form>
            <h1>File Upload</h1>
            {username && (
                <div>
                    <form>
                           <p>  Drag and drop file</p><br/>
                           <p>OR</p>
                           <input type="file" onChange={(e) => {setSelectedFile(e.target.value)}}/>
                           <p>{selectedFile}</p>
                           <a href="">Download template</a> <br/>
                        
                           <button onClick={handleClick}>Back</button> <br/>
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
    </div>
    );
};

export default Upload;