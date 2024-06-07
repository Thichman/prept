export async function mainScraper(data) {
    let returnDataObject = {}; // Initialize an empty object to store the returned data
    if (data.linkedin) {
        console.log(data.linkedin)
        const linkdinData = await fetch('../../api/dataScraping/linkdin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.linkedin),
        });
        if (!linkdinData.ok) {
            throw new Error(`Failed to fetch data: ${linkdinData.statusText}`);
        }

        const linkdinReturnData = await linkdinData.json()
        returnDataObject['linkedin'] = linkdinReturnData.data;
    }

    if (data.facebook) {
        const facebookData = await fetch('../../api/dataScraping/facebook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.facebook),
        });
        if (!facebookData.ok) {
            throw new Error(`Failed to fetch data: ${facebookData.statusText}`);
        }

        const facebookReturnData = await facebookData.json()
        if (!facebookReturnData.error) {
            returnDataObject['facebook'] = facebookReturnData; // Add Facebook data to the object
        }
    }

    if (data.instagram) {
        const instagramData = await fetch('../../api/dataScraping/instagram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.instagram),
        });
        if (!instagramData.ok) {
            throw new Error(`Failed to fetch data: ${instagramData.statusText}`);
        }

        const instagramReturnData = await instagramData.json()
        returnDataObject['instagram'] = instagramReturnData; // Add Instagram data to the object
    }
    if (data.companyPage) {
        const companyData = await fetch('../../api/dataScraping/website', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.companyPage), // Fix the typo here, should be data.instagram instead of data.facebook
        });
        if (!companyData.ok) {
            throw new Error(`Failed to fetch data: ${companyData.statusText}`);
        }

        const companyReturnData = await companyData.json()
        returnDataObject['companyData'] = companyReturnData; // Add Instagram data to the object
    }

    if (data.articleLinks && data.articleLinks.length > 0) {
        returnDataObject['articles'] = [];
        for (const link of data.articleLinks) {
            if (link) { // Check if the link is not empty
                const articleData = await fetch('../../api/dataScraping/website', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(link),
                });
                if (!articleData.ok) {
                    throw new Error(`Failed to fetch data: ${articleData.statusText}`);
                }
                const articleReturnData = await articleData.json();
                returnDataObject['articles'].push(articleReturnData);
            }
        }
    }

    return JSON.stringify(returnDataObject); // Return the object containing all the platform data
}
