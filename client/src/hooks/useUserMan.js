import { useState } from "react";

export const useUserMan = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [data, setData] = useState(null);

    const getAllLogins = async () => {
        setIsLoading(true);
        setError(null);
    
        try {
            const response = await fetch('/login', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
    
            const json = await response.json();
    
            // Update loading state
            setIsLoading(false);
    
            return json; // Return the fetched data
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
            return null; // Return null in case of an error
        }
    };

    const addNewLogin = (email, password, admin) => {
        setIsLoading(true);
        setError(null);
        try {
            // Make sure email and password are not empty
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
      
            // Send login data to the server
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, admin }),
            })
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
      };


      return { isLoading, error, getAllLogins, addNewLogin};
}
