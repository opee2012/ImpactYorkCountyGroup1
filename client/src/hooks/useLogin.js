/**
 * Custom hook for handling user login.
 * @returns {Object} An object containing the login function, isLoading state, and error state.
 */
export const useLogin = () => {
  // State for tracking errors
  const [error, setError] = useState(null);
  // State for tracking loading status
  const [isLoading, setIsLoading] = useState(null);
  // Context for dispatching actions to the AuthContext
  const { dispatch } = useAuthContext();

  /**
   * Authenticates a user and updates the AuthContext.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   */
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

      // Store user in local storage
      localStorage.setItem('email', JSON.stringify(email));
      localStorage.setItem('admin', JSON.stringify(admin));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: { email, admin } });

      // Update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
