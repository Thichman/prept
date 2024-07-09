'use client'
import { useState, useEffect } from "react";
import { mainScraper } from "./data-scraping/main-scraper";
import { jsPDF } from "jspdf";
import ChatInterface from "./components/chat";
import InformationFinder from "./components/information-finder/InformationFinder"

export default function dashboard() {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAI, setShowAI] = useState(false);
    const [scrapedData, setScrapedData] = useState();

    const handleAcceptedResult = async (url) => {
        const dataToScrape = {
            linkedin: url.includes('linkedin.com') ? url : null,
            instagram: url.includes('instagram.com') ? url : null,
            otherUrls: !url.includes('linkedin.com') && !url.includes('instagram.com') ? [url] : [],
        };

        try {
            const scrapedResult = await mainScraper(dataToScrape);
            const parsedResult = JSON.parse(scrapedResult);

            console.log(scrapedResult)
            setScrapedData(prevData => ({
                ...prevData,
                ...parsedResult,
            }));
        } catch (error) {
            console.error('Error scraping data:', error);
        }
    };
    const handleSubmit = async () => {
        setShowAI(false)
        setLoading(true);
        await callModel(scrapedData)
    };

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

        const logoText = 'Prept.AI';
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
        doc.save(`${formData.fullName} summary.pdf`);
    };

    const handleShowAI = () => {
        setShowAI(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-[900px] mx-auto py-8">
                <div className="relative w-full">
                    <InformationFinder onAcceptResult={handleAcceptedResult} submit={handleSubmit} />
                </div>
            </div>

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
                        <div className="mb-4 text-black bg-gray-300 p-4 rounded-md">
                            {summary.split('\n').map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <button onClick={handleDownloadPDF} className="bg-blue-500 text-back py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Download PDF</button>
                            <button onClick={handleShowAI} className="bg-blue-500 text-back py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Chat with AI</button>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className="flex items-center justify-center w-full">
                {showAI && <ChatInterface context={JSON.stringify(scrapedData)} />}
            </div>
        </div >
    );
};