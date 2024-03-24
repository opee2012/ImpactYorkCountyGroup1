import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch, state } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    
    const body = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(body.message);
    } else {
      const { email, admin } = body;

      console.log(state);

      // update the auth context
      dispatch({ type: 'LOGIN', payload: { email, admin } });

      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}