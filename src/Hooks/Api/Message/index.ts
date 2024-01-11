/* eslint-disable no-underscore-dangle */
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
import { UserType } from '@/Types/UserType';
import { searchUsers } from '@/Services/Search';

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

export const useSearchUsers = (query: string, myId: string) => {
  const { data, isLoading, refetch } = useQuery<UserType[] | null>({
    queryKey: ['searchUsers', query],
    queryFn: async () => {
      if (!query) {
        return []; // query가 비어있는 경우 빈 배열 반환
      }
      const users = await searchUsers(query);
      return users ? users.filter((user) => user._id !== myId) : [];
    },
    // enabled: !!query,
  });

  return {
    users: data,
    isUsersLoading: isLoading,
    usersRefetch: refetch,
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
