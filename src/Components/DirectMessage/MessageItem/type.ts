import { MessageType } from '@/Types/MessageType';

export interface DateProps {
  index: number;
  messages: MessageType[];
}

export interface MessageProps {
  message: MessageType;
  myId: string;
}
