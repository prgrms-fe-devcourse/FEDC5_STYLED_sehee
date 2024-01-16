import { UserType } from '@/Types/UserType';

export interface MessageListProps {
  receiver: UserType;
  loginUser: Partial<UserType>;
  isMobileSize: boolean;
}
