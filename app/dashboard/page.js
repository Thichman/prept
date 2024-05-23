'use client'
import { useState } from "react";
import { mainScraper } from "./data-scraping/main-scraper";
import { jsPDF } from "jspdf";


export default function dashboard() {
    const [formData, setFormData] = useState({
        facebook: '',
        instagram: '',
        linkdin: '',
        fullName: ''
    });
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Construct summary text
        const dataSending = { facebook: formData.facebook, instagram: formData.instagram, linkdin: formData.linkdin }
        const returnPrompt = await mainScraper(dataSending)
        await callModel(returnPrompt)
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        const maxLineWidth = doc.internal.pageSize.width - 2 * margin;
        let y = margin;

        const addText = (text, x, y) => {
            const splitText = doc.splitTextToSize(text, maxLineWidth);
            for (let i = 0; i < splitText.length; i++) {
                if (y + 10 > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                }
                doc.text(splitText[i], x, y);
                y += 10;
            }
        };

        addText(summary, margin, y);
        doc.save(`${formData.fullName} summary.pdf`);
    };

    const callModel = async (readyPrompt) => {
        const requestBody = {
            parentData: readyPrompt,
            fullName: formData.fullName,
        };
        const response = await fetch('../api/ai/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),

        })

        const returnPDF = await response.json();
        setSummary(returnPDF.kwargs.content);
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-[650px] mx-auto py-8">
                <form onSubmit={handleSubmit} className="w-full bg-white px-10 py-8 rounded-xl shadow-md max-w-sm">
                    <h2 className="text-xl text-gray-800 font-bold mb-4">Enter Prospect Information</h2>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="linkedin" className="block text-gray-700">LinkedIn Link</label>
                        <input type="text" id="linkdin" name="linkdin" value={formData.linkdin} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="facebook" className="block text-gray-700">Facebook Link</label>
                        <input type="text" id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black" />
                    </div> */}
                    <div className="mb-4">
                        <label htmlFor="instagram" className="block text-gray-700">Instagram Link</label>
                        <input type="text" id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                </form>
            </div>
            <div className="w-full max-w-[800px] min-w-[700px] p-4 rounded-lg mt-8">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                            <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="24"></line>
                                <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                </line>
                                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="24"></line>
                                <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                </line>
                                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="24"></line>
                                <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                                </line>
                            </svg>
                            <span class="text-4xl font-medium text-gray-500">Loading...</span>
                        </div>
                    </div>
                ) : summary ? (
                    <div>
                        <div className="mb-4 text-black bg-gray-300 p-4 rounded-md">
                            {summary.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                        <button onClick={handleDownloadPDF} className="bg-blue-500 text-back py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Download PDF</button>
                    </div>
                ) : null}
            </div>
        </div>
    );
};