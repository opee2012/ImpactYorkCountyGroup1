/**
 * Custom hook for handling category editingProvides functionality to edit a selected category by sending a PUT request to the server.
 *
 * @returns {Object} An object containing the selectedFile state, status state, and the editSelectedCategory function.
 */
export const useEdit = () => {
  // State for tracking errors
  const [error, setError] = useState(null);
  // State for tracking the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // State for tracking the status (currently unused)
  const [status] = useState(null);
  // State for tracking loading status (setter function not used)
  const [setIsLoading] = useState(false);

  /**
   * Asynchronously edits a selected category by sending a PUT request to the server.
   * @param {string} categoryName - The name of the category to edit.
   * @param {Object} data - The new data for the category.
   */
  const editSelectedCategory = async (categoryName, data) => {
    setSelectedFile(true);
    setError(null);

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
        console.log(json);
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
