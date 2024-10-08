'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat, Message } from '@/types/chat/chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, Send } from 'lucide-react';
import Link from 'next/link';
import SkillsAndDevAreasSummary from './skills-and-dev-areas-summary';

interface ChatMessagesProps {
  chat: Chat | undefined;
  onClose: () => void;
  onSend: (chatId: string, content: string) => void;
  onViewProfile?: () => void;
  small: boolean;
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

const ChatMessages: React.FC<ChatMessagesProps> = ({
  chat,
  onClose,
  onSend,
  onViewProfile,
  small,
}) => {
  const [message, setMessage] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      const scrollContainer = messagesContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [chat?.messages, scrollToBottom]);

  if (!chat) return null;

  const handleSend = () => {
    if (message.trim()) {
      onSend(chat.id.toString(), message);
      setMessage('');
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between border-b p-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ChevronLeft className="size-6" />
          </Button>
          <Button variant={'none'} asChild onClick={onViewProfile}>
            <Link href={`/profile-view?id=${chat.participants[0].id}`}>
              <Avatar className="mr-2 size-10">
                <AvatarImage
                  src={chat.participants[0].profilePictureURL || ''}
                  alt={chat.participants[0].name}
                />
                <AvatarFallback>{chat.participants[0].name[0]}</AvatarFallback>
              </Avatar>
            </Link>
          </Button>
          <div>
            <h2 className="text-lg font-semibold">{chat.participants[0].name}</h2>
            {!small && (
              <SkillsAndDevAreasSummary
                skills={chat.participants[0].skills}
                developmentAreas={chat.participants[0].developmentAreas}
              />
            )}
          </div>
        </div>
        {!small && (
          <Button asChild variant={'outline'}>
            <Link href={`/profile-view?id=${chat.participants[0].id}`}>View Profile</Link>
          </Button>
        )}
      </div>
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4">
        {chat.messages?.map((msg) => (
          <MessageItem
            key={msg.id.toString()}
            message={msg}
            isOwnMessage={msg.senderId !== chat.participants[0].id}
          />
        ))}
      </div>
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
