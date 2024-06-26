import { useState } from "react";

export const useDataHandle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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
