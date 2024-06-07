const axios = require('axios');

export async function POST(request) {
    const requestData = await request.json();
    console.log(requestData)
    const options = {
        method: 'POST',
        url: 'https://linkedin-data-scraper.p.rapidapi.com/person',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'linkedin-data-scraper.p.rapidapi.com'
        },
        data: {
            link: requestData
        }
    };

    try {
        const response = await axios.request(options);
        const returnItems = JSON.stringify(response.data)
        return new Response(returnItems);
    } catch (error) {
        console.error(error);
        return new Response("Error")
    }
}
