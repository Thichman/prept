export default function test() {

    const summary = `[**# PROFESSIONAL PROFILE OF TYSON HICHMAN**]

    ---
    
    **1. Personal Information**
    
    - Full Name: Tyson Hichman
    - Current Job Title: Software Engineer
    - Current Company: Drive Social Media
    - Location: Greater Tampa Bay Area, United States
    
    **2. LinkedIn Data**
    
    - Personal Summary: Tyson is a passionate technology enthusiast with a background in software, programming, and React. Expressed keen interest in exploring and learning about the latest advancements in Artificial Intelligence. Co-Founder of ArcTech Automations, a company that builds automation solutions.
    
    - Recent Activity: Started creating tutorial videos on every part of Next JS and JavaScript intricacies. Developed a project "Beaches", a React framework application built using the node.js JavaScript library. 
    
    - Job Role Information: Works as a Junior Software Engineer at Drive Social Media, with previous experience as a Digital Analyst. Main responsibilities include software development and data analysis.
    
    **3. Company Information**
    
    - Drive Social Media
      - Industry: Marketing and Advertising
      - Employee count: Unknown
      - Headquarters: St. Louis, USA (unconfirmed)
      - [No recent major news available]*
    
    **4. Additional Insights**
    
    - Work History: 
      - Drive Social Media: Software Engineer (September 2023 - Present; previous role as Digital Analyst October 2022 - January 2024)
      - Beef Jerky Experience: Sales Specialist (November 2017 - June 2022)
      - NCAA: Student Athlete (2017 - 2021)
    
    - Education: 
      - Bachelor's Degree in Computer Science from University of North Carolina Asheville (2019 - 2022)
      - Attended University of North Carolina at Greensboro (August 2017 - November 2019)
    
    - Skills: Includes but not limited to Next.js, Vercel, React.js, Tailwind CSS, Software Engineering practices, Teamwork, Python (Programming Language), Java, JavaScript, etc.
    
    **5. Conversational Insights**
    
    - Engage in conversation about their recent activity concerning creating tutorial videos about Next JS and JavaScript, showing interest and appreciation for sharing knowledge. Discuss his project "Beaches" as well as his role in Drive Social Media.
      
    
    ---
    
    [**# STRATEGIC ANALYSIS AND CONCLUSIONS**]
    
    ---
    
    - Emotional and Psychological Insights: Tyson appears to be highly driven and enthusiastic, with a clear passion for technology. He seems to enjoy sharing knowledge and contributing to his field.
    
    - Strategic Recommendations: Encourage discussions around technological innovations, especially in the realm of software development and AI. Show interest in his projects and tutorial videos and discuss how these experiences contribute to his career journey.
    
    - Conclusions and new Insights: Tyson may appreciate opportunities to collaborate and take on challenges as he is evidently driven and determined. His outgoing and contributory nature might suggest a potential interest in leadership or influential roles within his field.
    
    ---
    
    - Supporting his dedication to his field, Tyson has demonstrated his ability to start and carry through personal projects like his Next JS tutorial series indicating a high degree of self-motivation and expertise.
    - As a former student-athlete, Tyson may well bring a level of discipline, teamwork, and dedication to his professional endeavors.
    - Strategic engagement approach could involve opportunities to utilize or strengthen his skills, particularly in areas of software development, AI, and education.
      
    
    **# Format and Presentation**
    
    - Clear, upfront personal information and LinkedIn summary providing a quick overview of Tyson's profile.
    - Comprehensive synthesis of professional history lending depth to understanding of Tyson's career trajectory.
    - Strategic analysis and conclusions providing actionable insights for engagement.
    
    [*Missing information to be added upon confirmation]`
    const parseSummary = (summary) => {
        const sections = summary.split(/\d+\.\s+/).slice(1);
        const parsedData = sections.map(section => {
            const [titleLine, ...contentLines] = section.split('\n');
            const title = titleLine.replace(/[:]/g, '').trim();
            const content = contentLines.join('\n').trim();
            return { title, content };
        });
        return parsedData;
    };

    const Section = ({ title, content }) => {

        return (
            <div className="mb-6">
                <h2 className="text-xl font-bold text-blue-700 mb-2">{title}</h2>
                <p className="text-gray-700">{content}</p>
            </div>
        )

    };

    const parsedSummary = summary ? parseSummary(summary) : [];

    return (
        <div>
            <div className="flex items-center justify-between mb-8 align-bottom">
                <div className="text-3xl font-bold text-blue-700">Tyson Hichman</div>
                <div className="text-xl font-bold text-green-600">Bréfd AI</div>
            </div>
            <div className="max-w-[800px] mx-auto py-8 px-6 rounded-lg shadow-lg bg-white">
                {parsedSummary.map((section, index) => (
                    <Section key={index} title={section.title} content={section.content} index={index} />
                ))}
            </div>
        </div>
    )
}