import { getLinkPreview } from 'link-preview-js';

export async function POST(req) {
    const data = await req.json();
    const { url } = data;

    console.log(url)
    try {
        const linkPreview = await getLinkPreview(url);
        const { title, description, images } = linkPreview;
        console.log('Link preview:', title);
        return new Response(JSON.stringify({ title, description, images }), {
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
