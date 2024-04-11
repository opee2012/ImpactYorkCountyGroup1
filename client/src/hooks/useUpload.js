/**
 * Custom hook for handling file uploads through drag and drop. Provides functionality to drag over, select, and upload files.
 * 
 * @returns {Object} An object containing state variables and handler functions related to the file upload process.
 */
export const useUpload = () => {
  // State to keep track of any error during the upload process
  const [error, setError] = useState(null);
  // State to hold the currently selected file for upload
  const [selectedFile, setSelectedFile] = useState(null);
  // State to describe the current status of the upload process
  const [status, setStatus] = useState('Idle');  // Added default status 'Idle'

  /**
   * Handler function to prevent default behavior during the dragover event, typically used to prepare for the drop event.
   * @param {Event} e - The dragover event object.
   */
  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  /**
   * Asynchronously uploads the selected file to the server.
   * @param {File} selectedFile - The file selected by the user for upload.
   * @returns {Promise<void>} A promise that resolves when the upload is complete or rejects if an error occurs.
   */
  const uploadSelectedFile = async (selectedFile) => {
    setStatus("Uploading...");
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const request = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!request.ok) {
        throw new Error(`Request failed with status ${request.status}`);
      } else {
        setStatus("Upload successful");
      }
    } catch (error) {
      setError(error.message);
      setStatus('Upload failed');
    }
  };

  return {
    selectedFile,
    status,
    dragOverHandler,
    uploadSelectedFile,
    setSelectedFile,
    error,
    setError,
    setStatus
  };
};