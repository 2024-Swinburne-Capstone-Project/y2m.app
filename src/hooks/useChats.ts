import { useState } from 'react';

const MockChats = [
  {
    id: 1,
    name: 'John Doe',
    message: 'Hello, how are you?',
    timestamp: '2021-05-01T10:00:00.000Z',
    lastMessage: {
      id: 1,
      message: 'Hello, how are you?',
      timestamp: '2021-05-01T10:00:00.000Z',
    },
    messages: [
      {
        id: 1,
        isMe: false,
        content: 'Hello, how are you?',
      },
      {
        id: 2,
        isMe: true,
        content: 'I am good, thank you!',
      },
    ],
  },
  {
    id: 2,
    name: 'Jane Doe',
    message: 'I am good, thank you!',
    timestamp: '2021-05-01T10:01:00.000Z',
    lastMessage: null,
    messages: [],
  },
];

export const useChats = () => {
  const [chats, setChats] = useState(MockChats);

  return {
    chats,
    setChats,
  };
};
