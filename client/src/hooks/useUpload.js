import React, { useState } from "react";
export const useUpload = () => {
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
    // Implement upload functionality
    console.log("Uploading file:", JSON.stringify(file));
    try {
      const response = await fetch("/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( file
        //  { json : {
        //     Category: "help meeeee2" 
        //   }}
          )  
            
        
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      } else {
        const json = await response.json();
        console.log(json);
        return json;
      }

      // Handle successful response here (e.g., set data state)
      // ...

      // setIsLoading(false);
    } catch (error) {
      // setError(error.message);
      // setIsLoading(false);
    }
  };

  return {
    selectedFile,
    status,
    dragOverHandler,
    dropHandler,
    uploadSelectedFile,
  };
};
