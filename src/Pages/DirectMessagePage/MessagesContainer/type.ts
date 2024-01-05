import { UserType } from '@/Types/UserType';

export interface MessagesContainerProps {
  receiver: UserType;
  conversationsRefetch: () => void;
}
