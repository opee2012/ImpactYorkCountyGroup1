import { useState } from "react";
export const useEdit = () => {
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status ] = useState(null);
  const [ setIsLoading] = useState(false);

  const editSelectedCategory = async (categoryName, data) => {
    setSelectedFile(true);
    setError(null);

    // Implement upload functionality
    try {
      const request = await fetch("/data/:data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: { Category: categoryName },
          json: { Data: data },
        }),
      });
      console.log(request);
      if (!request.ok) {
        throw new Error(`Request failed with status ${request.status}`);
      } else {
        const json = await request.json();
        // console.log(json);
        return json;
      }

    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return {
    selectedFile,
    status,
    editSelectedCategory,
  };
};
