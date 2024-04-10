/**
 * @module Components/UploadForm
 * A React component that renders a form for uploading Excel files and provides a download link for a template file.
 */

import React, { useState } from "react";
import { useUpload } from "../hooks/useUpload";
import "../styles/Upload.css";
import xcelIcon from "../icons/excelIcon.png";

/**
 * UploadForm component for handling file uploads.
 * @returns {React.Component} An upload form component.
 */
const UploadForm = () => {
  const { error, setError, uploadSelectedFile } = useUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  /**
   * Prevents the default behavior when dragging a file over the drop area.
   * @param {Event} e - The dragover event.
   */
  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  /**
   * Handles dropping a file onto the drop area.
   * @param {Event} e - The drop event.
   */
  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setStatus(`${file.name}`);
  };

  /**
   * Downloads the Excel template file.
   * @param {string} filename - The name of the file to download.
   */
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

  /**
  * Renders the upload form with drag-and-drop functionality and file input.
  * Displays a status message or error message based on the file upload state.
  * Provides buttons for browsing files, downloading a template, submitting the selected file, and navigating to the dashboard.
  */
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
          id="fileuploadinput"
          style={{ display: "none" }}
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
              setError(null);
              setStatus(`${e.target.files[0].name}`);
            }
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
            uploadSelectedFile(selectedFile)
            .then(() => {
              setTimeout(() => {
                window.location.assign('/')
              }, 50);
            })
            .catch((error) => {
              console.error(error);
              setError("Upload failed");
            });
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
