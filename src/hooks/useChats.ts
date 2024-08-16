import { useState, useEffect, useCallback } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Chat, Message } from '@/types/chat/chat';
import { useWebSocket } from '@/hooks/useWebSocket'; // Import your WebSocket hook

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  // Initialize WebSocket hook
  const { messages, sendMessage: sendMessageWs } = useWebSocket();

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
    fetchChats();
  }, [fetchChats]);

  // Update chat messages with incoming WebSocket messages
  useEffect(() => {
    if (messages.length > 0) {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          Number(chat.id) === messages[0].chatId
            ? {
                ...chat,
                messages: [...(chat.messages || []), messages[0]],
              }
            : chat
        )
      );
    }
  }, [messages]);

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
        sendMessageWs(newMessage);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [sendMessageWs, user]
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
