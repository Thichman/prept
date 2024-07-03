import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const InformationFinder = () => {
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [role, setRole] = useState('');
    const [results, setResults] = useState([]);
    const [selectedUrl, setSelectedUrl] = useState('');
    const [linkPreview, setLinkPreview] = useState(null);
    const [iframeError, setIframeError] = useState(false);
    const [fetchingPreview, setFetchingPreview] = useState(false);
    const iframeRef = useRef(null);

    const handleSearch = async () => {
        try {
            const response = await axios.post('/api/search/', {
                name,
                company,
                location,
                role,
            });
            console.log('Search results:', response.data);
            setResults(response.data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    const acceptResult = (result) => {
        console.log('Accepted result:', result);
        // Handle the accepted result as needed
    };

    const fetchLinkPreview = async (url) => {
        setFetchingPreview(true);
        try {
            const response = await axios.post('/api/search/link-preview', { url });
            console.log('Link preview data:', response.data);
            setLinkPreview(response.data);
        } catch (error) {
            console.error('Error fetching link preview:', error);
            setLinkPreview(null); // Clear link preview if there is an error
        } finally {
            setFetchingPreview(false);
        }
    };

    useEffect(() => {
        if (selectedUrl) {
            setIframeError(false); // Reset error state
            fetchLinkPreview(selectedUrl);

            // Set a timeout to detect iframe loading issues
            const timeout = setTimeout(() => {
                if (iframeRef.current) {
                    setIframeError(true);
                }
            }, 3000);

            return () => clearTimeout(timeout); // Clear the timeout if the component unmounts or URL changes
        }
    }, [selectedUrl]);

    return (
        <div className="information-finder p-4">
            <div className="mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                    className="border p-2 mb-2 w-full text-black"
                />
                <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Company"
                    className="border p-2 mb-2 w-full text-black"
                />
                <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="Location (optional)"
                    className="border p-2 mb-2 w-full text-black"
                />
                <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="Role"
                    className="border p-2 mb-2 w-full text-black"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">Search</button>
            </div>

            <div className="results mb-4">
                {results.map((result, index) => (
                    <div key={index} className="result-item mb-2 flex items-center">
                        <a
                            href="#"
                            onClick={() => {
                                setSelectedUrl(result.link);
                                setIframeError(false);
                                setLinkPreview(null);
                            }}
                            className="text-blue-500 underline mr-2"
                        >
                            {result.title}
                        </a>
                        <button onClick={() => acceptResult(result)} className="bg-green-500 text-white p-2 rounded">Accept</button>
                    </div>
                ))}
            </div>

            {selectedUrl && !iframeError && (
                <iframe
                    ref={iframeRef}
                    src={selectedUrl}
                    className="preview w-full h-64"
                    title="Website Preview"
                    onLoad={() => setIframeError(false)}
                    onError={() => setIframeError(true)}
                ></iframe>
            )}

            {iframeError && !fetchingPreview && (
                <div className="link-preview w-full h-64 p-4 border">
                    {linkPreview.length > 0 ? (
                        <>
                            <h3>{linkPreview.title}</h3>
                            <p>{linkPreview.description}</p>
                            {linkPreview.images && linkPreview.images.length > 0 && (
                                <img src={linkPreview.images[0]} alt="Preview" />
                            )}
                            <button href={selectedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Visit</button>
                        </>
                    ) : (
                        <div>
                            <p>Sorry, this link is not previewable.</p>
                            <a href={selectedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Visit Link</a>
                        </div>
                    )}
                </div>
            )}

            {fetchingPreview && (
                <p>Loading preview...</p>
            )}
        </div>
    );
};

export default InformationFinder;
