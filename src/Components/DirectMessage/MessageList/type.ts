import { UserType } from '@/Types/UserType';

export interface MessageListProps {
  receiver: UserType;
  conversationsRefetch: () => void;
  loginUser: Partial<UserType>;
}
