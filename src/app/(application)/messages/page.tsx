'use client';

import React, { useState, useEffect } from 'react';
import { useChats } from '@/hooks/useChats';
import { MessageCircle } from 'lucide-react';
import ChatMessages from '../components/chat-messages';
import ChatList from '../components/chat-list';
import NewChatModal from '../components/new-chat-modal';

const MessagesPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const { chats, loading, error, sendMessage, createNewChat, fetchChatMessages } =
    useChats(activeChat);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeChat) {
      void fetchChatMessages(activeChat);
    }
  }, [activeChat, fetchChatMessages]);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
  };

  const handleNewChat = async (userId: string) => {
    const existingChat = chats.find((chat) =>
      chat.participants.some((participant) => participant.id === userId)
    );
    if (existingChat) {
      setActiveChat(existingChat.id.toString());
      setIsNewChatModalOpen(false);
    } else {
      const newChatId = await createNewChat(userId);
      if (newChatId) {
        setActiveChat(newChatId);
        setIsNewChatModalOpen(false);
      }
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="flex h-screen items-center justify-center">Error: {error}</div>;

  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div
        className={`${
          isMobileView && activeChat ? 'hidden' : 'flex'
        } w-full flex-col border-r p-4 md:w-1/4`}
      >
        <ChatList
          chats={chats}
          onSelectChat={handleChatSelect}
          onNewChat={() => setIsNewChatModalOpen(true)}
        />
      </div>

      <div className={`${isMobileView && !activeChat ? 'hidden' : 'flex'} flex flex-1 flex-col`}>
        {activeChat ? (
          <ChatMessages
            chat={chats.find((c) => c.id.toString() === activeChat)}
            onClose={() => setActiveChat(null)}
            onSend={sendMessage}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto mb-4" />
              <p className="text-xl font-semibold">Select a chat or start a new conversation</p>
            </div>
          </div>
        )}
      </div>

      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={handleNewChat}
      />
    </div>
  );
};

export default MessagesPage;
