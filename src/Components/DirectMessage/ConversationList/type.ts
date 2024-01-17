import { UserType } from '@/Types/UserType';

export interface ConversationListProps {
  loginUser: Partial<UserType>;
  isMobileSize: boolean;
}
