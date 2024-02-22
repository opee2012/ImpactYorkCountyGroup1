import React, { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import "../styles/Upload.css";
import xcelIcon from "../icons/excelIcon.png";
import { downloadIcon } from "../icons/svgs";

const UploadForm = () => {
  const { logout } = useLogout();
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setStatus(`${file.name}`);
  };

  const uploadSelectedFile = () => {
    // Implement upload functionality
    console.log("Uploading file:", selectedFile);
  };

  return (
    <div className="uploadformnonflex">
      <form
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
      >
        <p>Drag and drop file</p>
        <br />
        <p>OR</p>
        <label htmlFor="fileuploadinput"></label> <br />
        <input
          name="fileuploadinput"
          id="fileuploadinput"
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setStatus(`${e.target.files[0].name}`);
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
          {selectedFile ? <img src={xcelIcon} alt="file icon" /> : null}
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
