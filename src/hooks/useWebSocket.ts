import { Message } from '@/types/chat/chat';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect, useRef } from 'react';

type MessagePayload = { chatId: number } & Message;

type ReceivedMessage = { chatId: number; senderId: string } & Message;

export const useWebSocket = () => {
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const { user } = useUser();

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!user) return;

    ws.current = new WebSocket(`ws://localhost:3001?userId=${user.sub}&chatId=1`); // Replace `1` with actual chatId

    ws.current.onopen = () => {
      setIsConnected(true);
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
      setIsConnected(false);
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [user]);

  const sendMessage = (message: Message) => {
    if (ws.current && isConnected) {
      const payload: MessagePayload = { ...message };
      ws.current.send(JSON.stringify(payload));
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
};
