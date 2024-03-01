import { useState } from 'react';

export const useDataHandle = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const fetchData = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/data', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      };

      // Handle successful response here (e.g., set data state)
      // ...

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }

    
  
  }
}