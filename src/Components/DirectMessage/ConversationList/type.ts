import { ConversationType } from '@/Types/ConversationType';
import { UserType } from '@/Types/UserType';

export interface ConversationListProps {
  setReceiver: (state: UserType | null) => void;
  conversations: ConversationType[] | null | undefined;
  isConversationsLoading: boolean;
  conversationsRefetch: () => void;
}
