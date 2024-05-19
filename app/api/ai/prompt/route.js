import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "langchain/schema";

//this function is for the actual sheet return
// the route in the chat folder is for the chat interface

const runLLMChain = async (prompt) => {
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const model = new ChatOpenAI({
        streaming: true,
        openAIApiKey: process.env.ARCTECH_OPENAI_KEY,
        callbacks: [
            {
                async handleLLMNewToken(token) {
                    await writer.ready;
                    await writer.write(encoder.encode(`${token}`));
                },
                async handleLLMEnd() {
                    await writer.ready;
                    await writer.close();
                },
            },
        ],
    });

    model.invoke([new HumanMessage(prompt)]);

    return stream.readable;
};

export async function POST(request) {
    const requestData = await request.json();
    let prompt = requestData.message;
    if (requestData.parentData) {
        const parentDataStr = JSON.stringify(requestData.parentData);
        prompt = `You will recieve 2 things, firstly data that the user wants you to reference, second the users request. Do what the user prompts you to do to the best of your abilities. Date for you to reference: ${prompt}\n Users prompt on what they want: \n${parentDataStr}`;
    }

    const stream = runLLMChain(prompt);
    return new Response(await stream);
}