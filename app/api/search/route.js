import axios from 'axios';

export async function POST(req) {
    const data = await req.json()

    const { name, company, location, role } = data;
    const query = `${name} ${company} ${location} ${role}`;

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
