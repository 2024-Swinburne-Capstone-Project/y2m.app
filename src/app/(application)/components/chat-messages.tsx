'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Chat, Message } from '@/types/chat/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, Send } from 'lucide-react';

interface ChatMessagesProps {
  chat: Chat | undefined;
  onClose: () => void;
  onSend: (chatId: string, content: string) => void;
}

const MessageItem: React.FC<{ message: Message; isOwnMessage: boolean }> = ({
  message,
  isOwnMessage,
}) => (
  <div className={`mb-4 flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
    <div
      className={`max-w-[70%] rounded-lg p-3 ${
        isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'
      }`}
    >
      <p className="line max-w-[200px] text-wrap break-words text-sm">{message.content}</p>
      <p className="mt-1 text-right text-xs opacity-70">
        {new Date(message.createdAt.toString()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
    </div>
  </div>
);

const ChatMessages: React.FC<ChatMessagesProps> = ({ chat, onClose, onSend }) => {
  const [message, setMessage] = useState('');

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chat]);

  if (!chat) return null;

  const handleSend = () => {
    if (message.trim()) {
      onSend(chat.id.toString(), message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center border-b p-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
          <ChevronLeft className="size-6" />
        </Button>
        <Avatar className="mr-2 size-10">
          <AvatarImage
            src={chat.participants[0].profilePictureURL || ''}
            alt={chat.participants[0].name}
          />
          <AvatarFallback>{chat.participants[0].name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{chat.participants[0].name}</h2>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        {chat.messages?.map((msg) => (
          <MessageItem
            key={msg.id.toString()}
            message={msg}
            isOwnMessage={msg.senderId !== chat.participants[0].id}
          />
        ))}
      </ScrollArea>
      <div className="flex border-t p-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="mr-2 flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} disabled={!message.trim()}>
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatMessages;
