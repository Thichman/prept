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
    const parentDataStr = JSON.stringify(requestData.parentData);
    const prompt = ``;

    const stream = runLLMChain(prompt);
    return new Response(await stream);
}