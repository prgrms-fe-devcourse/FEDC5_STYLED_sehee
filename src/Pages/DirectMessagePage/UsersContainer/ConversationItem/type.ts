import { ConversationType } from '@/Types/ConversationType';
import { UserType } from '@/Types/UserType';

export interface ConversationItemProps {
  conversation: ConversationType;
  onClick: (receiver: UserType) => void;
}
