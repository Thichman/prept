// components/ChatInterface.js
import { useState, useEffect } from 'react';

const ChatInterface = ({ context }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [awaitReturn, setAwaitReturn] = useState(false)

    useEffect(() => {
        if (context) {
            setMessages([{ text: context, position: 'left', type: 'text' }]);
        }
    }, [context]);

    const handleSend = async () => {
        if (!input.trim()) return;

        setAwaitReturn(true)
        const newMessage = {
            text: input,
            position: 'right',
            type: 'text',
        };
        setInput('');
        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        try {
            const response = await fetch('../../api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await response.json();

            const replyMessage = {
                text: data.reply,
                position: 'left',
                type: 'text',
            };

            setMessages((prevMessages) => [...prevMessages, replyMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
        setAwaitReturn(false)
    };

    return (
        <div className="flex flex-col h-screen p-4 w-10/12">
            <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-md">
                {messages.map((msg, index) => (
                    <div key={index} className={`my-2 p-2 rounded-lg ${msg.position === 'right' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 self-start text-black'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSend();
                    }}
                    className="flex-1 p-2 border rounded-l-lg text-black"
                    placeholder="Type your message..."
                />
                {!awaitReturn &&
                    <button onClick={handleSend} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
                }
            </div>
        </div>
    );
};

export default ChatInterface;
