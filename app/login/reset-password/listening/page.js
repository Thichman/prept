import { useEffect } from 'react';
import supabase from '../supabaseClient';

export default function PasswordReset() {
    useEffect(() => {
        const handleAuthChange = async (event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                const newPassword = prompt('What would you like your new password to be?');
                const { data, error } = await supabase.auth.updateUser({ password: newPassword });

                if (data) alert('Password updated successfully!');
                if (error) alert(`There was an error updating your password: ${error.message}`);
            }
        };

        const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthChange);

        // Clean up the listener on component unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Resetting Password</h1>
            <p>Please wait...</p>
        </div>
    );
}