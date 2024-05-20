//do not use this yet

import { ApifyClient } from 'apify-client';

export async function POST(request) {
    const requestData = await request.json();
    const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
    });

    const input = {
        "count": 1,
        "maxDelay": 3,
        "minDelay": 1,
        "profileUrls": [
            requestData
        ],
        "proxy": {
            "useApifyProxy": true,
            "apifyProxyGroups": [
                "RESIDENTIAL"
            ],
            "apifyProxyCountry": "US"
        }
    }

    try {
        const run = await client.actor("mlTO6kyEd7ZLgalf1").call(input);

        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        items.forEach((item) => {
            console.dir(item);
        });

        return new Response(items);
    } catch (error) {
        console.error('Error running Apify actor:', error.message);
        return new Response("Error running Apify actor", { status: 500 });
    }
}
