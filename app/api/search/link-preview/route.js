import mql from '@microlink/mql';

export async function POST(req) {
    const data = await req.json();
    const { url } = data;

    console.log('Requested URL:', url);

    try {
        const { status, data: linkPreview } = await mql(url);

        // Destructure the necessary fields from the linkPreview object
        const { title, description, image } = linkPreview;

        // Return the necessary fields in the response
        return new Response(JSON.stringify({ title, description, image }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching link preview:', error);
        return new Response(JSON.stringify({ message: 'Error fetching link preview' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
