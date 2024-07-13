import { ApifyClient } from 'apify-client';

export async function POST(request) {
    const requestData = await request.json();
    const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
    });

    const input = {
        "usernames": [
            requestData.url
        ]
    };

    try {
        const run = await client.actor("dSCLg0C3YEZ83HzYX").call(input);

        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        items.forEach((item) => {
            console.dir(item);
        });

        const returnItems = JSON.stringify(items)
        return new Response(returnItems);

    } catch (error) {
        console.error('Error running Apify actor:', error.message);
        return new Response("Data Not Found");
    }
}
