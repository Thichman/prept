import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';

const InformationFinder = ({ onAcceptResult, submit, timeout }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [results, setResults] = useState({ nameOnly: [], nameAndCompany: [], allCriteria: [] });
    const [selectedUrl, setSelectedUrl] = useState('');
    const [linkPreview, setLinkPreview] = useState(null);
    const [fetchingPreview, setFetchingPreview] = useState(false);
    const [submittedLinks, setSubmittedLinks] = useState(new Set());
    const [customLink, setCustomLink] = useState('');
    const [showCustomLinkInput, setShowCustomLinkInput] = useState(false);
    const [activeTab, setActiveTab] = useState('nameOnly');
    const [showResults, setShowResults] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [customLinks, setCustomLinks] = useState([]);
    const [loading, setLoading] = useState(false);
    const iframeRef = useRef(null);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const nameResponse = await axios.post('/api/search/', { name });
            const nameAndCompanyResponse = await axios.post('/api/search/', { name, company });
            const allCriteriaResponse = await axios.post('/api/search/', { name, company, role });
            setResults({
                nameOnly: nameResponse.data,
                nameAndCompany: nameAndCompanyResponse.data,
                allCriteria: allCriteriaResponse.data,
            });
            setShowResults(true);
        } catch (error) {
            console.error('Error during search:', error);
        } finally {
            setLoading(false);
        }
    };

    const acceptResult = (result) => {
        console.log('Accepted result:', result);
        setSubmittedLinks((prev) => new Set(prev).add(result.link));
        onAcceptResult(result.link); // Send the accepted link to the parent component
    };

    const submitForm = () => {
        submit();
    };

    const customFetcher = async (url) => {
        setFetchingPreview(true);
        try {
            const response = await axios.post('/api/search/link-preview', { url });
            console.log('Link preview data:', response.data);
            setLinkPreview(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching link preview:', error);
            setLinkPreview(null);
            throw error;
        } finally {
            setFetchingPreview(false);
        }
    };

    useEffect(() => {
        if (selectedUrl) {
            customFetcher(selectedUrl).catch(() => { });
            setShowSidebar(true);
        }
    }, [selectedUrl]);

    const getActiveTabResults = () => {
        switch (activeTab) {
            case 'nameOnly':
                return results.nameOnly;
            case 'nameAndCompany':
                return results.nameAndCompany;
            case 'allCriteria':
                return results.allCriteria;
            default:
                return [];
        }
    };

    const handleOutsideClick = (e) => {
        if (iframeRef.current && !iframeRef.current.contains(e.target)) {
            setShowSidebar(false);
            setSelectedUrl('');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleAcceptCustomLink = (link) => {
        const customResult = { link, title: link }; // Custom object for the custom link
        acceptResult(customResult);
    };

    const isFormValid = () => {
        return name.trim() !== '' && company.trim() !== '' && role.trim() !== '';
    };

    return (
        <>
            <div className="information-finder rounded-lg shadow-xl">
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
                ) : (
                    !showResults && (
                        <div className="search-form bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl text-black font-semibold mb-4">Who are we Bréfing for today?</h2>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Company"
                                    className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location (optional)"
                                    className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    placeholder="Role"
                                    className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    onClick={isFormValid() ? handleSearch : null}
                                    className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!isFormValid()}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
            {showResults &&
                <div className="flex pt-4 w-full">
                    <div className="results bg-white p-6 rounded-lg shadow-md mb-6 flex-1">
                        <h2 className="text-xl text-black font-semibold mb-4">Custom Search Results</h2>
                        <div className="tabs mb-4">
                            <button
                                onClick={() => setActiveTab('nameOnly')}
                                className={`p-2 mr-2 rounded-md ${activeTab === 'nameOnly' ? 'bg-brefd-primary-indigo text-white hover:bg-brefd-primary-purple' : 'bg-gray-300 text-black hover:bg-gray-200'}`}
                            >
                                Name Only
                            </button>
                            <button
                                onClick={() => setActiveTab('nameAndCompany')}
                                className={`p-2 mr-2 rounded-md ${activeTab === 'nameAndCompany' ? 'bg-brefd-primary-indigo text-white hover:bg-brefd-primary-purple' : 'bg-gray-300 text-black hover:bg-gray-200'}`}
                            >
                                Name & Company
                            </button>
                            <button
                                onClick={() => setActiveTab('allCriteria')}
                                className={`p-2 rounded-md ${activeTab === 'allCriteria' ? 'bg-brefd-primary-indigo text-white hover:bg-brefd-primary-purple' : 'bg-gray-300 text-black hover:bg-gray-200'}`}
                            >
                                All Criteria
                            </button>
                            {submittedLinks.size > 0 && (
                                <button
                                    onClick={submitForm}
                                    disabled={timeout}
                                    className={`bg-brefd-primary-indigo text-white p-3 rounded-md hover:bg-brefd-primary-purple focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 ml-4 right-6 absolute top-14 ${timeout ? 'opacity-50' : ''}`}
                                >
                                    Submit Results
                                </button>
                            )}
                        </div>
                        {getActiveTabResults().length > 0 &&
                            getActiveTabResults().map((result, index) => (
                                <div
                                    key={index}
                                    className="result-item mb-4 flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span
                                            className={`w-3 h-3 rounded-full ${submittedLinks.has(result.link) ? 'bg-green-500' : 'bg-red-500'}`}
                                        ></span>
                                        <a
                                            href="#"
                                            onClick={() => {
                                                setSelectedUrl(result.link);
                                            }}
                                            className="text-blue-500 hover:underline"
                                        >
                                            {result.title}
                                        </a>
                                    </div>
                                    {!submittedLinks.has(result.link) && (
                                        <button
                                            onClick={() => acceptResult(result)}
                                            className="bg-green-700 text-white p-2 rounded-md hover:bg-green-600 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 ml-4"
                                        >
                                            Accept
                                        </button>
                                    )}
                                </div>
                            ))}
                        {getActiveTabResults().length > 0 && (
                            <div className="custom-link-toggle">
                                <button
                                    onClick={() => setShowCustomLinkInput(!showCustomLinkInput)}
                                    className="bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mt-4"
                                >
                                    {showCustomLinkInput ? 'Hide Custom Link Input' : 'Show Custom Link Input'}
                                </button>
                            </div>
                        )}
                        {showCustomLinkInput && (
                            <div
                                className={`custom-link bg-white p-6 shadow-md mt-4 border border-t-black transition-all duration-500 ease-in-out overflow-hidden ${showCustomLinkInput ? 'max-h-screen' : 'max-h-0'
                                    }`}
                            >
                                <h2 className="text-xl font-semibold mb-4">Add Your Own Link</h2>
                                <input
                                    type="text"
                                    value={customLink}
                                    onChange={(e) => setCustomLink(e.target.value)}
                                    placeholder="Enter your link here"
                                    className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex space-x-2">
                                    <button
                                        onClick={async () => {
                                            if (customLink) {
                                                setSelectedUrl(customLink);
                                            }
                                        }}
                                        className="bg-brefd-primary-purple text-white p-3 rounded-md hover:bg-brefd-primary-indigo focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Preview Link
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (customLink) {
                                                handleAcceptCustomLink(customLink);
                                                setCustomLink('');
                                                setCustomLinks([...customLinks, customLink]);
                                            }
                                        }}
                                        className="bg-green-700 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Accept Link
                                    </button>
                                </div>
                                {customLinks.length > 0 && (
                                    <div className="custom-links-list mt-4">
                                        <h3 className="text-lg font-semibold mb-2">Accepted Custom Links</h3>
                                        <ul className="list-disc list-inside">
                                            {customLinks.map((link, index) => (
                                                <li key={index} className="mb-2 flex items-center">
                                                    <span className={`w-3 h-3 rounded-full bg-green-500 mr-2`}></span>
                                                    <a
                                                        href="#"
                                                        onClick={() => {
                                                            setSelectedUrl(link);
                                                        }}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {link}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="sidebar transition-all duration-300 ease-in-out overflow-y-auto bg-white shadow-md fixed inset-y-0 left-0 w-1/3 z-50 p-4" ref={iframeRef} style={showSidebar ? { transform: 'translateX(0%)' } : { transform: 'translateX(-100%)' }}>
                        <button
                            onClick={() => setShowSidebar(false)}
                            className="text-black font-semibold mb-2"
                        >
                            x
                        </button>
                        {fetchingPreview ? (
                            <p className="text-gray-600 mb-6">Loading preview...</p>
                        ) : linkPreview ? (
                            <div>
                                <h3 className="text-lg text-black font-semibold">{linkPreview.title}</h3>
                                <p className="text-gray-600">{linkPreview.description}</p>
                                {linkPreview.image && linkPreview.image.url && (
                                    <img
                                        src={linkPreview.image.url}
                                        alt={linkPreview.title}
                                        className="w-full h-auto mb-4 text-black"
                                    />
                                )}
                                <a
                                    href={linkPreview.url}
                                    className="text-blue-500 hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {linkPreview.url}
                                </a>
                                <div className='text-brefd-primary-purple'>
                                    <Link href={selectedUrl} target="_blank" rel="noopener noreferrer">Go to the site</Link>
                                </div>
                            </div>
                        ) : (
                            <div>Failed to load preview</div>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default InformationFinder;
