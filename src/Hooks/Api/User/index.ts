import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/Constants/queryKeys';
import { getUser } from '@/Services/User';

const useFetchUser = (userId: string) => {
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => getUser(userId),
  });

  return {
    userData: data,
    isFetchUserLoading: isLoading,
    isFetchUserSuccess: isSuccess,
    userDataRefetch: refetch,
  };
};

export default useFetchUser;
