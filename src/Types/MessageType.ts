import { UserType } from './UserType';

export interface MessageType {
  _id: string;
  message: string;
  sender: UserType;
  receiver: UserType;
  seen: boolean;
  createdAt: string;
  updatedAt: string;
}
