import { Message } from '@/types/db';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useState, useEffect, useRef } from 'react';

type MessagePayload = { recipientId: string } & Message;

type ReceivedMessage = { senderId: string } & Message;

export const useWebSocket = () => {
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const { user } = useUser();

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:3001?userId=${user?.sub}`);

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

  const sendMessage = (recipientId: string, message: Message) => {
    if (ws.current && isConnected) {
      const payload: MessagePayload = { recipientId, ...message };
      ws.current.send(JSON.stringify(payload));
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
};
