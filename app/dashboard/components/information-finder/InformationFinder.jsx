import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const InformationFinder = ({ onAcceptResult, submit }) => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [results, setResults] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState('');
    const [linkPreview, setLinkPreview] = useState(null);
    const [iframeError, setIframeError] = useState(false);
    const [fetchingPreview, setFetchingPreview] = useState(false);
    const [submittedLinks, setSubmittedLinks] = useState(new Set());
    const [customLink, setCustomLink] = useState('');
    const [showCustomLinkInput, setShowCustomLinkInput] = useState(false);
    const iframeRef = useRef(null);

    const handleSearch = async () => {
        try {
            const response = await axios.post('/api/search/', {
                name,
                company,
                location,
                role,
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const acceptResult = (result) => {
        console.log('Accepted result:', result);
        setSubmittedLinks(prev => new Set(prev).add(result.link));
        onAcceptResult(result.link); // Send the accepted link to the parent component
    };

    const submitForm = () => {
        submit();
    };

    const fetchLinkPreview = async (url) => {
        setFetchingPreview(true);
        try {
            const response = await axios.post('/api/search/link-preview', { url });
            console.log('Link preview data:', response.data);
            setLinkPreview(response.data);
        } catch (error) {
            console.error('Error fetching link preview:', error);
            setLinkPreview(null);
        } finally {
            setFetchingPreview(false);
        }
    };

    useEffect(() => {
        if (selectedUrl) {
            setIframeError(false);
            fetchLinkPreview(selectedUrl);

            const timeout = setTimeout(() => {
                if (iframeRef.current) {
                    setIframeError(true);
                }
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [selectedUrl]);

    return (
        <>
            <div className="information-finder p-6 bg-white rounded-lg shadow-lg">
                {/* Search Form */}
                <div className="search-form bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-4">Search Information</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Name"
                            className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                            placeholder="Company"
                            className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            placeholder="Location (optional)"
                            className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            placeholder="Role"
                            className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Search
                        </button>
                        {
                            submittedLinks.size > 0 && (
                                <button
                                    onClick={submitForm}
                                    className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 ml-4"
                                >
                                    Submit Results
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex pt-4 w-full">
                {/* Search Results */}
                <div className="results bg-white p-6 rounded-lg shadow-md mb-6 flex-1">
                    <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                    {results.length > 0 && (
                        results.map((result, index) => (
                            <div key={index} className="result-item mb-4 flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <span
                                        className={`w-3 h-3 pr-3 rounded-full ${submittedLinks.has(result.link) ? 'bg-green-500' : 'bg-red-500'} mr-2`}
                                    ></span>
                                    <a
                                        href="#"
                                        onClick={() => {
                                            setSelectedUrl(result.link);
                                            setIframeError(false);
                                            setLinkPreview(null);
                                        }}
                                        className="text-blue-500 hover:underline"
                                    >
                                        {result.title}
                                    </a>
                                </div>
                                {!submittedLinks.has(result.link) && (
                                    <button
                                        onClick={() => acceptResult(result)}
                                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Accept
                                    </button>
                                )}
                            </div>
                        ))
                    )}

                    {results.length > 0 && (

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
                        <div className="custom-link bg-white p-6 rounded-lg shadow-md mt-4">
                            <h2 className="text-xl font-semibold mb-4">Add Your Own Link</h2>
                            <input
                                type="text"
                                value={customLink}
                                onChange={e => setCustomLink(e.target.value)}
                                placeholder="Enter your link here"
                                className="border border-gray-300 p-3 mb-2 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={async () => {
                                    if (customLink) {
                                        try {
                                            const response = await axios.post('/api/search/link-preview', { url: customLink });
                                            console.log('Custom link preview data:', response.data);
                                            setLinkPreview(response.data);
                                        } catch (error) {
                                            console.error('Error fetching custom link preview:', error);
                                            setLinkPreview(null);
                                        }
                                    }
                                }}
                                className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Preview Link
                            </button>
                        </div>
                    )}
                </div>

                {/* Link Preview */}
                <div className="flex-1">
                    {selectedUrl && !iframeError && !fetchingPreview && (
                        <div className="preview-container bg-white p-6 rounded-lg shadow-md mb-6">
                            <iframe
                                ref={iframeRef}
                                src={selectedUrl}
                                className="w-full h-64 border border-gray-300 rounded-md"
                                title="Website Preview"
                                onLoad={() => setIframeError(false)}
                                onError={() => setIframeError(true)}
                            ></iframe>
                        </div>
                    )}

                    {iframeError && !fetchingPreview && (
                        <div className="link-preview bg-white p-6 rounded-lg shadow-md mb-6 border border-red-500">
                            {linkPreview && linkPreview.length > 0 ? (
                                <>
                                    <h3 className="text-lg font-semibold mb-2">{linkPreview.title}</h3>
                                    <p className="mb-2">{linkPreview.description}</p>
                                    {linkPreview.images && linkPreview.images.length > 0 && (
                                        <img src={linkPreview.images[0]} alt="Preview" className="w-full h-40 object-cover mb-2 rounded-md" />
                                    )}
                                    <a href={selectedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit</a>
                                </>
                            ) : (
                                <div>
                                    <p className="text-gray-600">Sorry, this link is not previewable.</p>
                                    <a href={selectedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit Link</a>
                                </div>
                            )}
                        </div>
                    )}

                    {fetchingPreview && (
                        <p className="text-gray-600 mb-6">Loading preview...</p>
                    )}
                </div>
            </div >
        </>
    );
};

export default InformationFinder;
