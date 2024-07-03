export const maxDuration = 60;
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "langchain/schema";

const runLLMChain = async (prompt) => {
  const model = new ChatOpenAI({
    openAIApiKey: process.env.ARCTECH_OPENAI_KEY,
    model: 'gpt-4',
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
    prompt = `Create a comprehensive document that consolidates all relevant information about an individual, primarily focusing on LinkedIn data with additional insights from other sources such as company websites, news articles, and public records. This document should be used to prepare for meetings or calls. The document should be structured for easy readability and quick reference, and it should draw meaningful conclusions from the data to provide new and actionable insights.

Document Requirements:

1. Header:
   - Include a professional header with the individual’s full name.
   - If the name might be difficult to pronounce for English speakers, include a pronunciation guide.

2. LINKEDIN DATA (40%):
   - Personal Information:
     - Full Name
     - Current Job Title
     - Current Company
   - Company Information:
     - Company Name
     - Facts about the Business (e.g., industry, product lines, market position)
     - Employee Count
     - Headquarters Location
     - Recent Major News (e.g., acquisitions, significant hires, promotions)
     - Hiring Status (if available)
   - Recent Activity:
     - Summaries and direct quotes from recent LinkedIn posts
     - Topics they frequently post about or engage with
   - Job Role Information:
     - Detailed description of the individual’s role
     - Key responsibilities and typical activities
     - Relevant industry lingo or terminology
   - Potential Conversation Starters:
     - Common interests or shared topics based on their activity
     - Points of engagement from recent posts or shared articles

3. ADDITIONAL INSIGHTS (20%):
   - Social Media Data (if available):
     - Verify the individual’s authenticity
     - Note any recent posts or activity if relevant (Instagram, Twitter, etc.)
   - Company Website and Public Records:
     - Detailed company information and context
     - Recent relevant news, financial data, and market position
   - Articles and News Data:
     - Interesting pieces of information about the individual from recent articles
     - Notable awards, achievements, and other relevant context

4. PROFESSIONAL ANALYSIS AND CONCLUSIONS (40%):
   - Emotional and Psychological Insights:
     - Analyze the individual's online presence to provide psychological insights
     - Identify potential objections they might have and strategies to address them
   - Strategic Recommendations:
     - Provide suggestions on how to engage with the individual effectively
     - Outline steps to close based on their interactions with the company
   - Conclusions and Insights:
     - Draw meaningful conclusions from the gathered data
     - Highlight new insights that are not immediately obvious from the raw data
     - Identify potential opportunities and challenges in engaging with the individual

5. FORMAT AND PRESENTATION (Extremely Important!):
   - Organized into clear, distinct sections for quick reference.
   - Use paragraphs and bullet points where appropriate for clarity.
   - Ensure no repeating information or unnecessary details.
   - Ensure no special characters including '*', '#', '%', or multiple '-'s.
   - Do not include any links to anything.
   - Ensure no picture links are included.
   - Include visual elements like company logos and profile pictures where available.
   - Incorporate a modern, clean design that is easy on the eyes.
   - Provide a summary box with key details for quick reference.
   - Ensure a professional and tech-savvy look with appropriate use of whitespace and headings.
   - FORMATTING IS VERY IMPORTANT DO NOT FORGET ANY OF THIS WHEN RETURNING YOUR RESPONSE.

Goal: This document should provide all the necessary information to effectively engage with the individual for any type of professional conversation or interaction. It should offer new insights and conclusions based on the data, not just regurgitate information. This should be a long document that encompasses everything important, do not cut corners.

Here is the individual’s information:
- Individual’s full name: ${individualName}
- Scraped Data: ${parentDataStr}
`;


  }

  const result = await runLLMChain(prompt);
  return new Response(JSON.stringify(result));

}