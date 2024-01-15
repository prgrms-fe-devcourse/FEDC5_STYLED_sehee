import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/Constants/queryKeys';
import { checkAuth } from '@/Services/Auth';

const useCheckAuth = () => {
  const { data: authUserData } = useQuery({
    queryKey: [QUERY_KEYS.CHECK_AUTH],
    queryFn: checkAuth,
  });

  return {
    authUserData,
  };
};

export default useCheckAuth;
