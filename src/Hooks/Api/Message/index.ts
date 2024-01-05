import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createMessage,
  getConversations,
  getMessages,
  readMessage,
} from '@/Services/Message';
import { MessageType } from '@/Types/MessageType';
import { PostCreateMessageRequestType } from '@/Types/Request';
import { ConversationType } from '@/Types/ConversationType';

export const useFetchConversations = () => {
  const { data, isLoading, refetch } = useQuery<ConversationType[] | null>({
    queryKey: ['conversations'],
    queryFn: getConversations,
    enabled: true, // 마운트 시 자동으로 쿼리를 실행한다.
    staleTime: 0, // 시간이 경과하면 refetch한다.
  });

  return {
    conversations: data,
    isConversationsLoading: isLoading,
    conversationsRefetch: refetch,
  };
};

export const useFetchMessages = (userId: string) => {
  const { data, isLoading, refetch } = useQuery<MessageType[] | null>({
    queryKey: ['messages'],
    queryFn: () => getMessages(userId),
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

export const useReadMessage = (userId: string) => {
  const { data } = useMutation({
    mutationFn: () => readMessage(userId),
    onError: () => {
      console.log('read message error');
    },
  });

  return {
    isSuccess: data,
  };
};
