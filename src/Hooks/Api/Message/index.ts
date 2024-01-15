/* eslint-disable no-underscore-dangle */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMessage,
  getConversations,
  getMessages,
  readMessage,
} from '@/Services/Message';
import { MessageType } from '@/Types/MessageType';
import { PostCreateMessageRequestType } from '@/Types/Request';
import { ConversationType } from '@/Types/ConversationType';
import QUERY_KEYS from '@/Constants/queryKeys';

export const useFetchConversations = () => {
  const { data, isLoading, refetch } = useQuery<ConversationType[] | null>({
    queryKey: [QUERY_KEYS.CONVERSATIONS],
    queryFn: getConversations,
  });

  return {
    conversations: data,
    isConversationsLoading: isLoading,
    conversationsRefetch: refetch,
  };
};

export const useFetchMessages = (userId: string) => {
  const { data, isLoading, refetch } = useQuery<MessageType[] | null>({
    queryKey: [QUERY_KEYS.MESSAGES],
    queryFn: async () => {
      const messages = await getMessages(userId);
      return messages
        ? messages.sort(
            (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
          )
        : [];
    },
    enabled: !!userId,
  });

  return {
    messages: data,
    isMessagesLoading: isLoading,
    messagesRefetch: refetch,
  };
};

/* 이 밑으로 아직 사용 안하는 중 */

export const useCreateMessage = ({
  message,
  receiver,
}: PostCreateMessageRequestType) => {
  const { data, isError, isSuccess } = useMutation({
    mutationFn: () => createMessage({ message, receiver }),
  });

  return {
    message: data,
    isCreateMessageError: isError,
    isCreateMessageSuccess: isSuccess,
  };
};

export const useReadMessage = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (userId: string) => readMessage(userId),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.CONVERSATIONS] });
    },
  });

  return {
    mutateReadMessage: mutate,
  };
};
