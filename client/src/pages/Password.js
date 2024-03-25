import React, { useState } from 'react';
import { useAuthContext } from "../context/AuthContext";

import "../styles/Password.css";

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const { state, isLoading } = useAuthContext();
  const { email } = state || {};

  console.log(email);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (newPassword !== confirmNewPassword) {
      setError("Passwords don't match");
      return;
    }

    // Your password change logic here
    console.log('Password change request:', {
      currentPassword,
      newPassword,
    });

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
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Change Password</button> <br />
        <button type="submit" onClick={() => window.location.assign('/upload')} >Cancel</button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;