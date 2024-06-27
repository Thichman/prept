'use client'
import { useState, useEffect } from "react";
import { mainScraper } from "./data-scraping/main-scraper";
import { jsPDF } from "jspdf";
import ChatInterface from "./components/chat";

//imports to delete after test phase
import { increaseCallCount } from "./test-functions/increaseCallCount"
import { callNumber } from "./test-functions/callNumber"
import { useRouter } from 'next/navigation'
export default function dashboard() {
    const [formData, setFormData] = useState({
        facebook: '',
        instagram: '',
        linkedin: '',
        fullName: '',
        companyPage: '',
        articleLinks: [''],
    });
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState('');
    const [showAI, setShowAI] = useState(false);
    const [scrapedData, setScrapedData] = useState();

    // delete after test phase
    const router = useRouter();

    useEffect(() => {
        const checkCallNumber = async () => {
            const result = await callNumber();
            if (result >= 5) {
                router.push("/feedbackForm");
            }
        };
        if (loading) {
            checkCallNumber();
        }
    }, [loading]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('articleLinks-')) {
            const index = parseInt(name.split('-')[1], 10);
            const updatedArticleLinks = [...formData.articleLinks];
            updatedArticleLinks[index] = value;
            setFormData({ ...formData, articleLinks: updatedArticleLinks });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAI(false)
        setLoading(true);
        // Construct summary text
        const dataSending = { facebook: formData.facebook, instagram: formData.instagram, linkedin: formData.linkedin, companyPage: formData.companyPage, articleLinks: formData.articleLinks }
        const returnPrompt = await mainScraper(dataSending)
        setScrapedData(returnPrompt)
        await callModel(returnPrompt)
        //delete below functions after test phase
        await increaseCallCount();
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

    // if the amount of steps change then we need to increase the final integer here as well as the integers below
    // AKA the nextStep and prevStep functions if there are 5 cards the number should be 6
    // Also remember to change the tsx variable number on line 317
    const nextStep = () => {
        setDirection('next');
        setCurrentStep((prevStep) => (prevStep + 1) % 7);
    };

    const prevStep = () => {
        setDirection('prev');
        setCurrentStep((prevStep) => (prevStep - 1 + 7) % 7);
    };

    const addArticleLink = () => {
        if (formData.articleLinks.length < 3) {
            setFormData({ ...formData, articleLinks: [...formData.articleLinks, ''] });
        }
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

    const renderFormStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div key={0} className={`form-step bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-[600px] h-[400px] flex flex-col items-center justify-center transition-transform ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
                        <h2 className="text-xl text-gray-800 font-bold mb-4">Who are we talking to today?</h2>
                    </div>
                );
            case 1:
                return (
                    <div key={1} className={`form-step bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-[600px] h-[400px] flex flex-col items-center justify-center transition-transform ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
                        <h2 className="text-xl text-gray-800 font-bold mb-4">Enter Prospect Information</h2>
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-gray-700">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-60 rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1 w-96 items-center text-center">Please enter the full name of the prospect.</p>
                    </div>
                );
            case 2:
                return (
                    <div key={2} className={`form-step bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-[600px] h-[400px] flex flex-col items-center justify-center transition-transform ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
                        <h2 className="text-xl text-gray-800 font-bold mb-4">LinkedIn Profile Link</h2>
                        <div className="mb-4">
                            <input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-60 rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1 w-96 items-center text-center">Please enter the LinkedIn profile URL of the prospect. You can find this by visiting their LinkedIn page and copying the URL from the address bar.</p>
                    </div>
                );
            case 3:
                return (
                    <div key={3} className={`form-step bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-[600px] h-[400px] flex flex-col items-center justify-center transition-transform ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
                        <h2 className="text-xl text-gray-800 font-bold mb-4">Enter Social Media Links</h2>
                        <div className="mb-4">
                            <label htmlFor="instagram" className="block text-gray-700">Instagram Link</label>
                            <input type="url" id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} className="w-60 rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div>
                        {/* <div className="mb-4">
                            <label htmlFor="facebook" className="block text-gray-700">Facebook Link</label>
                            <input type="text" id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} className="w-60 rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div> */}
                        <p className="text-sm text-gray-600 mt-1 w-96 items-center text-center">Please enter the Instagram profile URL of the prospect. You can find this by visiting their Instagram page and copying the URL from the address bar.</p>

                    </div>
                );
            case 4:
                return (
                    <div key={3} className={`form-step bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-[600px] h-[400px] flex flex-col items-center justify-center transition-transform ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
                        <h2 className="text-xl text-gray-800 font-bold mb-4">Company Website Page</h2>
                        <div className="mb-4">
                            <input type="url" id="companyPage" name="companyPage" value={formData.companyPage} onChange={handleChange} className="w-60 rounded-md border-gray-300 shadow-sm text-black bg-gray-200" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1 w-96 items-center text-center">Please enter the URL of the company's website page. This helps us gather more information about the business.</p>
                    </div>
                );
            case 5:
                return (
                    <div key={4} className={`form-step bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-[600px] h-[400px] flex flex-col items-center justify-center transition-transform ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
                        <h2 className="text-xl text-gray-800 font-bold mb-4">Article Links</h2>
                        {formData.articleLinks.map((link, index) => (
                            <div key={index} className="mb-4">
                                <input
                                    type="url"
                                    name={`articleLinks-${index}`}
                                    value={link}
                                    onChange={handleChange}
                                    className="w-60 rounded-md border-gray-300 shadow-sm text-black bg-gray-200"
                                />
                            </div>
                        ))}
                        {formData.articleLinks.length < 3 && (
                            <button onClick={addArticleLink} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Add Link</button>
                        )}
                        <p className="text-sm text-gray-600 mt-4 w-96 items-center text-center">Add links to any articles or news items that pertain to the individual. This can include news articles, blog posts, or other relevant content. This is NOT a primary datapoint.</p>
                    </div>
                );
            case 6:
                const isAnyFieldFilled = Object.keys(formData).some(key => key !== 'fullName' && typeof formData[key] === 'string' && formData[key].trim() !== '');
                return (
                    <div key={5} className={`form-step bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-[600px] h-[400px] flex flex-col items-center justify-center transition-transform ${direction === 'next' ? 'slide-left' : 'slide-right'}`}>
                        {isAnyFieldFilled ? (
                            <>
                                <h2 className="text-xl text-gray-800 font-bold mb-4">Review and Submit</h2>
                                <ul className="list-disc list-inside text-gray-600">
                                    {Object.entries(formData).map(([key, value]) => (
                                        // Only render if the value is truthy and key is not "fullName"
                                        value && key !== "fullName" && key !== "articleLinks" && (
                                            <li key={key}>
                                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                                                {' '}
                                                {Array.isArray(value) ? value.join(', ') : value}
                                            </li>
                                        )
                                    ))}
                                </ul>
                                <form onSubmit={handleSubmit}>
                                    <button type="submit" className="bg-blue-500 text-white mt-6 px-4 h-10 rounded-md hover:bg-blue-600 transition duration-300">Submit</button>
                                </form>
                            </>
                        ) : (
                            <p className="text-xl text-gray-800 font-bold mb-4 w-80">At least 1 piece of data is required.</p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const sidebarStyle = {
        width: sidebarOpen ? '300px' : '0px', // Adjusted width when closed
        transition: 'width 0.3s ease',
        overflow: 'scroll',
        opacity: sidebarOpen ? '100' : '0'
    };

    const contentStyle = {
        opacity: sidebarOpen ? '1' : '0', // Show content only when sidebar is open
        transition: 'opacity 0.3s ease',
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className={"absolute left-0 h-full bg-gray-100 shadow-lg p-4 overflow-scroll"} style={sidebarStyle}>
                {/* Content inside sidebar */}
                <div style={contentStyle}>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Here is how you can effectively use this dashboard to gather comprehensive information:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 mb-4">
                        <li>Enter prospect information such as their full name and LinkedIn profile link.</li>
                        {/* <li>Add social media links like Instagram to gather additional insights.</li> */}
                        <li>Include the company website page to enrich your data collection process.</li>
                        <li>Link any relevant articles or news items related to the individual.</li>
                        <li>Review and submit the form to generate a comprehensive document.</li>
                    </ul>
                    <p className="text-lg text-gray-600 mb-4">
                        Note: The more data points you submit, the longer it will take to generate the document. Also, Sometimes the navigational arrows do not show. If this is the case for you then press the left and right sides of the card to navigate.
                    </p>
                    <p className="text-lg text-gray-600 mb-4">
                        Once submitted, you'll receive a detailed document with all gathered information. You can then interact further using our chatbot to ask questions, draft custom emails, and more.
                    </p>
                    <p className="text-lg text-gray-600 mb-4">
                        Once submitted, you'll receive a detailed document with all gathered information. You can then interact further using our chatbot to ask questions, draft custom emails, and more.
                    </p>
                </div>
                {/* Toggle button */}
                <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={toggleSidebar}>
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 0 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="max-w-[650px] mx-auto py-8">
                <div className="relative w-full">
                    {renderFormStep()}
                    {currentStep > 0 && (
                        <button onClick={prevStep} className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                    )}
                    {currentStep < 6 && (
                        <button onClick={nextStep} className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
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
                {showAI && <ChatInterface context={scrapedData} />}
            </div>
        </div >
    );
};

