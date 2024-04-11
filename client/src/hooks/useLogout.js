/**
 * Custom hook for handling user logout.
 * @returns {Object} An object containing the logout function.
 */
export const useLogout = () => {
  // Context for dispatching actions to the AuthContext
  const { dispatch } = useAuthContext();

  /**
   * Logs out the user by removing user information from local storage and dispatching a logout action.
   */
  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem('email');
    localStorage.removeItem('admin');

    // Dispatch logout action to the AuthContext
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
}
