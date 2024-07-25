'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import getUser from './getUser';

export default function LoadingScreen() {
    const router = useRouter();

    useEffect(() => {

        const timer = setTimeout(async () => {
            const userIsLoggedIn = await getUser();
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
        </div>
    );
}
