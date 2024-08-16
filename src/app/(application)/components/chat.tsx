'use client';

import React, { useState, useMemo, useCallback } from 'react';
import ChatFABButton from './chat-fab';
import ChatList from './chat-list';
import ChatMessages from './chat-messages';
import { useChats } from '@/hooks/useChats';
import { Card } from '@/components/ui/card';

// Define the states of the state machine
enum ChatWindowState {
  Closed = 'closed',
  Open = 'open',
  Selected = 'selected',
}

interface ChatWindowProps {
  onChatSelect?: (chatId: string) => void;
}

const Chat: React.FC<ChatWindowProps> = ({ onChatSelect }) => {
  const [chatWindowState, setChatWindowState] = useState<ChatWindowState>(ChatWindowState.Closed);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const { chats } = useChats();

  const toggleChatOptions = () => {
    setChatWindowState((prevState) =>
      prevState === ChatWindowState.Closed ? ChatWindowState.Open : ChatWindowState.Closed
    );
  };

  const handleBack = () => {
    setChatWindowState(ChatWindowState.Open);
    setActiveChat(null);
  };

  const handleChatSelect = useCallback(
    (chatId: string) => {
      setActiveChat(chatId);
      setChatWindowState(ChatWindowState.Selected);
      onChatSelect?.(chatId);
    },
    [onChatSelect]
  );

  const handleClose = () => {
    setChatWindowState(ChatWindowState.Closed);
    setActiveChat(null);
  };

  const content = useMemo(() => {
    if (chatWindowState === ChatWindowState.Closed) return null;

    if (chatWindowState === ChatWindowState.Open) {
      return <ChatList chats={chats} onSelectChat={handleChatSelect} />;
    }

    if (chatWindowState === ChatWindowState.Selected && activeChat) {
      const selectedChat = chats.find((chat) => chat.id.toString() === activeChat);
      return <ChatMessages messages={selectedChat?.messages || []} onClose={handleBack} />;
    }

    return null;
  }, [chatWindowState, activeChat, chats, handleChatSelect]);

  return (
    <div className="fixed bottom-6 right-6">
      <div className="relative">
        <ChatFABButton
          onClick={chatWindowState === ChatWindowState.Closed ? toggleChatOptions : handleClose}
          isOpen={chatWindowState !== ChatWindowState.Closed}
        />
      </div>

      {chatWindowState !== ChatWindowState.Closed && (
        <Card className="absolute bottom-20 right-0 w-80 rounded-lg p-4 shadow-lg transition-all">
          {content}
        </Card>
      )}
    </div>
  );
};

export default Chat;
