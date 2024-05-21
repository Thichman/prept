import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "langchain/schema";

const runLLMChain = async (prompt) => {
    const model = new ChatOpenAI({
        openAIApiKey: process.env.ARCTECH_OPENAI_KEY,
    });
    // Invoke the model and get the response
    const response = await model.invoke([new HumanMessage(prompt)]);
    return response;
};

export async function POST(request) {
    const requestData = await request.json();
    let prompt = ''
    if (requestData.parentData) {
        const parentDataStr = JSON.stringify(requestData.parentData);
        const individualName = requestData.fullName
        prompt = `I want you to create a document with all relevent information on the individual that I would need to know in order to have a successful meeting or call with this person. The Document can be quite long but I want you to focus primarily on the linkedin data and not the instagram data, like a 90% linkedin to 10% instagram data split. Also at the top include a header and in the document do not have any picture links. Also, do not add weird characters such as '*' or '#' to the document as well. Also check the individuals instagram information and see if they have recently gone anywhere or posted something interesting for reference. Here is the individuals information: Individuals full name${individualName}, Scraped Data: ${parentDataStr}`;
    }

    const result = await runLLMChain(prompt);
    return new Response(JSON.stringify(result));
}