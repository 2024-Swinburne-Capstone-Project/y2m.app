'use client';
import React, { useEffect, useState } from 'react';
import { useChats } from '@/hooks/useChats';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MessageCircle, X } from 'lucide-react';
import ChatList from './chat-list';
import ChatMessages from './chat-messages';
import NewChatModal from './new-chat-modal';
import { usePathname } from 'next/navigation';
import { useMessageNotifications } from '@/hooks/useMessageNotifications';
import { MessageNotification } from '@/types/db';

const ChatWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const { notifications, markRead } = useMessageNotifications();
  const [unreadNotifications, setUnreadNotifications] = useState<MessageNotification[]>([]);

  useEffect(() => {
    if (notifications) {
      const newUnreadNotifications = notifications;
      if (newUnreadNotifications.length > unreadNotifications.length) {
        playNotificationSound();
      }
      setUnreadNotifications(newUnreadNotifications);
    }
  }, [notifications, unreadNotifications.length]);

  const playNotificationSound = () => {
    const audio = new Audio('/message-chime.mp3');
    audio.play();
  };

  const { chats, loading, error, sendMessage, createNewChat, fetchChatMessages } =
    useChats(activeChat);

  const handleChatSelect = (chatId: string) => {
    setActiveChat(chatId);
    void fetchChatMessages(chatId);
    markRead(chatId);
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

  const closeSheet = () => {
    setActiveChat(null);
    setIsOpen(false);
  };

  const pathname = usePathname();

  if (pathname === '/messages') {
    return null;
  }

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
          {unreadNotifications.length > 0 && (
            <span className="absolute right-4 top-4 block size-2 rounded-full bg-blue-500"></span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] sm:max-w-full">
        {activeChat ? (
          <ChatMessages
            chat={chats.find((c) => c.id.toString() === activeChat)}
            onClose={() => setActiveChat(null)}
            onSend={sendMessage}
            onViewProfile={closeSheet}
          />
        ) : (
          <ChatList
            chats={chats}
            onSelectChat={handleChatSelect}
            onNewChat={() => setIsNewChatModalOpen(true)}
            unreadChats={unreadNotifications}
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
