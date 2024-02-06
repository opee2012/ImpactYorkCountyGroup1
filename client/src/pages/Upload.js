import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";

// styles
import "../styles/Upload.css";

const Upload = () => {
  //TODO
  //Fatfrank font on h1
  //drag and drop functionality
  //status & download icons
  //upload to server functionality
  //set status on attempted upload

  const { username } = useAuthContext();
  const { logout } = useLogout();
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const handleClick = () => {
    logout();
  };

  const dropHandler = (e) => {
    e.preventDefault();
    //TODO
  };

  const dragHandler = () => {
    //TODO
  };

  const uploadSelectedFile = () => {
    //TODO
  }

  return (
    <div className="uploadcontainer">
      <div id="logo">
        <img className="img-upload" src="IYC.png" />
      </div>
      <h1>File Upload</h1>
      {username && (
        <div className="uploadformcontainer">
          <div className="uploadformnonflex">
            <form
              onDrop={(e) => {
                dropHandler(e);
              }}
            >
              <p> Drag and drop file</p>
              <br />
              <p>OR</p>
              <label for="fileuploadinput"></label> <br />
              <input
                name="fileuploadinput"
                id="fileuploadinput"
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  setSelectedFile(e.target.value);
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("fileuploadinput").click();
                }}
              >
                Browse files
              </button>
              <p style={{ color: "black" }}>{status ? status : selectedFile}</p>
            </form>
            <a href="">Download template</a> <br />
            {/* download icon here */}
            <button onClick={handleClick}>Back</button> <br />
            <button onClick={uploadSelectedFile}>Submit</button>
          </div>
        </div>
      )}

      {!username && (
        <div>
          <Navigate to="/login">Login</Navigate>
        </div>
      )}
    </div>
  );
};

export default Upload;
