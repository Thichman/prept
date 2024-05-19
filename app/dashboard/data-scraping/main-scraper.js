export async function mainScraper(data) {
    console.log(data)

    let returnDataObject = {}; // Initialize an empty object to store the returned data

    if (data.linkdin) {
        const linkdinData = await fetch('../../api/dataScraping/linkdin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.linkdin),
        });
        if (!linkdinData.ok) {
            throw new Error(`Failed to fetch data: ${linkdinData.statusText}`);
        }

        const linkdinReturnData = await linkdinData.json()
        console.log(linkdinReturnData)
        returnDataObject['linkedin'] = linkdinReturnData; // Add LinkedIn data to the object
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
        console.log(facebookReturnData)
        returnDataObject['facebook'] = facebookReturnData; // Add Facebook data to the object
    }

    if (data.instagram) {
        const instagramData = await fetch('../../api/dataScraping/instagram', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.instagram), // Fix the typo here, should be data.instagram instead of data.facebook
        });
        if (!instagramData.ok) {
            throw new Error(`Failed to fetch data: ${instagramData.statusText}`);
        }

        const instagramReturnData = await instagramData.json()
        console.log(instagramReturnData)
        returnDataObject['instagram'] = instagramReturnData; // Add Instagram data to the object
    }

    return returnDataObject; // Return the object containing all the platform data
}
