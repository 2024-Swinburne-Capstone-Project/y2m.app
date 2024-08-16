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

export interface Message extends DBMessage {}
