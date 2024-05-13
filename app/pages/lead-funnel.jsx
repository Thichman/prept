'use client'
import { useState } from 'react';
import Header from '../../components/header'

const LeadFunnel = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        answer: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('../api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form data');
            }

            console.log('Form data submitted successfully');
        } catch (error) {
            console.error('Error submitting form data:', error.message);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-200 to-gray-300 min-h-screen items-center">
            <header className="bg-prept-color-header-gray-black text-white px-4 py-2 flex items-center justify-between w-screen  h-14">
                <div className='text-4xl text-prept-color-main-green'>
                    Prept.AI
                </div>
            </header>
            <div className="max-w-3xl mx-auto mt-8 px-4">
                <div className="bg-gray-100 p-6 rounded-lg mb-4">
                    <h2 className="text-4xl font-bold mb-2">Unlock the Power of Connection with Prept AI</h2>
                    <p>In a fast-paced world where every interaction counts, Prept AI revolutionizes the way you connect with people. Imagine stepping into a meeting armed with comprehensive insights about the person you're meeting.</p>
                </div>
                <div className='flex'>
                    <div className="bg-gray-100 p-6 rounded-lg mb-4">
                        <h2 className="text-xl font-bold mb-2">Seize Opportunities, Close Deals</h2>
                        <p>In the competitive landscape of business, every opportunity matters. Prept AI equips you with the tools to seize those opportunities and turn them into closed deals.</p>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg mb-4">
                        <h2 className="text-xl font-bold mb-2 bg-prept-color-background-lighter-green rounded-xl ml-2">More Than Just Data: Personalized Insights</h2>
                        <p>Prept AI goes beyond data aggregation; it provides personalized insights that drive meaningful connections. From understanding their professional background to uncovering mutual interests, Prept AI empowers you to find common ground and build rapport effortlessly.</p>
                    </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-2">Effortless Preparation, Impactful Results</h2>
                    <p>Gone are the days of last-minute research and guesswork. With Prept AI, preparation becomes effortless, and results become impactful. Spend less time gathering information and more time building relationships that drive success.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-2">Stay Ahead of the Curve with Early Access</h2>
                    <p>Be among the first to experience the game-changing capabilities of Prept AI by signing up for early access today. Gain exclusive access to cutting-edge features, provide feedback that shapes the future of the platform, and stay ahead of the curve in your industry.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-2">Make Every Connection Count</h2>
                    <p>Whether you're networking at a conference, pitching to a potential client, or catching up with a colleague, Prept AI ensures that every connection counts. Maximize your impact, deepen your relationships, and achieve your goals with confidence.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-2">Transform Your Interactions, Transform Your Success</h2>
                    <p>Your interactions shape your success. With Prept AI, you have the power to transform every interaction into a catalyst for success. Elevate your communication, amplify your influence, and unlock new opportunities with Prept AI by your side.</p>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-2">Join the Prept AI Community Today</h2>
                    <p>Join a community of forward-thinkers, innovators, and relationship-builders who are revolutionizing the way we connect. Sign up for early access to Prept AI and embark on a journey of meaningful connections, impactful conversations, and limitless possibilities.</p>
                </div>
            </div>
            <div className="flex justify-center items-center h-full">
                <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4 text-center">Sign up to be the first to use Prept AI</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring" required />
                        </div>
                        <div>
                            <label htmlFor="answer" className="block text-gray-700">Answer the Question:</label>
                            <input type="text" id="answer" name="answer" value={formData.answer} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeadFunnel;
