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
  const { data, isFetching, isLoading, refetch } = useQuery<
    ConversationType[] | null
  >({
    queryKey: [QUERY_KEYS.CONVERSATIONS],
    queryFn: getConversations,
    refetchInterval: 2000,
  });

  return {
    conversations: data,
    isConversationsLoading: isLoading,
    isConversationsFetching: isFetching,
    conversationsRefetch: refetch,
  };
};

export const useFetchMessages = (userId: string) => {
  const { data, isFetching, isFetchedAfterMount, isLoading, refetch } =
    useQuery<MessageType[] | null>({
      queryKey: [QUERY_KEYS.MESSAGES],
      queryFn: async () => {
        const messages = await getMessages(userId);
        return messages
          ? messages.sort(
              (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
            )
          : [];
      },
      refetchInterval: 2000,
      enabled: !!userId,
    });

  return {
    isMessagesFetchedAfterMount: isFetchedAfterMount,
    messages: data,
    isMessagesFetching: isFetching,
    isMessagesLoading: isLoading,
    messagesRefetch: refetch,
  };
};

export const useCreateMessage = (onError?: () => void) => {
  const { data, mutate, isError, isSuccess, mutateAsync } = useMutation({
    mutationFn: ({ message, receiver }: PostCreateMessageRequestType) =>
      createMessage({ message, receiver }),
    onError,
  });

  return {
    createdMessage: data,
    mutateCreateMessage: mutate,
    isCreateMessageError: isError,
    isCreateMessageSuccess: isSuccess,
    mutateAsync,
  };
};

export const useReadMessage = () => {
  const queryClient = useQueryClient();

  const { mutate, isError } = useMutation({
    mutationFn: (userId: string) => readMessage(userId),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.CONVERSATIONS] });
    },
  });

  return {
    mutateReadMessage: mutate,
    isReadMessageError: isError,
  };
};
