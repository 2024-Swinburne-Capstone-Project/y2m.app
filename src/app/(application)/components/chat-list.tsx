import React from 'react';
import { Button } from '@/components/ui/button';

interface ChatListProps {
  chats: { id: number; name: string }[];
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat }) => {
  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <Button
          key={chat.id}
          className="w-full rounded-md bg-gray-100 p-3 text-left hover:bg-gray-200"
          onClick={() => onSelectChat(chat.id.toString())}
        >
          {chat.name}
        </Button>
      ))}
    </div>
  );
};

export default ChatList;
