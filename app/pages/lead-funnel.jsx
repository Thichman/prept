'use client'
import { useState } from 'react';

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
            // Handle success response as needed
        } catch (error) {
            console.error('Error submitting form data:', error.message);
            // Handle error response as needed
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-4">Unlock Exclusive Content!</h1>
            <p className="text-lg mb-6">Sign up now to access our premium content and stay updated with the latest news and insights.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                </div>
                <div>
                    <label htmlFor="answer" className="block text-gray-700">Answer the Question:</label>
                    <input type="text" id="answer" name="answer" value={formData.answer} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
            </form>
        </div>
    );
};

export default LeadFunnel;
