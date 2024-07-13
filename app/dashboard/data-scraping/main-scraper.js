export async function mainScraper(data) {
    let returnDataObject = {}; // Initialize an empty object to store the returned data

    console.log(data)
    const fetchData = async (url, type) => {
        let endpoint;
        switch (type) {
            case 'linkedin':
                endpoint = '../../api/dataScraping/linkdin';
                break;
            case 'instagram':
                endpoint = '../../api/dataScraping/instagram';
                break;
            default:
                endpoint = '../../api/dataScraping/website';
                break;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to fetch data: ${response.statusText}, ${text}`);
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error(`Error fetching ${type} data:`, error.message);
            return null;
        }
    };

    // Process LinkedIn data
    if (data.linkedin) {
        const linkedinReturnData = await fetchData(data.linkedin, 'linkedin');
        if (linkedinReturnData) {
            returnDataObject['linkedin'] = linkedinReturnData.data;
        }
    }

    // Process Instagram data
    if (data.instagram) {
        const instagramReturnData = await fetchData(data.instagram, 'instagram');
        if (instagramReturnData) {
            returnDataObject['instagram'] = instagramReturnData;
        }
    }

    // Process Other URLs (everything else)
    if (data.otherUrls && data.otherUrls.length > 0) {
        returnDataObject['otherData'] = [];
        for (const url of data.otherUrls) {
            if (url) { // Check if the url is not empty
                const otherReturnData = await fetchData(url, 'website');
                if (otherReturnData) {
                    returnDataObject['otherData'].push(otherReturnData);
                }
            }
        }
    }

    return JSON.stringify(returnDataObject);
}
