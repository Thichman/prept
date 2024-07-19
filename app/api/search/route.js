import axios from 'axios';

export async function POST(req) {
    const data = await req.json()
    let queryParts = [];

    if (data.name) queryParts.push(data.name);
    if (data.company) queryParts.push(data.company);
    if (data.location) queryParts.push(data.location);
    if (data.role) queryParts.push(data.role);

    const query = queryParts.join(' ');

    try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
            params: {
                key: process.env.GOOGLE_API_KEY, // Store your API key in environment variables
                cx: process.env.GOOGLE_CSE_ID, // Store your Custom Search Engine ID in environment variables
                q: query,
            },
        });

        return new Response(JSON.stringify(response.data.items), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    } catch (error) {
        console.error(error);
        return new Response(null, { message: 'Error fetching search results' });
    }
}
