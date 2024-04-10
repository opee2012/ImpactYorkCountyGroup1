import React, { useState, useEffect } from 'react';
import "../styles/userManagement.css";
import AddUserIcon from '../icons/add-email-icon.svg';
import EditUserIcon from '../icons/edit-email-icon.svg';
import DeleteUserIcon from '../icons/delete-email-icon.svg';
import { useUserMan } from '../hooks/useUserMan';

// UserManagement component for managing user emails
const UserManagement = () => {
    // State for storing users, new email, edit email, error message, and showing edit form
    const [users, setUsers] = useState([]);
    const [newEmail, setNewEmail] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [addError, setAddError] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const { deleteLogin, addNewLogin, getAllLogins, successMessage, isLoading, error } = useUserMan();

    function reloadPageAfterDelay(delay) {
        setTimeout(() => {
          window.location.reload();
        }, delay);
    }
      
    useEffect(() => {
        const fetchLogins = async () => {
            try {
                const logins = await getAllLogins();
                setUsers(logins);
            } catch (error) {
                console.error('Error fetching logins:', error);
            }
        };
        fetchLogins();
    }, []);

    function generateRandomString(length) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?';
        let password = '';
    
        // Ensure the password length is at least 8 characters
        length = Math.max(length, 8);
    
        // Add at least one special character
        password += '!@#$%&*?'.charAt(Math.floor(Math.random() * 8));
    
        // Add at least one number
        password += '0123456789'.charAt(Math.floor(Math.random() * 10));
    
        // Generate the rest of the characters
        for (let i = 0; i < length - 2; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
    
        // Shuffle the string
        password = password.split('').sort(() => Math.random() - 0.5).join('');
    
        return password;
    }
    
    // Generate a random string with at least 8 characters
    const randomTempPass = generateRandomString(8);
   
           const handleAddEmail = async () => {
            if (newEmail.trim() === '') {
                setAddError('Please add a email');
                return;
            }
            try {
                const password = randomTempPass;
                const admin = isAdmin; 
                console.log(randomTempPass);
                
                await addNewLogin(newEmail, password, admin);
        
                // Fetch logins again to update the user list
                const logins = await getAllLogins();
                setUsers(logins);
                setNewEmail('');
                setAddError('');
                //reloadPageAfterDelay(1000); 
            } catch (error) {
                console.error('Error adding login:', error);
                setAddError('Failed to add login');
            }
        };

    // handle delete email
    const handleDeleteEmail = async () => {
        if (newEmail.trim() === '') {
            setAddError('Please enter an email to delete');
            return;
        }
        try {
            await deleteLogin(newEmail);
            setNewEmail('');
            setAddError('');
            reloadPageAfterDelay(1000); 
        } catch (error) {
            console.error('Error deleting login:', error);
            setAddError('Failed to delete login');
        }
    };

    const handleAdminChange = (e) => {
        setIsAdmin(e.target.checked);
    };

    const handleEditButtonClick = (user) => {
       
        setNewEmail(user.email);
        setIsAdmin(user.admin);
    };
    


    return (
        <div className="userManagement">
            <div className="top-panelManagement"></div>
            <div className="sidebarManagement">
                <div className="user-list">
                    <div className="sidebarTitle">User List</div>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} onClick={() => handleEditButtonClick(user)}>{user.email} {user.admin && <span style={{color: "blue"}}>(Admin)</span>}</li>
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
                        placeholder="Click on Email or Enter Email"
                    />
                    {successMessage && <p className='success-message'>{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                </label>
                <div className="admin-checkbox">
                    
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={handleAdminChange}
                        />
                        Admin
                    
                </div>
                <div className="action">
                    <button className="action-item fixed-width-button" onClick={handleAddEmail}>
                        <img src={AddUserIcon} alt="Add User" className="action-icon" />
                        Add Email
                    </button>
                    <button className="action-item fixed-width-button" onClick={handleDeleteEmail}>
                        <img src={DeleteUserIcon} alt="Delete User" className="action-icon" />
                        Delete Email
                    </button>
                </div>
                <div className='navigation fixed-width-button'>
                    <button type="submit" onClick={() => window.location.assign('/')} >Back to Dashboard</button>
                </div>
                
            </div>
        </div>
    );
};

export default UserManagement;


 /*// Handle showing the edit email form only if there is a value in the "Enter Email" input
    const handleEditButtonClick = () => {
        if (newEmail.trim() !== '') {
            setShowEditForm(true);
        } else {
            setAddError('');
        }
    };*/

    /*   const handleEditEmail = async () => {
        if (newEmail.trim() === '' || editEmail.trim() === '') {
            setAddError('Please enter both new and old email');
            return;
        }
        try {
            const updatedUsers = users.map((user) =>
                user.email === editEmail ? { ...user, email: newEmail } : user
            );
            setUsers(updatedUsers);
            setEditEmail('');
            setNewEmail('');
            setShowEditForm(false);
        } catch (error) {
            console.error('Error updating login:', error);
            setAddError('Failed to update login');
        }
    };
    
    <button className="action-item" onClick={handleEditButtonClick}>
                        <img src={EditUserIcon} alt="Edit User" className="action-icon" />
                        Edit Email
                    </button>

     {showEditForm && (
                    <label>
                        New Email:
                        <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            placeholder="Enter new email"
                        />
                        <button onClick={handleEditEmail}>Submit</button>
                    </label>
                )}                
    
    */