import React, { useState } from "react";
import { useLogout } from "../hooks/useLogout";
// import { useLogin } from "../hooks/useLogin";
import "../styles/Upload.css";
import xcelIcon from "../icons/excelIcon.png";
import { downloadIcon} from "../icons/svgs";

const UploadForm = () => {
  const { logout } = useLogout();
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const dragHandler = () => {
    //TODO
  };
  const dropHandler = (e) => {
    e.preventDefault();
    //TODO
  };

  const uploadSelectedFile = () => {
    //TODO
  };

  return (
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
        
        <p id="statusbar">
          {selectedFile ? <img src={xcelIcon} /> : null}
          {status ? status : selectedFile}
        </p>
      </form>
      <a href=""> {downloadIcon} Download template</a> <br />
      <button onClick={() => logout()}>Back</button> <br />
      <button onClick={uploadSelectedFile}>Submit</button>
    </div>
  );
};

export default UploadForm;
