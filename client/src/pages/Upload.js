import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import UploadForm from "../components/upload-form";

// styles
import "../styles/Upload.css";

const Upload = () => {
  //TODO
  //Fatfrank font on h1

  const { state, isLoading } = useAuthContext();
  const { email } = state || {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(state);

  return (
    <div className="uploadcontainer">
      <div id="logo">
        <img className="img-upload" src="IYC.png" />
      </div>
      <h1>File Upload</h1>
        <div style={{ position: 'relative', position: 'absolute', top: 10, right: 30 }}>
          {/* Button positioned on the left side */}
          {/* <button style={{ width: '100px' }} onClick={() => window.location.assign('/password')}>Change Password</button> */}
        </div>
      {email && (
        <div className="uploadformcontainer">
          <UploadForm />
        </div>
      )}

      {!email && (
        <div>
          <Navigate to="/">Dashboard</Navigate>
        </div>
      )}
    </div>
  );
};

export default Upload;
