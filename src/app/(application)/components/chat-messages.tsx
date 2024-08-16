import { Button } from '@/components/ui/button';
import React from 'react';

interface ChatMessagesProps {
  messages: { isMe: boolean; content: string }[];
  onClose: () => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, onClose }) => {
  return (
    <div className="overflow-y-auto pt-4">
      {messages.map((message, index) => (
        <div key={index} className="mb-4">
          <p
            className={`text-sm ${message.isMe ? 'text-right text-blue-500' : 'text-left text-white'}`}
          >
            {message.content}
          </p>
        </div>
      ))}

      <div className="mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 flex h-auto w-full flex-1 items-center justify-between">
          <Button className="w-3/5 bg-blue-500 text-white">Send</Button>
          <Button variant="secondary" className="w-2/6" onClick={onClose}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
