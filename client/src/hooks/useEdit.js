import React, { useState } from "react";
export const useEdit = () => {
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState(null);

  const editSelectedCategory = async (categoryName, data) => {
    setSelectedFile(true);
    setError(null);

    // Implement upload functionality
    try {
      console.log(categoryName, "\n", data);
      const request = await fetch("/data/:data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: {
          query: { Category: categoryName },
          json: { Data: JSON.stringify(data) },
        },
      });
      console.log(request);
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
      // setError(error.message);
      // setIsLoading(false);
    }
  };

  return {
    selectedFile,
    status,
    editSelectedCategory,
  };
};
