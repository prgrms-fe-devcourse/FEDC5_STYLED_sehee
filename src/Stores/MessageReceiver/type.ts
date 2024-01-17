import { UserType } from '@/Types/UserType';

export interface MessageReceiverType {
  receiver: UserType | null;
  setReceiver: (user: UserType | null) => void;
  isClickedUserCard: boolean;
  setIsClickedUserCard: (state: boolean) => void;
}
