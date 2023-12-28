import { User } from './User';

export interface Message {
  _id: string;
  message: string;
  sender: User;
  receiver: User;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMessage {
  message: string;
  receiver: string; // 사용자 id
}
