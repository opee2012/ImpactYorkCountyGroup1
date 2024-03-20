import React, { useState } from 'react';
import "../styles/userManagement.css";
import AddUserIcon from '../icons/add-email-icon.svg';
import EditUserIcon from '../icons/edit-email-icon.svg';
import DeleteUserIcon from '../icons/delete-email-icon.svg';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, email: 'user1@example.com' },
        { id: 2, email: 'user2@example.com' },
    ]);
    const [newEmail, setNewEmail] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [addError, setAddError] = useState(''); // State to track add error

    const handleAddEmail = () => {
        if (newEmail.trim() === '') {
            setAddError(''); // Set error message
            return;
        }
        const newUser = {
            id: users.length + 1,
            email: newEmail,
        };
        setUsers([...users, newUser]);
        setNewEmail('');
        setAddError(''); // Clear error message
    };

    const handleEditEmail = () => {
        const updatedUsers = users.map((user) =>
            user.id === selectedUserId ? { ...user, email: editEmail } : user
        );
        setUsers(updatedUsers);
        setEditEmail('');
        setSelectedUserId(null);
    };

    const handleDeleteEmail = () => {
        const updatedUsers = users.filter((user) => user.id !== selectedUserId);
        setUsers(updatedUsers);
        setSelectedUserId(null);
    };

    const handleUserClick = (id) => {
        setSelectedUserId(id);
        const selectedUser = users.find((user) => user.id === id);
        setEditEmail(selectedUser ? selectedUser.email : '');
    };

    return (
        <div className="userManagement">
            <div className="top-panelManagement"></div>
            <div className="sidebarManagement">
                <div className="user-list">
                    <div className="sidebarTitle">User List</div>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} onClick={() => handleUserClick(user.id)}>
                                {user.email}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="action">
                    <button className="action-item" onClick={handleAddEmail}>
                        <img src={AddUserIcon} alt="Add User" className="action-icon" />
                        <li>Add Email</li>
                    </button>
                    {addError && <p className="error-message">{addError}</p>} {/* Display error message */}
                    <button className="action-item" onClick={handleEditEmail}>
                        <img src={EditUserIcon} alt="Edit User" className="action-icon" />
                        <li>Edit Email</li>
                    </button>
                    <button className="action-item" onClick={handleDeleteEmail}>
                        <img src={DeleteUserIcon} alt="Delete User" className="action-icon" />
                        <li>Delete Email</li>
                    </button>
                </div>
            </div>
            <div className="content">
                <label>
                    Enter Email:
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter new email"
                    />
                </label>
            </div>
        </div>
    );
};

export default UserManagement;
