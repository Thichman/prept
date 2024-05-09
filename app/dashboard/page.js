'use client'
import { useState } from "react";

export default function dashboard() {
    const [formData, setFormData] = useState({
        facebook: '',
        instagram: '',
        linkedin: '',
        fullName: ''
    });
    const [summary, setSummary] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct summary text
        const summaryText = `Full Name: ${formData.fullName}\n\nFacebook: ${formData.facebook}\nInstagram: ${formData.instagram}\nLinkedIn: ${formData.linkedin}`;
        setSummary(summaryText);
    };

    const handleDownloadPDF = () => {
        // Create a new blob containing the text
        const blob = new Blob([summary], { type: 'application/pdf' });
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'summary.pdf';
        // Simulate a click on the anchor element to trigger the download
        a.click();
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <div className="flex">
                <form onSubmit={handleSubmit} className="w-1/2 mr-4">
                    <h2 className="text-2xl font-bold mb-4">Enter Your Information</h2>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="facebook" className="block text-gray-700">Facebook Link</label>
                        <input type="text" id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="instagram" className="block text-gray-700">Instagram Link</label>
                        <input type="text" id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="linkedin" className="block text-gray-700">LinkedIn Link</label>
                        <input type="text" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                </form>

                {/* Summary Section */}
                <div className="w-1/2 bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Summary</h2>
                    {summary ? (
                        <div>
                            <p className="mb-4">{summary}</p>
                            <button onClick={handleDownloadPDF} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Download PDF</button>
                        </div>
                    ) : (
                        <p className="text-gray-500">Enter your information and click submit to generate summary.</p>
                    )}
                </div>
            </div>
        </div>
    );
};