import React from 'react';
interface ChatMessageProps {
  content: string | React.ReactNode;
  isBot?: boolean;
}
export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isBot = true
}) => {
  return <div className={`${isBot ? 'bg-gray-100 rounded-lg p-3 max-w-[80%]' : 'bg-blue-600 text-white rounded-lg p-3 max-w-[80%] ml-auto'}`}>
      {content}
    </div>;
};