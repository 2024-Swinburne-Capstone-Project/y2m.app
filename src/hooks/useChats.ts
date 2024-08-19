import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Chat, Message } from '@/types/chat/chat';

const POLLING_INTERVAL = 5000; // Poll every 5 seconds

export const useChats = (chatId: string | null) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  // Helper to update a specific chat's messages
  const updateChatMessages = (chatId: number, messages: Message[]) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (Number(chat.id) === chatId ? { ...chat, messages } : chat))
    );
  };

  // Fetch initial chats
  const fetchChats = useCallback(async () => {
    if (!user) return;
    try {
      const response = await fetch('/api/chats', {
        headers: { 'X-User-Id': user.sub as string },
      });
      if (!response.ok) throw new Error('Failed to fetch chats');
      const data = await response.json();
      setChats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void fetchChats();
  }, [fetchChats]);

  // Polling function to fetch messages for the active chat
  const pollMessages = useCallback(async () => {
    if (!user || !chatId) return;
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`, {
        headers: { 'X-User-Id': user.sub as string },
      });
      if (!response.ok) throw new Error('Failed to fetch messages');
      const messages: Message[] = await response.json();
      updateChatMessages(Number(chatId), messages);
    } catch (err) {
      console.error('Error polling messages:', err);
    }
  }, [user, chatId]);

  // Set up polling
  useEffect(() => {
    if (chatId) {
      void pollMessages(); // Initial poll
      const intervalId = setInterval(pollMessages, POLLING_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [chatId, pollMessages]);

  // Fetch chat messages for a specific chat
  const fetchChatMessages = useCallback(
    async (chatId: string) => {
      if (!user) return;
      try {
        const response = await fetch(`/api/chats/${chatId}/messages`, {
          headers: { 'X-User-Id': user.sub as string },
        });
        if (!response.ok) throw new Error('Failed to fetch messages');
        const messages: Message[] = await response.json();
        setChats((prevChats) =>
          prevChats.map((chat) => (chat.id.toString() === chatId ? { ...chat, messages } : chat))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [user]
  );

  // Send a message to a specific chat
  const sendMessage = useCallback(
    async (chatId: string, content: string) => {
      if (!user) return;
      try {
        const response = await fetch(`/api/chats/${chatId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': user.sub as string,
          },
          body: JSON.stringify({ content }),
        });
        if (!response.ok) throw new Error('Failed to send message');
        const newMessage: Message = await response.json();
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id.toString() === chatId
              ? {
                  ...chat,
                  lastMessage: newMessage,
                  messages: [...(chat.messages || []), newMessage],
                }
              : chat
          )
        );
        void pollMessages(); // Poll immediately after sending a message
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [user, pollMessages]
  );

  // Create a new chat
  const createNewChat = useCallback(
    async (userId: string) => {
      if (!user) return null;
      try {
        const response = await fetch('/api/chats', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-User-Id': user.sub as string,
          },
          body: JSON.stringify({ participantId: userId }),
        });
        if (!response.ok) throw new Error('Failed to create new chat');
        const newChat: Chat = await response.json();
        setChats((prevChats) => [...prevChats, newChat]);
        return newChat.id.toString();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        return null;
      }
    },
    [user]
  );

  return {
    chats,
    loading,
    error,
    sendMessage,
    createNewChat,
    fetchChatMessages,
  };
};
