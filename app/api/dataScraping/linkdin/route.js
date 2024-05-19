import { ApifyClient } from 'apify-client';

export async function POST(request) {
    const requestData = await request.json();
    const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
    });

    console.log(requestData)
    const input = {
        "urls": [
            {
                "url": requestData
            }
        ],
        "min": 20,
        "max": 50
    };

    try {
        const run = await client.actor("KYzSqU1FJUomdKfHD").call(input);

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
