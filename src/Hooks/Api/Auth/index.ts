import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/Constants/queryKeys';
import { checkAuth } from '@/Services/Auth';

const useCheckAuth = () => {
  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: [QUERY_KEYS.CHECK_AUTH],
    queryFn: checkAuth,
  });

  return {
    loginUserData: data,
    isCheckAuthLoading: isLoading,
    isCheckAuthSuccess: isSuccess,
    loginUserRefetch: refetch,
  };
};

export default useCheckAuth;
