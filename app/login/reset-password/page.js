'use client';
import { useState } from 'react';
import { getSupabaseResetPasswordClient } from './supabase';

export default function PasswordResetRequest() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPasswordRequest = async (event) => {
        event.preventDefault();
        const supabase = await getSupabaseResetPasswordClient();

        // Update this URL to your actual password reset page URL
        //this will need to be updated for production
        const redirectTo = 'http://localhost:3000/login/reset-password/listening';

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo
        });

        if (error) {
            setMessage(`Error: ${error.message}`);
        } else {
            setMessage('Password reset email sent. Please check your inbox.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
            <form onSubmit={handleResetPasswordRequest}>
                <label className="block mb-2">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        required
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                    Reset Password
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
