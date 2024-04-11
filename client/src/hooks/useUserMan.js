/**
 * Custom hook for handling user management operations.
 * @returns {Object} An object containing state variables and functions related to user management.
 */
export const useUserMan = () => {
    // State variables for tracking errors, loading status, data, and success messages
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [data, setData] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    /**
     * Fetches all logins from the server.
     * @returns {Promise<Object>|null} The fetched data or null if an error occurs.
     */
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
    
            setIsLoading(false);
            return json;
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
            return null;
        }
    };

    /**
     * Adds a new login to the server.
     * @param {string} email - The email of the new login.
     * @param {string} password - The password of the new login.
     * @param {boolean} admin - The admin status of the new login.
     */
    const addNewLogin = (email, password, admin) => {
        setIsLoading(true);
        setError(null);
        try {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
      
            fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

    /**
     * Deletes a login from the server based on the provided email.
     * @param {string} email - The email of the login to be deleted.
     */
    const deleteLogin = async (email) => {
        setIsLoading(true);
        setError(null);
        console.log(email);
        try {
            const response = await fetch(`/login/${email}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.status === 200) {
                setSuccessMessage('Login deleted successfully');
            } else if (!response.ok) {
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

    return { successMessage, isLoading, error, getAllLogins, addNewLogin, deleteLogin };
}
