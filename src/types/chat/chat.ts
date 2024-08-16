import { Chat as DBChat } from '../db';
import { Message as DBMessage } from '../db';

export interface Chat extends DBChat {
  participants: {
    id: string;
    name: string;
    profilePictureURL: string | null;
  }[];
  lastMessage: Message | null;
  messages: Message[];
}

export interface Message extends Omit<DBMessage, 'createdAt'> {
  senderId: string;
  chatId: number;
  createdAt: Date;
}

export interface CreateMessage {
  content: string;
  chatId: number;
  senderId: string;
  createdAt: Date;
}
