export async function mainScraper(data) {
    console.log(data)

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
    }
}