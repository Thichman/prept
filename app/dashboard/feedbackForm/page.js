'use client';

import { useState } from 'react';
import { sendToDatabase } from './sendToDatabase'
export default function FeedbackForm() {
    const [formData, setFormData] = useState({
        companyRole: '',
        likelihoodToUse: '',
        experience: '',
        helpsJob: '',
        phoneNumber: '',
        dislikes: '',
        likes: '',
        missingFeatures: '',
        openFeedback: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formSubmit = await sendToDatabase(formData)
        if (formSubmit === true) {
            setFormSubmitted(true);
            setTimeout(() => {
                window.location.href = "/";
            }, 5000);
        }
    };

    const showLinkedInMessage = () => {
        const likelihood = parseInt(formData.likelihoodToUse, 10);
        const experience = parseInt(formData.experience, 10);
        return likelihood > 5 && experience > 5;
    };

    if (formSubmitted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                    <h1 className="text-2xl font-bold mb-6 text-black">Thank You!</h1>
                    <p className="mb-6 text-gray-700">
                        Your feedback has been successfully submitted. We appreciate your time and valuable input.
                    </p>
                    <p className="mb-6 text-gray-700">
                        You will be redirected to the home page shortly.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-black">Prept.AI Feedback</h1>
                <p className="mb-6 text-gray-700">
                    Thank you for using our product! We greatly value your feedback and would love to hear your thoughts and experiences.
                    As a token of our appreciation, if you fill out this form upon launch, you will receive a one-month credit on your subscription.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    <div>
                        <label className="block text-gray-700">Company Role</label>
                        <input
                            type="text"
                            name="companyRole"
                            value={formData.companyRole}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">How likely are you to use the full version? (1-10)</label>
                        <input
                            type="number"
                            name="likelihoodToUse"
                            value={formData.likelihoodToUse}
                            onChange={handleChange}
                            min="1"
                            max="10"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">How was your experience? (1-10)</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            min="1"
                            max="10"
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Does this tool help you do your job? (Y/N)</label>
                        <input
                            type="text"
                            name="helpsJob"
                            value={formData.helpsJob}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone Number (Optional)</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">What did you dislike?</label>
                        <textarea
                            name="dislikes"
                            value={formData.dislikes}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">What did you like about Prept?</label>
                        <textarea
                            name="likes"
                            value={formData.likes}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Was there anything missing that you wish we had?</label>
                        <textarea
                            name="missingFeatures"
                            value={formData.missingFeatures}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Additional Feedback</label>
                        <textarea
                            name="openFeedback"
                            value={formData.openFeedback}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    {showLinkedInMessage() && (
                        <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg text-blue-700 mt-4">
                            We are glad you enjoyed the free version! Follow us on <a href="https://www.linkedin.com/company/100270847" target="_blank" rel="noopener noreferrer" className="underline">LinkedIn</a> for more updates.
                        </div>
                    )}
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
