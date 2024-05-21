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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="max-w-[650px] mx-auto py-8">
                <form onSubmit={handleSubmit} className="w-full">
                    <h2 className="text-2xl font-bold mb-4">Enter Your Information</h2>
                    <div className="mb-4">
                        <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="linkedin" className="block text-gray-700">LinkedIn Link</label>
                        <input type="text" id="linkdin" name="linkdin" value={formData.linkdin} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black" />
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="facebook" className="block text-gray-700">Facebook Link</label>
                        <input type="text" id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black" />
                    </div> */}
                    <div className="mb-4">
                        <label htmlFor="instagram" className="block text-gray-700">Instagram Link</label>
                        <input type="text" id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-black" />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                </form>
            </div>
            <div className="w-full max-w-[650px] bg-gray-100 p-4 rounded-lg mt-8">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 font-xxl">Summary</h2>
                {summary ? (
                    <div>
                        <p className="mb-4 text-black">{summary}</p>
                        <button onClick={handleDownloadPDF} className="bg-blue-500 text-back py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Download PDF</button>
                    </div>
                ) : (
                    <p className="text-gray-800">Enter your information and click submit to generate summary.</p>
                )}
            </div>
        </div>
    );
};