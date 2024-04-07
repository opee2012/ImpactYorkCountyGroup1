import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import UploadForm from "../components/upload-form";
import "../styles/Upload.css";

/**
* Upload component for rendering the file upload page.
* This component displays the upload form for authenticated users, allowing them to upload files.
* Unauthenticated users are redirected to the dashboard.
* @returns {JSX.Element} The rendered Upload component.
*/
const Upload = () => {
  // Use the useAuthContext hook to access the authentication state.
  const { state, isLoading } = useAuthContext();
  const { email } = state || {};

  // Display a loading message while the authentication state is being determined.
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    /**
    * Renders the Upload component with a logo, heading, and conditional rendering of the upload form. 
    * 1. Logo: Displays the IYC logo at the top of the page for branding purposes.
    * 2. Heading: Displays the title "File Upload" to indicate the purpose of the page.
    * 3. Upload Form: Renders the UploadForm component if the user is authenticated (email is present).
    *    The form allows users to select and upload files. If the user is not authenticated, they are
    *    redirected to the dashboard using the Navigate component to ensure that only authorized users
    *    can access the upload functionality.
    * @returns {JSX.Element} The rendered Upload component.
    */
    <div className="uploadcontainer">
      <div id="logo">
        <img className="img-upload" src="IYC.png" alt="IYC logo" />
      </div>
      <h1>File Upload</h1>
      {email ? (
        <div className="uploadformcontainer">
          <UploadForm />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default Upload;
