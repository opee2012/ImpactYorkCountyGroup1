import React, { useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import {usePassword} from "../hooks/usePassword";
import { useLogout } from "../hooks/useLogout";

import "../styles/Password.css";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorClient, setError] = useState('');

  const { logout } = useLogout();

  const { state, isLoading } = useAuthContext();
  const { email, admin } = state || {};


  const { updateLogin, error} = usePassword();

  const emailWithoutQuotes = email.replace(/"/g, '');
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Check if current password field is empty
    if (!currentPassword.trim()) {
      setError("Please enter your current password");
      return;
    }

      // Check if new password field is empty
    if (!newPassword.trim()) {
      setError("Please enter your new password");
      return;
    }

    // Check if confirm new password field is empty
    if (!confirmNewPassword.trim()) {
      setError("Please confirm your new password");
      return;
    }

    // Validation
    if (newPassword !== confirmNewPassword) {
      setError("Passwords don't match");
      return;
    }

    // Call the updatePassword function from the hook
    const token = await updateLogin(emailWithoutQuotes, newPassword, admin);
    if (token) {
      // Password updated successfully, handle success logic here
      console.log('Password updated successfully');
    } else {
      // Error occurred during password update, handle error logic here
      console.error('Failed to update password');
    }
    logout();
    window.location.assign('/')
    // Clear form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setError('');
  };

  return (
    <div className="passwordcontainer">
      <div id="logo">
        <img
          className="img-edit"
          src="/IYC.png"
          alt="IYC logo"
          style={{ width: "265px", height: "auto" }}
        />
      </div>
      <h1>Change Password Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword" className="label-text">
            Current Password:
          </label>
          <input
            type="password"
            id="currentPassword"
            className="change-password-input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword" className="label-text">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            className="change-password-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword" className="label-text">
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            className="change-password-input"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        {errorClient && <div style={{ color: 'red' }}>{errorClient}</div>}
        <button type="submit">Change Password</button> <br />
        <button type="submit" onClick={() => window.location.assign('/upload')} >Cancel</button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;