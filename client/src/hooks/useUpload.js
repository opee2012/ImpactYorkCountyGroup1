import React, { useState } from "react";
export const useUpload = () => {
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  // comment
  const dropHandler = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    setStatus(`${file.name}`);
  };

  const uploadSelectedFile = async (file) => {
    setSelectedFile(true);
    setError(null);

    // Implement upload functionality
    try {
      const request = await fetch("/upload", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(file)
      });

      if (!request.ok) {
        throw new Error(`Request failed with status ${request.status}`);
      } else {
        const json = await request.json();
        console.log(json);
        return json;
      }

      // Handle successful response here (e.g., set data state)
      // ...

      // setIsLoading(false);
    } catch (error) {
      setError(error.message);
      // setIsLoading(false);
    }
  };

  return {
    selectedFile,
    status,
    dragOverHandler,
    dropHandler,
    uploadSelectedFile,
    error,
    setError,
    setStatus
  };
};
