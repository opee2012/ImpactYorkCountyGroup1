import React, { useState } from "react";
import { useUpload } from "../hooks/useUpload";
import "../styles/Upload.css";
import xcelIcon from "../icons/excelIcon.png";
import { ExcelToJSON } from "../utils/ExcelToJson";

const UploadForm = () => {
  const { uploadSelectedFile, error, setError} = useUpload();
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

  const uploadClientFile = async () => {
    try {
      console.log(selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      // const response = await fetch("/uploadxlsx", {
      //   method: "POST",
      //   body: formData,
      //   enctype: "multipart/form-data",
      // });

      // Implement upload functionality
      const json_files = await ExcelToJSON(selectedFile);
      for (let i in json_files) {
        uploadSelectedFile(json_files[i]);
      };

      // if (!response.ok) {
      //   throw new Error("Upload failed");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const filename = "IYC Dashboard Data.xlsx";

  const downloadFile = async (filename) => {
    const response = await fetch(`/downloadxlsx/${filename}`);
    const blob = await response.blob();
  
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    const clickHandler = () => {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener('click', clickHandler);
      }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
  }

  return (
    <div className="uploadformnonflex">
      <form onDrop={dropHandler} onDragOver={dragOverHandler}>
        <div className="dragndrop">
          <h2>Drag and Drop Excel File Here</h2>
          <br />
          <div>OR</div>
        </div>
        <label htmlFor="fileuploadinput"></label> <br />
        <input
          name="fileuploadinput"
          id="fileuploadinput"
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setError(null);
            if(e.target.files[0])setStatus(`${e.target.files[0].name}`);
          }}
        />
        <div className="uploadbuttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              setError(null);
              document.getElementById("fileuploadinput").click();
            }}
          >
            Browse Files
          </button> <br />
          <button onClick={() => downloadFile(filename)}>Download Template</button>
        </div>
        <p id="statusbar">
          {selectedFile && !error ? <img src={xcelIcon} alt="file icon" /> : null}
          {error ? error : (status ? status : selectedFile)}
        </p>
      </form>
      <div className="submitnback">
        <button onClick={() => {
          if (selectedFile) {
            uploadClientFile();
            // window.location.assign('/');
          } else {
            alert("Please select an Excel file to upload.");
          }
        }}>Submit</button> <br />
        <button onClick={() => window.location.assign('/')}>Dashboard</button>
        </div>
    </div>
  );
};

export default UploadForm;
