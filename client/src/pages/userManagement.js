import React from 'react';
import "../styles/userManagement.css"
import AddUserIcon from '../icons/add-email-icon.svg';
import EditUserIcon from '../icons/edit-email-icon.svg';
import DeleteUserIcon from '../icons/delete-email-icon.svg';

const userManagement = () => {
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
                <div className="action">
                    <div className="action-item">
                        <img src={AddUserIcon} alt="Add User" className="action-icon" />
                        <li>Add Email</li>
                    </div>
                    <div className="action-item">
                        <img src={EditUserIcon} alt="Edit User" className="action-icon" />
                        <li>Edit Email</li>
                    </div>
                    <div className="action-item">
                        <img src={DeleteUserIcon} alt="Delete User" className="action-icon" />
                        <li>Delete Email</li>
                    </div>
                </div>

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

export default userManagement;