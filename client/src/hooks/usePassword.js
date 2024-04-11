/**
 * Custom hook for handling password updates.
 * @returns {Object} An object containing the error state and updateLogin function.
 */
export const usePassword = () => {
    // State for tracking errors
    const [error, setError] = useState(null);

    /**
     * Updates the login information for a user.
     * @param {string} targetEmail - The email of the user whose password is being updated.
     * @param {string} newPassword - The new password for the user.
     * @param {boolean} Admin - The admin status of the user.
     * @returns {string|null} The token if the update is successful, or null if there's an error.
     */
    const updateLogin = async (targetEmail, newPassword, Admin) => {
        try {
            const response = await fetch(`/login/${encodeURIComponent(targetEmail)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: targetEmail, password: newPassword, admin: Admin})
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            const data = await response.json();
            // Assuming token is returned upon successful update
            const { token } = data;
            // may want to handle token here
            return token;
        } catch (error) {
            setError(error.message);
            return null;
        }
    };

    return { error, updateLogin };
}
