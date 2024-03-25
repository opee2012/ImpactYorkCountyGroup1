import { useState } from "react";

export const usePassword = () => {
    const [error, setError] = useState(null);

    const updateLogin = async (targetEmail, newPassword, Admin) => {
        try {
            const response = await fetch(`/login/${encodeURIComponent(targetEmail)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: targetEmail, password: newPassword, admin: Admin})
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            const data = await response.json();
            // Assuming token is returned upon successful update
            const { token } = data;
            // may want to handle token here
            return token;
        } catch (error) {
            setError(error.message);
            return null;
        }
    };

    return { error, updateLogin };

}