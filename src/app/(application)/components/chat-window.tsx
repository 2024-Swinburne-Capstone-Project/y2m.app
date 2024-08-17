'use client';
import React, { useState } from 'react';
import { useChats } from '@/hooks/useChats';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MessageCircle, X } from 'lucide-react';
import ChatList from './chat-list';
import ChatMessages from './chat-messages';
import NewChatModal from './new-chat-modal';

const ChatWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const { chats, loading, error, sendMessage, createNewChat, fetchChatMessages } =
    useChats(activeChat);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    void fetchChatMessages(chatId);
  };

  const handleNewChat = async (userId: string) => {
    const newChatId = await createNewChat(userId);
    if (newChatId) {
      setActiveChat(newChatId);
      setIsNewChatModalOpen(false);
    }
  };

  if (loading) return null;
  if (error) return <div>Error: {error}</div>;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="fixed bottom-6 right-6 z-50 size-14 rounded-full shadow-lg"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] sm:max-w-full">
        {activeChat ? (
          <ChatMessages
            chat={chats.find((c) => c.id.toString() === activeChat)}
            onClose={() => setActiveChat(null)}
            onSend={sendMessage}
          />
        ) : (
          <ChatList
            chats={chats}
            onSelectChat={handleChatSelect}
            onNewChat={() => setIsNewChatModalOpen(true)}
          />
        )}
      </SheetContent>
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={handleNewChat}
      />
    </Sheet>
  );
};

export default ChatWindow;
