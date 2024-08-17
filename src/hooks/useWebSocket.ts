import { Message } from '@/types/chat/chat';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect, useRef } from 'react';

type MessagePayload = { chatId: number } & Message;

type ReceivedMessage = { chatId: number; senderId: string } & Message;

export const useWebSocket = (chatId: string) => {
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [isConnected, setIsConnected] = useState(true);

  const { user } = useUser();

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!user) return;

    ws.current = new WebSocket(`ws://localhost:3001?userId=${user.sub}&chatId=${chatId}`);
    ws.current.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connection opened');
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as ReceivedMessage;
        setMessages((prevMessages) => [...prevMessages, message]);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onclose = () => {
      setIsConnected(true);
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      setIsConnected(true);
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [user, chatId]);

  const sendMessage = (message: Message) => {
    if (ws.current && isConnected) {
      const payload: MessagePayload = { ...message, chatId: Number(chatId) };
      ws.current.send(JSON.stringify(payload));
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
};