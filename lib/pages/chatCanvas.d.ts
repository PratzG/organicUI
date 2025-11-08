import React from 'react';
import { ComponentInstance } from '../actions';
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
declare const ChatCanvas: React.FC<ChatCanvasProps>;
export default ChatCanvas;
//# sourceMappingURL=chatCanvas.d.ts.map