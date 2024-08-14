export const maxDuration = 60;
import { ApifyClient } from 'apify-client';

export async function POST(request) {
    const requestData = await request.json();
    const client = new ApifyClient({
        token: process.env.APIFY_TOKEN,
    });

    const input = {
        "startUrls": [
            {
                "url": requestData.url
            }
        ],
        "useSitemaps": false,
        "crawlerType": "playwright:adaptive",
        "includeUrlGlobs": [],
        "excludeUrlGlobs": [],
        "ignoreCanonicalUrl": false,
        "maxCrawlDepth": 20,
        "maxCrawlPages": 1,
        "initialConcurrency": 0,
        "maxConcurrency": 200,
        "initialCookies": [],
        "proxyConfiguration": {
            "useApifyProxy": true
        },
        "maxSessionRotations": 10,
        "maxRequestRetries": 5,
        "requestTimeoutSecs": 60,
        "minFileDownloadSpeedKBps": 128,
        "dynamicContentWaitSecs": 10,
        "maxScrollHeightPixels": 5000,
        "removeElementsCssSelector": "nav, footer, script, style, noscript, svg,\n[role=\"alert\"],\n[role=\"banner\"],\n[role=\"dialog\"],\n[role=\"alertdialog\"],\n[role=\"region\"][aria-label*=\"skip\" i],\n[aria-modal=\"true\"]",
        "removeCookieWarnings": true,
        "clickElementsCssSelector": "[aria-expanded=\"false\"]",
        "htmlTransformer": "readableText",
        "readableTextCharThreshold": 100,
        "aggressivePrune": false,
        "debugMode": false,
        "debugLog": false,
        "saveHtml": false,
        "saveMarkdown": true,
        "saveFiles": false,
        "saveScreenshots": false,
        "clientSideMinChangePercentage": 15,
        "renderingTypeDetectionPercentage": 10
    };

    try {
        const run = await client.actor("aYG0l9s7dbB7j3gbS").call(input);

        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        const returnItems = JSON.stringify(items)
        return new Response(returnItems);
    } catch (error) {
        console.error('Error running Apify actor:', error.message);
        return new Response("Data Not Found");
    }
}
