import { ApifyClient } from 'apify-client';

export async function POST(request) {
    const requestData = await request.json();
    const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
    });

    const input = {
        "queries": requestData,
        "resultsPerPage": 10,
        "maxPagesPerQuery": 1,
        "languageCode": "",
        "mobileResults": false,
        "includeUnfilteredResults": false,
        "saveHtml": false,
        "saveHtmlToKeyValueStore": false
    };

    try {
        const run = await client.actor("nFJndFXA5zjCTuudP").call(input);

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