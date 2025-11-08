import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { ComponentInstance } from '../actions';
import TestButton from '../components/testButton';
import MultipleChoice from '../components/multipleChoice';
import '../styles/pages.css';

interface Message {
  id: string;
  text?: string;
  type: 'user' | 'response';
  timestamp: Date;
  componentId?: string;
}

interface ChatCanvasProps {
  components?: ComponentInstance[];
  messages?: Message[];
}

const ChatCanvas: React.FC<ChatCanvasProps> = ({ components = [], messages: externalMessages = [] }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const allMessages = [...messages, ...externalMessages].sort((a, b) =>
    a.timestamp.getTime() - b.timestamp.getTime()
  );

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Response to: ${inputValue}`,
        type: 'response',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message: Message) => {
    if (message.componentId) {
      const component = components.find(c => c.id === message.componentId);
      if (!component) return null;

      switch (component.type) {
        case 'testButton':
          return (
            <div key={message.id} className="message message-response">
              <div className="message-content">
                <TestButton
                  type={component.type}
                  position={component.position}
                  metadata={component.metadata}
                  inChat={true}
                />
              </div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          );
        case 'multipleChoice':
          return (
            <div key={message.id} className="message message-response">
              <div className="message-content">
                <MultipleChoice
                  type={component.type}
                  position={component.position}
                  metadata={component.metadata}
                  inChat={true}
                />
              </div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          );
        default:
          return null;
      }
    }

    return (
      <div
        key={message.id}
        className={`message ${message.type === 'user' ? 'message-user' : 'message-response'}`}
      >
        <div className="message-content">
          {message.text}
        </div>
        <div className="message-timestamp">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    );
  };

  return (
    <div className="chat-canvas-container">
      <div className="chat-header">
        <h2>Chat Canvas</h2>
      </div>

      <div className="chat-messages">
        {allMessages.map((message) => renderMessage(message))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="chat-send-button"
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatCanvas;
