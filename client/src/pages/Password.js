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
  const [passwordVisible, setPasswordVisible] = useState(false);
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

    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\%\&\!\@\-\_\=\+\?])(?=.*[a-zA-Z]).{8,20}$/;

    if (!passwordRegex.test(newPassword)) {
      setError("Password must contain the following:<br />- At least 1 uppercase letter<br />- At least 1 lowercase letter<br />- At least 1 number<br />- At least 1 special character<br />- Minimum 8 characters");
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
          className="img-password"
          src="/IYC.png"
          alt="IYC logo"
          style={{ }}
        />
      </div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword" className="label-text">
            Current Password:
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
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
            type={passwordVisible ? "text" : "password"}
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
            type={passwordVisible ? "text" : "password"}
            id="confirmNewPassword"
            className="change-password-input"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        {errorClient.split('<br />').map((line, index) => (
          <p key={index} style={{ color: 'red' }}>
            {line}
          </p>
        ))}
        <button type="submit">Change Password</button> <br />
        <button type="submit" onClick={() => window.location.assign('/password')} >Cancel</button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;