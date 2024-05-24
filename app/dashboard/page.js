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
    const [currentStep, setCurrentStep] = useState(0);

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

    const nextStep = () => {
        setCurrentStep((prevStep) => (prevStep + 1) % 3);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => (prevStep - 1 + 3) % 3);
    };

    const renderFormStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition-transform duration-500">
                        <h2 className="text-xl text-gray-800 font-bold mb-4">Enter Prospect Information</h2>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="linkdin" className="block text-gray-700">LinkedIn Link</label>
                            <input type="text" id="linkdin" name="linkdin" value={formData.linkdin} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition-transform duration-500">
                        <h2 className="text-xl text-gray-800 font-bold mb-4">Enter Social Media Links</h2>
                        <div className="mb-4">
                            <label htmlFor="instagram" className="block text-gray-700">Instagram Link</label>
                            <input type="text" id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div>
                        {/* <div className="mb-4">
                            <label htmlFor="facebook" className="block text-gray-700">Facebook Link</label>
                            <input type="text" id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div> */}
                    </div>
                );
            case 2:
                return (
                    <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg transition-transform duration-500">
                        <h2 className="text-xl text-gray-800 font-bold mb-4">Review and Submit</h2>
                        <form onSubmit={handleSubmit}>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-[650px] mx-auto py-8">
                <div className="relative w-full">
                    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                        {renderFormStep()}
                    </div>
                    {currentStep > 0 && (
                        <button onClick={prevStep} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                    )}
                    {currentStep < 2 && (
                        <button onClick={nextStep} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="sr-only">Next</span>
                            </span>
                        </button>
                    )}
                </div>
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