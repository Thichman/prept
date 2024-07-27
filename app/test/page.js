'use client'
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Test() {
    const summary = `## Profile Overview ##
    Full Name: Tyson Hichman
    Current Job Title: Software Engineer
    Current Company: Drive Social Media
    LinkedIn: [Tyson Hichman LinkedIn](https://www.linkedin.com/in/tyson-hichman)
    Pronunciation Guide: Tyson Hitch-man
    Professional Summary: Tyson Hichman is a seasoned software engineer currently working at Drive Social Media. He's also the Co-Founder of ArcTech Automations. Tyson demonstrates consistent effort to stay up-to-date on the latest technological advancements, particularly in AI tools and projects. His ability to combine his passion for technology, exceptional programming skills, and a commitment for results-driven outcomes have been key to his success. 
    
    ## Company Overview ##
    Company Name: Drive Social Media
    Industry: Marketing and Advertising 
    Product Lines/Services: Social Media Marketing 
    Market Position: Not available
    Employee Count: Not available
    Headquarters Location: Tampa, Florida, United States
    Recent Major News: Not available
    Hiring Status: Not available
    
    ## Professional Activity ##
    Recent Posts and Updates: Tyson is currently creating tutorial videos on every aspect of Next JS and JavaScript
    Topics of Interest: AI tools and projects, Innovations in Technology
    Key Projects and Contributions: Founder of ArcTech Automations and creator of several automation solutions
    
    ## Role and Responsibilities ##
    Detailed Job Description: As a Software Engineer, Tyson employs his programming skills to develop solutions for different industries. His key roles include developing, testing and maintaining software, conducting system tests, troubleshooting issues, recommending changes to enhance system, gathering user requirements and documenting application designs.
    Key Responsibilities and Activities: Developing, testing and maintaining software, conducting system tests, troubleshooting issues.
    Relevant Industry Terminology: Software development, programming, React, JavaScript, Next JS.
    Skills and Expertise: Programming languages like JavaScript, HTML, MySQL, and Python, Next.js, Teamwork, Communication and Leadership.
    
    ## Engagement Insights ##
    Common Interests: Technology enthusiast, AI advancements, Soccer
    Conversation Starters: His tutorial videos on JavaScript and Next JS, His Co-founded company - ArcTech Automations, His background as a Student Athlete.
    Potential Objections: Not available
    
    ## Additional Context ##
    Social Media Activity: Active on GitHub, frequently posting updates on LinkedIn.
    Company Website Information: Not available
    News Articles and Public Records: Not available
    
    ## Professional Analysis and Recommendations ##
    Psychological Insights: Tyson is result-oriented, passionate about technology, and open to collaboration.
    Strategic Recommendations: Perhaps a discussion about latest trends in AI could be insightful, given Tyson's interest.
    Conclusions and Opportunities: Given Tyson's interest in AI, there could be potential opportunities for collaboration in AI related projects.
    
    ## Quick Reference Summary ##
    Key Details: Tyson is a software engineer with both tech and leadership skills. He is the co-founder of ArcTech Automations.
    Important Instructions: A conversation about AI, JavaScript, or latest tech trends would likely be well-received.`;

    const name = "Tyson Hichman";
    const parseSummary = (summary) => {
        const sections = summary.split(/## /).filter(section => section.trim() !== '');
        const parsedData = sections.map(section => {
            const [title, ...contentLines] = section.split('\n').filter(line => line.trim() !== '');
            const content = contentLines.join('\n').trim();
            const cleanedTitle = title.replace(/ ##$/, '').trim();
            return { title: cleanedTitle, content };
        });
        return parsedData;
    };

    const formatContent = (content) => {
        return content.split('\n').map((line, index) => (
            <div key={index} className="mb-1 pl-6 text-justify" style={{ textIndent: '-10px' }}>
                • {line}
            </div>
        ));
    };

    const Section = ({ title, content }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex justify-between items-center bg-gradient-to-r from-brefd-primary-yellow to-brefd-secondary-gradient-start text-brefd-primary-indigo text-lg border-b-2 border-black font-bold py-2 px-4 focus:outline-none transition-all duration-500`}
                >
                    <span>{title}</span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="bg-gradient-to-r from-brefd-primary-yellow to-brefd-secondary-gradient-start text-black font-bold mt-2 p-4 rounded-lg shadow-2xl transition-all duration-300">
                        {formatContent(content)}
                    </div>
                </div>
            </div>
        )
    };

    const parsedSummary = summary ? parseSummary(summary) : [];

    return (
        <div className="flex flex-col items-center bg-white py-8 px-6 rounded-xl shadow-lg w-full max-w-[800px] mx-auto">
            <div className="w-full flex justify-between items-center mb-4">
                <span className="text-3xl font-bold text-brefd-primary-purple">{name}</span>
                <span className="text-3xl font-bold text-brefd-primary-purple">bréfd ai</span>
            </div>
            <div className="w-full py-8 px-6 rounded-lg shadow-black shadow-lg bg-gradient-to-r from-brefd-primary-yellow to-brefd-secondary-gradient-start">
                {parsedSummary.map((section, index) => (
                    <Section key={index} title={section.title} content={section.content} />
                ))}
            </div>
        </div>
    )
}
