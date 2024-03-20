import React from 'react';
import "../styles/userManagement.css";
import AddUserIcon from '../icons/add-email-icon.svg';
import EditUserIcon from '../icons/edit-email-icon.svg';
import DeleteUserIcon from '../icons/delete-email-icon.svg';

const ActionComponent = () => {
    // Example click handlers for each action
    const handleAddEmailClick = () => {
        console.log('Add Email Clicked');
        // Implement your add email logic here
    };

    const handleEditEmailClick = () => {
        console.log('Edit Email Clicked');
        // Implement your edit email logic here
    };

    const handleDeleteEmailClick = () => {
        console.log('Delete Email Clicked');
        // Implement your delete email logic here
    };

    return (
        <div className="action">
            <button className="action-item" onClick={handleAddEmailClick}>
                <img src={AddUserIcon} alt="Add User" className="action-icon" />
                <li>Add Email</li>
            </button>
            <button className="action-item" onClick={handleEditEmailClick}>
                <img src={EditUserIcon} alt="Edit User" className="action-icon" />
                <li>Edit Email</li>
            </button>
            <button className="action-item" onClick={handleDeleteEmailClick}>
                <img src={DeleteUserIcon} alt="Delete User" className="action-icon" />
                <li>Delete Email</li>
            </button>
        </div>
    );
};

const UserManagement = () => {
    return (
        <div className="userManagement">
            <div className="top-panelManagement"></div>
            <div className="sidebarManagement">
                <div className="user-list">
                    <div className="sidebarTitle">User List</div>
                    <ul>
                        <li>User 1</li>
                        <li>User 2</li>
                    </ul>
                </div>
                <ActionComponent />
            </div>
            <div className="content">
                <label>
                    Current Email:
                    <input type="email" value="User3@example.com" readOnly />
                </label>
                <label>
                    New Email:
                    <input type="email" placeholder="Enter new email" />
                </label>
                <label>
                    Confirm Email:
                    <input type="email" placeholder="Confirm new email" />
                </label>
                <button type="submit">Submit</button>
            </div>
        </div>
    );
};

export default UserManagement;
