'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getUser from './getUser'

export default function LoadingScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Replace with your user check logic
            const userIsLoggedIn = async () => await getUser();

            if (userIsLoggedIn) {
                router.push('/dashboard');
            } else {
                router.push('/login');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <video autoPlay muted loop width="320" height="240">
                <source src="/videos/robot1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
