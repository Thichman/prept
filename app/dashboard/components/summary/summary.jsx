'use client'
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Summary = ({ summary, name }) => {
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
                    className={`w-full flex justify-between items-center bg-gradient-to-r from-brefd-primary-yellow to-brefd-secondary-gradient-start text-brefd-primary-indigo text-2xl border-b-2 border-black font-bold py-2 px-4 focus:outline-none transition-all duration-500`}
                >
                    <span>{title}</span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                <div
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="bg-gradient-to-r from-brefd-primary-yellow to-brefd-secondary-gradient-start text-black text-lg font-bold mt-2 p-4 rounded-lg shadow-2xl transition-all duration-300">
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
                <span className="text-4xl font-bold text-brefd-primary-purple">{name}</span>
                <div>
                    <span className="text-4xl font-bold text-black">bréfd </span>
                    <span className="text-4xl font-bold text-brefd-primary-purple">ai</span>
                </div>

            </div>
            <div className="w-full py-8 px-6 rounded-lg shadow-black shadow-lg bg-gradient-to-r from-brefd-primary-yellow to-brefd-secondary-gradient-start">
                {parsedSummary.map((section, index) => (
                    <Section key={index} title={section.title} content={section.content} />
                ))}
            </div>
        </div>
    )
}

export default Summary;