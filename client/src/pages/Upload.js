import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import { useState } from "react";
import UploadForm from "../components/upload-form";

// styles
import "../styles/Upload.css";

const Upload = () => {
  //TODO
  //Fatfrank font on h1

  const { email } = useAuthContext();

  

  return (
    <div className="uploadcontainer">
      <div id="logo">
        <img className="img-upload" src="IYC.png" />
      </div>
      <h1>File Upload</h1>
      {email && (
        <div className="uploadformcontainer">
          <UploadForm />
        </div>
      )}

      {!email && (
        <div>
          <Navigate to="/login">Login</Navigate>
        </div>
      )}
    </div>
  );
};

export default Upload;
