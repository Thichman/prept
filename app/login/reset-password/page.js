'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './supabase';

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Step 1: Function to send password reset email
    const sendPasswordResetEmail = async () => {
        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password', // Redirect to this page after clicking reset link in email
        });

        setLoading(false);

        if (error) {
            setMessage('Error: ' + error.message);
        } else {
            setMessage('Check your email for the reset link.');
        }
    };

    // Step 2: Effect to handle password update after reset link is clicked
    useEffect(() => {
        const handleAuthStateChange = async (event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                const newPassword = prompt("What would you like your new password to be?");
                if (!newPassword) {
                    return; // If user cancels prompt, do nothing
                }

                setLoading(true);

                const { error } = await supabase.auth.updateUser({
                    password: newPassword,
                });

                setLoading(false);

                if (error) {
                    setMessage('Error updating password: ' + error.message);
                } else {
                    setMessage('Password updated successfully!');
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000); // Redirect to login page after 3 seconds
                }
            }
        };

        supabase.auth.onAuthStateChange(handleAuthStateChange);

        return () => {
            supabase.auth.removeAuthStateListener(handleAuthStateChange);
        };
    }, [router]);

    // Function to handle form submission (Step 1)
    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail();
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

                {newPassword ? (
                    <div>
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-gray-700">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <button
                            onClick={handleAuthStateChange}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Reset Password'}
                        </button>
                    </form>
                )}

                {message && (
                    <div className="mt-4 text-center text-gray-700">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
