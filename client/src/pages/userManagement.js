import React, { useState, useEffect } from 'react';
import "../styles/userManagement.css";
import AddUserIcon from '../icons/add-email-icon.svg';
import EditUserIcon from '../icons/edit-email-icon.svg';
import DeleteUserIcon from '../icons/delete-email-icon.svg';
import { useLogin } from '../hooks/useLogin';

// UserManagement component for managing user emails
const UserManagement = () => {
    // State for storing users, new email, edit email, error message, and showing edit form
    const [users, setUsers] = useState([]);
    const [newEmail, setNewEmail] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [addError, setAddError] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);

    const { getAllLogins, updateLogin, isLoading, error } = useLogin();

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


    // Handle adding a new email
    const handleAddEmail = () => {
        if (newEmail.trim() === '') {
            setAddError('');
            return;
        }
        const newUser = {
            id: users.length + 1,
            email: newEmail,
        };
        setUsers([...users, newUser]);
        setNewEmail('');
        setAddError('');
    };

    const handleEditEmail = async () => {
        if (newEmail.trim() === '' || editEmail.trim() === '') {
            setAddError('Please enter both new and old email');
            return;
        }
        try {
            await updateLogin(newEmail, editEmail);
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
                </label>
                <div className="action">
                    <button className="action-item" onClick={handleAddEmail}>
                        <img src={AddUserIcon} alt="Add User" className="action-icon" />
                        Add Email
                    </button>
                    {addError && <p className="error-message">{addError}</p>}
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