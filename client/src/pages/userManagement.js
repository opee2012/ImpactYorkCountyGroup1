import React, { useState, useEffect } from 'react';
import "../styles/userManagement.css";
import AddUserIcon from '../icons/add-email-icon.svg';
import DeleteUserIcon from '../icons/delete-email-icon.svg';
import { useUserMan } from '../hooks/useUserMan';

/**
 * UserManagement component for managing user emails.
 * Provides functionality to add, delete, and display user emails.
 * @returns {JSX.Element} The rendered userManagement component.
 */
const UserManagement = () => {
    const [users, setUsers] = useState([]); // Array of user objects.
    const [newEmail, setNewEmail] = useState(''); // Input value for new email.
    const [addError, setAddError] = useState(''); // Error message for adding/deleting emails.

    // Custom hook for user management actions.
    const { deleteLogin, addNewLogin, getAllLogins, successMessage, error } = useUserMan();

    // Effect to fetch all logins when the component mounts.
    useEffect(() => {
        const fetchLogins = async () => {
            try {
                const logins = await getAllLogins(); // Fetch logins from the server.
                setUsers(logins); // Update the users state with fetched logins.
            } catch (error) {
                console.error('Error fetching logins:', error); // Log any errors to the console.
            }
        };
        fetchLogins();
    }, []);

    /**
     * Handles the addition of a new email.
     * Validates the input and updates the user list upon successful addition.
     */
    const handleAddEmail = async () => {
        if (newEmail.trim() === '') {
            setAddError('Please add an email'); // Set error message if input is empty.
            return;
        }
        try {
            const password = 'abc123'; // Dummy password for the new user.
            const admin = false; // New users are not admins by default.

            await addNewLogin(newEmail, password, admin); // Add new login to the server.

            // Fetch logins again to update the user list.
            const logins = await getAllLogins();
            setUsers(logins);
            setNewEmail(''); // Clear the input field.
            setAddError(''); // Clear any error messages.
        } catch (error) {
            console.error('Error adding login:', error);
            setAddError('Failed to add login'); // Set error message on failure.
        }
    };

    /**
     * Handles the deletion of an email.
     * Validates the input and updates the user list upon successful deletion.
     * 1. Checks if the input email is not empty.
     * 2. Attempts to delete the specified email using the deleteLogin function.
     * 3. Fetches the updated list of logins and updates the state.
     * 4. Clears the input field and any error messages.
     * 5. Catches and logs any errors, setting an error message on failure.
     */
    const handleDeleteEmail = async () => {
        if (newEmail.trim() === '') {
            setAddError('Please enter an email to delete'); // Set error message if input is empty.
            return;
        }
        try {
            await deleteLogin(newEmail); // Delete the specified login from the server.
            const logins = await getAllLogins(); // Fetch logins again to update the user list.
            setUsers(logins);
            setNewEmail(''); // Clear the input field.
            setAddError(''); // Clear any error messages.
        } catch (error) {
            console.error('Error deleting login:', error);
            setAddError('Failed to delete login'); // Set error message on failure.
        }
    };

    return (
        /**
         * Renders the UserManagement component, consisting of three main sections:
         * 
         * 1. Top Panel: An empty panel that can be used for additional controls or information.
         * 
         * 2. Sidebar Management: Displays a list of user emails. Each email is rendered as a list item.
         * 
         * 3. Content User: Contains several elements for user interaction:
         *    - An input field for entering an email.
         *    - A success message, displayed when an action (such as adding or deleting an email) is successful.
         *    - An error message, displayed when an action fails.
         *    - Action buttons for adding and deleting emails.
         * 
         * @returns {JSX.Element} The UserManagement component with top panel, sidebar, and content sections.
         */
        <div className="userManagement">
            <div className="top-panelManagement"></div>
            <div className="sidebarManagement">
                <div className="user-list">
                    <div className="sidebarTitle">User List</div>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>{user.email}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="content-user">
                <label>
                    Enter Email:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="..."
                    />
                    {successMessage && <p className='success-message'>{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                </label>
                <div className="action">
                    <button className="action-item" onClick={handleAddEmail}>
                        <img src={AddUserIcon} alt="Add User" className="action-icon" />
                        Add Email
                    </button>
                    <button className="action-item" onClick={handleDeleteEmail}>
                        <img src={DeleteUserIcon} alt="Delete User" className="action-icon" />
                        Delete Email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
