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
        }, 5500);

        return () => clearTimeout(timer);
    }, [router]);

    useEffect(() => {
        // Delay the shimmer effect until typing animation is complete
        const shimmerTimer = setTimeout(() => {
            document.querySelector('.text-container').classList.add('shimmer');
        }, 4000); // Adjust this timing to match the typing animation duration

        return () => clearTimeout(shimmerTimer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-container">
                <span className="brefd">Bréfd</span><span className="ai"> ai</span>
            </div>

            <style jsx>{`
                @keyframes typing {
                    from {
                        width: 0;
                    }
                    to {
                        width: 100%;
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -500px 0;
                    }
                    100% {
                        background-position: 500px 0;
                    }
                }

                .text-container {
                    display: inline-block;
                    overflow: hidden;
                    white-space: nowrap;
                    border-right: 0.15em solid black;
                    font-size: 5em; /* Increase font size */
                    font-family: 'Courier New', Courier, monospace;
                    color: #000;
                    animation: typing 4s steps(40, end), blink-caret 0.75s step-end infinite;
                }

                .brefd {
                    color: #6c63ff; /* Custom purple */
                }

                .ai {
                    color: #000;
                }

                .shimmer {
                    background: linear-gradient(90deg, #fff 25%, #f3f3f3 50%, #fff 75%);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                    color: transparent;
                    -webkit-background-clip: text;
                }

                @keyframes blink-caret {
                    from, to {
                        border-color: transparent;
                    }
                    50% {
                        border-color: black;
                    }
                }
            `}</style>
        </div>
    );
}
