import { UserType } from '@/Types/UserType';

export interface MessageListProps {
  receiver: UserType;
  conversationsRefetch: () => void;
  loginUser: Partial<UserType>;
  isClickedUserCard?: boolean;
  setIsClickedUserCard?: (state: boolean) => void;
  isMobileSize?: boolean;
}
