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

    const { addNewLogin, getAllLogins, isLoading, error } = useUserMan();

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


   
           const handleAddEmail = async () => {
            if (newEmail.trim() === '') {
                setAddError('Please add a email');
                return;
            }
            try {
                const password = 'abc123';
                const admin = false; 
                
                await addNewLogin(newEmail, password, admin);
        
                // Fetch logins again to update the user list
                const logins = await getAllLogins();
                setUsers(logins);
                setNewEmail('');
                setAddError('');
            } catch (error) {
                console.error('Error adding login:', error);
                setAddError('Failed to add login');
            }
        };

    const handleEditEmail = async () => {
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

    
    // Handle deleting an email
    const handleDeleteEmail = () => {
        const updatedUsers = users.filter((user) => user.email !== newEmail);
        setUsers(updatedUsers);
        setNewEmail('');
    };

    // Handle showing the edit email form only if there is a value in the "Enter Email" input
    const handleEditButtonClick = () => {
        if (newEmail.trim() !== '') {
            setShowEditForm(true);
        } else {
            setAddError('');
        }
    };


    return (
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
                    {addError && <p className="error-message">{addError}</p>}
                </label>
                <div className="action">
                    <button className="action-item" onClick={handleAddEmail}>
                        <img src={AddUserIcon} alt="Add User" className="action-icon" />
                        Add Email
                    </button>
                    <button className="action-item" onClick={handleEditButtonClick}>
                        <img src={EditUserIcon} alt="Edit User" className="action-icon" />
                        Edit Email
                    </button>
                    <button className="action-item" onClick={handleDeleteEmail}>
                        <img src={DeleteUserIcon} alt="Delete User" className="action-icon" />
                        Delete Email
                    </button>
                </div>
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
            </div>
        </div>
    );
};

export default UserManagement;