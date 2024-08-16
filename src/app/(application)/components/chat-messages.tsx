import { Button } from '@/components/ui/button';
import React from 'react';

interface ChatMessagesProps {
  messages: { isMe: boolean; content: string }[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="h-64 overflow-y-auto border-t border-gray-200 pt-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-2">
          <p
            className={`text-sm ${message.isMe ? 'text-right text-blue-500' : 'text-left text-gray-700'}`}
          >
            {message.content}
          </p>
        </div>
      ))}

      <div className="mt-auto">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button className="mt-2 w-full bg-blue-500 text-white">Send</Button>
      </div>
    </div>
  );
};

export default ChatMessages;
