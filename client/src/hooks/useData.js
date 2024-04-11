/**
 * Custom hook for handling data fetching.
 * @returns {Object} An object containing the error state, loading state, and fetchData function.
 */
export const useDataHandle = () => {
  // State for tracking errors
  const [error, setError] = useState(null);
  // State for tracking loading status
  const [isLoading, setIsLoading] = useState(null);

  /**
   * Fetches data from the server.
   * @param {Object} data - The data to send in the request body.
   * @returns {Promise<Object>|undefined} The fetched data in JSON format or undefined if an error occurs.
   */
  const fetchData = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/data", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      } else {
        const json = await response.json();
        setIsLoading(false);
        return json;
      }
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { error, isLoading, fetchData };
};
