/* eslint-disable no-underscore-dangle */
import { useQuery } from '@tanstack/react-query';
import { UserType } from '@/Types/UserType';
import { searchUsers } from '@/Services/Search';

export const useSearchUsers = (query: string, myId: string) => {
  const { data, isLoading, refetch } = useQuery<UserType[] | null>({
    queryKey: ['searchUsers', query],
    queryFn: async () => {
      if (!query) {
        return []; // query가 비어있는 경우 빈 배열 반환
      }
      const users = await searchUsers(query);
      return users
        ? users.filter(
            (user) => user._id !== myId && user.role !== 'SuperAdmin',
          )
        : [];
    },
  });

  return {
    users: data,
    isUsersLoading: isLoading,
    usersRefetch: refetch,
  };
};

export const useSearchAll = () => {};
