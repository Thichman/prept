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
    prompt = `Create a comprehensive document that consolidates all relevant information about an individual, primarily focusing on LinkedIn data with additional insights from other sources such as company websites, news articles, and public records. This document should be used to prepare for meetings or calls. The document should be structured for easy readability and quick reference, and it should draw meaningful conclusions from the data to provide new and actionable insights. Only include sections where relevant data is available. If any piece of information is not available or marked as N/A, exclude that section or header from the document.
    Document Structure:
    ## Profile Overview ##
    Full Name:
    Pronunciation Guide:
    Current Job Title:
    Current Company:
    LinkedIn:
    Professional Summary:
    ## Company Overview ##
    Company Name:
    Industry:
    Product Lines/Services:
    Market Position:
    Employee Count:
    Headquarters Location:
    Recent Major News:
    Hiring Status:
    ## Professional Activity ##
    Recent Posts and Updates:
    Topics of Interest:
    Key Projects and Contributions:
    ## Role and Responsibilities ##
    Detailed Job Description:
    Key Responsibilities and Activities:
    Relevant Industry Terminology:
    Skills and Expertise:
    ## Engagement Insights ##
    Common Interests:
    Conversation Starters:
    Potential Objections:
    ## Additional Context ##
    Social Media Activity:
    Company Website Information:
    News Articles and Public Records:
    ## Professional Analysis and Recommendations ##
    Psychological Insights:
    Strategic Recommendations:
    Conclusions and Opportunities:
    ## Quick Reference Summary ##
    Key Details:
    Important Instructions:
    Exclude any section or header if the corresponding information is not available or marked as N/A.
    Use clear headings and subheadings to organize the information.
    Use bullet points for listing important details.
    Highlight key points using asterisks, dashes, or capitalization.
    Maintain a consistent structure for each profile.
    Ensure a professional and tech-savvy look with appropriate use of whitespace and headings.
    Provide a summary box with key details for quick reference.
    Goal:
    This document should provide all the necessary information to effectively engage with the individual for any type of professional conversation or interaction. It should offer new insights and conclusions based on the data, not just regurgitate information. This should be a long document that encompasses everything important, do not cut corners.
    Here is the individual’s information:
    Scraped Data: ${parentDataStr}`;


  }

  const result = await runLLMChain(prompt);
  return new Response(JSON.stringify(result));

}