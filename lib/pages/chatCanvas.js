import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Send } from 'lucide-react';
import TestButton from '../components/testButton';
import MultipleChoice from '../components/multipleChoice';
import '../styles/pages.css';
const ChatCanvas = ({ components = [], messages: externalMessages = [] }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const allMessages = [...messages, ...externalMessages].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const handleSendMessage = () => {
        if (!inputValue.trim())
            return;
        const userMessage = {
            id: Date.now().toString(),
            text: inputValue,
            type: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setTimeout(() => {
            const responseMessage = {
                id: (Date.now() + 1).toString(),
                text: `Response to: ${inputValue}`,
                type: 'response',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, responseMessage]);
        }, 500);
        setInputValue('');
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const renderMessage = (message) => {
        if (message.componentId) {
            const component = components.find(c => c.id === message.componentId);
            if (!component)
                return null;
            switch (component.type) {
                case 'testButton':
                    return (_jsxs("div", { className: "message message-response", children: [_jsx("div", { className: "message-content", children: _jsx(TestButton, { type: component.type, position: component.position, metadata: component.metadata, inChat: true }) }), _jsx("div", { className: "message-timestamp", children: message.timestamp.toLocaleTimeString() })] }, message.id));
                case 'multipleChoice':
                    return (_jsxs("div", { className: "message message-response", children: [_jsx("div", { className: "message-content", children: _jsx(MultipleChoice, { type: component.type, position: component.position, metadata: component.metadata, inChat: true }) }), _jsx("div", { className: "message-timestamp", children: message.timestamp.toLocaleTimeString() })] }, message.id));
                default:
                    return null;
            }
        }
        return (_jsxs("div", { className: `message ${message.type === 'user' ? 'message-user' : 'message-response'}`, children: [_jsx("div", { className: "message-content", children: message.text }), _jsx("div", { className: "message-timestamp", children: message.timestamp.toLocaleTimeString() })] }, message.id));
    };
    return (_jsxs("div", { className: "chat-canvas-container", children: [_jsx("div", { className: "chat-header", children: _jsx("h2", { children: "Chat Canvas" }) }), _jsx("div", { className: "chat-messages", children: allMessages.map((message) => renderMessage(message)) }), _jsxs("div", { className: "chat-input-container", children: [_jsx("input", { type: "text", className: "chat-input", placeholder: "Type your message...", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyPress: handleKeyPress }), _jsx("button", { className: "chat-send-button", onClick: handleSendMessage, disabled: !inputValue.trim(), children: _jsx(Send, { size: 20 }) })] })] }));
};
export default ChatCanvas;
