import { useState } from "react";

export const useUserMan = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [data, setData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
            .then(response => {
                if (!response.ok) {
                    
                    throw new Error('Failed to add new login, please make sure to enter a valid email');
                }
                return response.json(); 
            })
            
            .then(data => {
                setData(data);
                setIsLoading(false);
                setSuccessMessage('Login added successfully');
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

      // Function to delete login based on email
    const deleteLogin = async (email) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`/login/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            
        if (response.status === 200) {
            
            const successMessage = 'Login deleted successfully';
            // Set the success message in the state or handle it as needed
            setSuccessMessage(successMessage);
        }

            if (!response.ok) {
                throw new Error('Failed to delete login, please enter a valid email');
            }

            const responseData = await response.json();
            setData(responseData);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };


      return { successMessage, isLoading, error, getAllLogins, addNewLogin, deleteLogin};
}
