'use client'
import { useState } from "react";
import { mainScraper } from "./data-scraping/main-scraper";
import { jsPDF } from "jspdf";
import ChatInterface from "./components/chat";
import InformationFinder from "./components/information-finder/InformationFinder"
import { staticPrompts } from './static-props/prompts'
import Summary from "./components/summary/summary";

export default function dashboard() {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAI, setShowAI] = useState(false);
    const [scrapedData, setScrapedData] = useState();
    const [timeout, setTimeout] = useState(false);
    const [sendPrompt, setSendPrompt] = useState('');
    const prompts = staticPrompts();
    const [name, setName] = useState('');

    const handleAcceptedResult = async (url) => {
        setTimeout(true);
        const dataToScrape = {
            linkedin: url.includes('linkedin.com') ? url : null,
            instagram: url.includes('instagram.com') ? url : null,
            otherUrls: !url.includes('linkedin.com') && !url.includes('instagram.com') ? [url] : [],
        };

        try {
            const scrapedResult = await mainScraper(dataToScrape);
            const parsedResult = JSON.parse(scrapedResult);
            setScrapedData(prevData => ({
                ...prevData,
                ...parsedResult,
            }));
        } catch (error) {
            console.error('Error scraping data:', error);
        }
        setTimeout(false)
    };
    const handleSubmit = async () => {
        setShowAI(false)
        setLoading(true);
        await callModel(scrapedData)
    };

    const handleName = (name) => {
        setName(name)
    }

    const callModel = async (readyPrompt) => {
        const requestBody = {
            parentData: readyPrompt,
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

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        const maxLineWidth = doc.internal.pageSize.width - 2 * margin;
        let y = margin;

        const logoText = 'Bréfd';
        doc.setFontSize(20);
        doc.setTextColor('#228B22'); // Main green color
        doc.text(logoText, margin, y);

        // Adjust y position for the next text
        y += 20; // Increase the y value to create some space below the logo

        // Reset font size and text color for the main content
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); // Black color

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
        doc.save(`Bréfd summary.pdf`);
    };

    const handleShowAI = () => {
        setShowAI(!showAI);
    };

    const handleReset = () => {
        setSummary('');
        setScrapedData();
        setLoading(false);
        setShowAI(false);
        setTimeout(false)
    };

    const handlePrompt = (prompt) => {
        setSendPrompt(prompt);
        setShowAI(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {!loading && !summary && (

                <div className="max-w-[900px] mx-auto py-8">
                    <div className="relative w-full">
                        <InformationFinder onAcceptResult={handleAcceptedResult} submit={handleSubmit} timeout={timeout} handleName={handleName} />
                    </div>
                </div>
            )}

            <div className="w-full max-w-[800px] min-w-[700px] p-4 rounded-lg mt-8">
                {loading ? (
                    <div className="flex items-center justify-center">
                        <div aria-label="Loading..." role="status" className="flex items-center space-x-2">
                            <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                                <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="24"></line>
                            </svg>
                            <span className="text-4xl font-medium text-gray-500">Loading...</span>
                        </div>
                    </div>
                ) : summary ? (
                    <div>
                        <div className="max-w-[800px] mx-auto py-8 px-6 rounded-lg shadow-lg bg-white">
                            <Summary summary={summary} name={name} />
                            <div className="flex items-center justify-center space-x-4 mt-4">
                                <button onClick={handleDownloadPDF} className="bg-blue-500 text-back py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Download PDF</button>
                                <button onClick={handleShowAI} className="bg-blue-500 text-back py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Chat with AI</button>
                                <button onClick={handleReset} className="bg-red-500 text-back py-2 px-4 rounded-md hover:bg-red-600 transition duration-300">Bréf Someone New</button>
                            </div>
                        </div>
                        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                            <h1 className="text-2xl items-center justify-center font-bold text-brefd-primary-indigo mb-4">Chat with Our AI using custom prompts</h1>
                            <p className="text-2xl text-left items-center justify-center font-medium text-gray-500">Make sure to update the fields with your information</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.keys(prompts).map((title, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePrompt(prompts[title])}
                                        className="bg-brefd-primary-indigo text-white py-2 px-4 hover:bg-brefd-primary-dark transition duration-300 w-36 rounded-lg grid grid-cols-3 items-center justify-center mt-4 space-x-2"
                                    >
                                        {title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-transform transform ${showAI ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: '600px' }}>
                {showAI && <ChatInterface context={JSON.stringify(scrapedData)} prompt={sendPrompt} />}
            </div>
            {summary &&
                <button
                    onClick={handleShowAI}
                    className={`fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300 ${showAI ? 'translate-x-[-600px] rotate-45' : ''}`}
                >
                    {showAI ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                        >
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
            }
        </div >
    );
};