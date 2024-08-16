'use client';
import React, { useState } from 'react';
import { Chat } from '@/types/chat/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Search } from 'lucide-react';

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

const ChatItem: React.FC<{ chat: Chat; onClick: () => void }> = ({ chat, onClick }) => (
  <Button variant="ghost" className="w-full justify-start px-5 py-10" onClick={onClick}>
    <Avatar className="mr-3 size-10">
      <AvatarImage
        src={chat.participants[0].profilePictureURL || ''}
        alt={chat.participants[0].name}
      />
      <AvatarFallback>{chat.participants[0].name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 text-left">
      <h3 className="font-medium">{chat.participants[0].name}</h3>
      <p className="truncate text-sm text-muted-foreground">
        {chat.lastMessage?.content || 'No messages yet'}
      </p>
    </div>
    {chat.lastMessage && (
      <span className="text-xs text-muted-foreground">
        {new Date(chat.lastMessage.createdAt.toString()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    )}
  </Button>
);

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, onNewChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChats = chats.filter((chat) =>
    chat.participants[0].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search chats"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        {filteredChats.map((chat) => (
          <ChatItem
            key={chat.id.toString()}
            chat={chat}
            onClick={() => onSelectChat(chat.id.toString())}
          />
        ))}
      </ScrollArea>
      <div className="p-4">
        <Button onClick={onNewChat} className="w-full">
          <Plus className="mr-2 size-4" /> New Chat
        </Button>
      </div>
    </div>
  );
};

export default ChatList;
