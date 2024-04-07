import React, { useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import { usePassword } from "../hooks/usePassword";
import { useLogout } from "../hooks/useLogout";

import "../styles/Password.css";

/**
* ChangePasswordForm component allows users to change their password.
* It provides input fields for the current password, new password, and confirmation of the new password.
* The component also handles form submission, validation, and updating the password.
 * @returns {JSX.Element} The rendered Password component.
 */
const ChangePasswordForm = () => {
  // State variables for form input values and error messages.
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorClient, setError] = useState('');

  // Hooks for user authentication and password update functionality.
  const { logout } = useLogout();
  const { state } = useAuthContext();
  const { email, admin } = state || {};
  const { updateLogin } = usePassword();

  // Remove quotes from the email string.
  const emailWithoutQuotes = email.replace(/"/g, '');

  /**
  * Handles the form submission and password change process.
  * Performs client-side validation of the input fields and updates the password if validation passes.
  * Redirects the user to the home page upon successful password update.
  * @param {object} e - The event object from the form submission.
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation for input fields.
    if (!currentPassword.trim()) {
      setError("Please enter your current password");
      return;
    }
    if (!newPassword.trim()) {
      setError("Please enter your new password");
      return;
    }
    if (!confirmNewPassword.trim()) {
      setError("Please confirm your new password");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("Passwords don't match");
      return;
    }

    // Update password and handle the response.
    const token = await updateLogin(emailWithoutQuotes, newPassword, admin);
    if (token) {
      // Redirect to the home page after successful password update.
      logout();
      window.location.assign('/');
    } else {
      // Display an error message if the password update fails.
      console.error('Failed to update password');
    }
  };

  // Render the change password form.
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
        {/* Input field for the current password. */}
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
        {/* Input field for the new password. */}
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
        {/* Input field for confirming the new password. */}
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
        {/* Display error messages to the user. */}
        {errorClient && <div style={{ color: 'red' }}>{errorClient}</div>}
        {/* Buttons for submitting the form or canceling the operation. */}
        <button type="submit">Change Password</button> <br />
        <button type="submit" onClick={() => window.location.assign('/upload')} >Cancel</button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
