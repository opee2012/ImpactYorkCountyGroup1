import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      
      const body = await response.json();
  
      if (!response.ok) {
        throw new Error(body.message || 'Failed to login');
      } else {
        const { email, admin } = body;
  
        // store user in local storage
        localStorage.setItem('email', JSON.stringify(email));
        localStorage.setItem('admin', JSON.stringify(admin));
  
        // update the auth context
        dispatch({ type: 'LOGIN', payload: { email, admin } });
  
        // update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    
  };

  const forgot = async (email) => {
    setIsLoading(true);

    const response = await fetch('/forgot', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error(body.message || 'Failed to send password reset email');
    }

    const body = await response.json();
    return body.message;
  };

  return { login, forgot, isLoading, setIsLoading};
}