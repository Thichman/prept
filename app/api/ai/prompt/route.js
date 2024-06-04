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
    prompt = `Create a comprehensive document that consolidates all relevant information about an individual, primarily focusing on LinkedIn data with a slight reference to Instagram data. This document should be used to prepare for meetings or calls. The document should be structured for easy readability and quick reference. Here is the individual’s information: Individual’s full name: ${individualName} Scraped Data: ${parentDataStr}

        Document Requirements:
        
        1. Header: Include a professional header with the individual’s full name.
        2. LinkedIn Data (70%):
          • Personal Information:
            - Full Name
            - Current Job Title
            - Current Company
          • Company Information:
            - Company Name
            - Facts about the Business (e.g., industry, product lines, market position)
            - Employee Count
            - Headquarters Location
            - Recent Major News (e.g., acquisitions, significant hires, promotions)
            - Hiring Status (if available)
          • Recent Activity:
            - Recent LinkedIn Posts (summaries and direct quotes where relevant)
            - Topics they frequently post about or engage with
          • Job Role Information:
            - Detailed description of the individual’s role
            - Key responsibilities and typical activities
            - Relevant industry lingo or terminology
          • Potential Conversation Starters:
            - Common interests or shared topics based on their activity
            - Points of engagement from recent posts or shared articles
            • If this datapoint is not provided disregard this datapoint and allocate percentage evenly to the other datapoints.
        3. Instagram Data (10%):
          • Verify the individual’s authenticity
          • Note any recent posts or activity if relevant
          • If this datapoint is not provided disregard this datapoint and allocate percentage evenly to the other datapoints.
        4. Company Page Data (10%):
          • Include information on the individuals company and what they do.
          • Note any recent relevent information including industry and business context.
          • If this datapoint is not provided disregard this datapoint and allocate percentage evenly to the other datapoints.
        5. Article Data (10%):
          • Provide any pieces of interesting information that the articles provide about the user if they are provided.
          • Note any notable awards or information that would provide good context about the individual,
          • If this datapoint is not provided disregard this datapoint and allocate percentage evenly to the other datapoints.
        6. No Picture Links: Ensure that no picture links are included in the document.
        7. Formatting:
          • Organized into clear, distinct sections for quick reference
          • Use paragraphs and bullet points where appropriate for clarity
          • Do not include any links to anything.
          • Do not include any weird characters including '*', '#', '%' ...
          • FORMATTING IS VERY IMPORTANT DO NOT FORGET ANY OF THIS WHEN RETURNING YOUR RESPONSE
          
        Goal: This document should all the necessary information to effectively engage with the individual for any type of professional conversation or interaction. This should be a long
        document that encompases everything important, do not cut corners`;
  }

  const result = await runLLMChain(prompt);
  return new Response(JSON.stringify(result));
}