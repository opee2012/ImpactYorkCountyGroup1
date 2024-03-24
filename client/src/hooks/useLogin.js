import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    };
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('email', JSON.stringify(json));

      // update the auth context
      dispatch({type: 'LOGIN', payload: json});

      // update loading state
      setIsLoading(false);
    };
  };

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

const updateLogin = async (targetEmail, newEmail) => {
  try {
      const response = await fetch(`/login/${targetEmail}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: newEmail }),
      });
      if (!response.ok) {
          throw new Error('Failed to update login');
      }
      return await response.json();
  } catch (error) {
      throw error;
  }
};

  return { login, isLoading, error, getAllLogins, updateLogin };
}