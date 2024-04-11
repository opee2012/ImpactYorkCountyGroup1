import { useState } from "react";
export const useUpload = () => {
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const uploadSelectedFile = async (selectedFile) => {
    setStatus("Uploading...");
    setError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);

    // Implement upload functionality
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
      setStatus("Upload failed");
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
    setStatus,
  };
};
