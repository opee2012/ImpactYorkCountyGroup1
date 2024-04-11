import { useState } from "react";
export const useImgUpload = () => {
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const uploadSelectedImage = async (file) => {
    setSelectedFile(true);
    setError(null);

    // Implement upload functionality
    try {
      const request = await fetch("/uploadImage", {
        method: "POST",
        enctype: "multipart/form-data",
        // headers: { "Content-Type": "application/json" },
        body: file,
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
    uploadSelectedImage,
    error,
    setError,
    setStatus,
  };
};
