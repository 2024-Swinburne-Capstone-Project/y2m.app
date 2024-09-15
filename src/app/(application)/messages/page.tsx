'use client';

import React, { useState, useEffect } from 'react';
import { useChats } from '@/hooks/useChats';
import { MessageCircle, Plus } from 'lucide-react';
import ChatList from '../components/chat-list';
import ChatMessages from '../components/chat-messages';
import NewChatModal from '../components/new-chat-modal';

const MessagesPage: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const { chats, loading, error, sendMessage, createNewChat, fetchChatMessages } =
    useChats(activeChat);

  useEffect(() => {
    if (activeChat) {
      void fetchChatMessages(activeChat);
    }
  }, [activeChat, fetchChatMessages]);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
  };

  const handleNewChat = async (userId: string) => {
    const newChatId = await createNewChat(userId);
    if (newChatId) {
      setActiveChat(newChatId);
      setIsNewChatModalOpen(false);
    }
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="flex h-screen items-center justify-center">Error: {error}</div>;

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <ChatList
          chats={chats}
          onSelectChat={handleChatSelect}
          onNewChat={() => setIsNewChatModalOpen(true)}
        />
      </div>

      <div className="flex flex-1 flex-col">
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
              <p className="text-xl font-semibold">
                Select a chat or start a new conversation
              </p>
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
