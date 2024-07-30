'use client'
import jsPDF from "jspdf";

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

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const margin = 10;
        const maxLineWidth = pageWidth - 2 * margin;
        let y = margin;

        // Add the header with the name
        doc.setFontSize(22);
        doc.setTextColor('#5A2D82');
        doc.setFont("helvetica", "bold");
        doc.text(name, margin, y);

        // Add the header box
        y += 8;
        doc.setFillColor(153, 0, 255); // purple background
        doc.rect(margin, y, pageWidth - 2 * margin, 12, 'F');
        y += 8;
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.text("Below is your brief, go to page 2 for bonus information and AI Assistant chat history.", margin + 2, y);

        // Add a section header
        const addSectionHeader = (title) => {
            y += 8;
            doc.setFillColor(255, 255, 255); // white background
            doc.rect(margin, y, pageWidth - 2 * margin, 6, 'F');
            y += 5;
            doc.setFontSize(12);
            doc.setTextColor(138, 43, 226); // purple text color
            doc.setFont("helvetica", "bold");
            doc.text(title, margin, y);
        };

        // Add normal text
        const addText = (text) => {
            doc.setFontSize(10);
            doc.setTextColor(0, 0, 0); // black text color
            doc.setFont("helvetica", "normal");

            const splitText = doc.splitTextToSize(text, maxLineWidth);
            for (let i = 0; i < splitText.length; i++) {
                if (y + 10 > pageHeight - margin) {
                    doc.addPage();
                    y = margin;
                }
                doc.text(splitText[i], margin, y);
                y += 5;
            }
        };

        // Define the sections and content
        const sections = summary.split('##').filter(section => section.trim().length > 0);
        sections.forEach(section => {
            const [title, content] = section.split('##').map(item => item.trim());
            addSectionHeader(title);
            addText(content);
        });

        doc.save(`Bréfd_summary.pdf`);
    };

    return (
        <button onClick={handleDownloadPDF} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Press me
        </button>
    );
}
