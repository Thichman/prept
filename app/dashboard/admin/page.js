'use client'

import { useEffect, useState } from 'react';
import Card from "../../../components/Card";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaPencilAlt, FaCreditCard } from 'react-icons/fa';
import { getUser } from "./functions/getUser";
import { updatePassword } from "./functions/updatePassword";

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingPassword, setEditingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        // Call the getUser function when the component loads
        const fetchUser = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleEdit = (field) => {
        if (field === 'password') {
            setEditingPassword(true);
        }
        console.log(`Edit ${field}`);
    };

    const handleChangePassword = async () => {
        try {
            await updatePassword(newPassword);
            setEditingPassword(false);
            setNewPassword('');
            alert('Password updated successfully');
        } catch (error) {
            console.error("Error updating password:", error);
            alert('Failed to update password');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Failed to load user data.</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-full text-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
                <div className="mb-6 space-y-4">
                    <Card
                        svg={<FaEnvelope />}
                        text={user.email}
                    />
                </div>
                <div className="mb-6 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                    <Card
                        svg={<FaLock />}
                        text="Change Password"
                        pencilIcon={<FaPencilAlt />}
                        onEdit={() => handleEdit('password')}
                    />
                    {editingPassword && (
                        <div className="p-4 bg-white rounded-lg shadow-md mt-4">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="p-2 border rounded-lg w-full mb-4"
                            />
                            <button
                                onClick={handleChangePassword}
                                className="bg-blue-500 text-white p-2 rounded-lg w-full"
                            >
                                Submit
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-6 space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
                    <Card
                        svg={<FaCreditCard />}
                        text={`Current Plan: ${user.subscription}`}
                    />
                </div>
            </div>
        </div>
    );
}
