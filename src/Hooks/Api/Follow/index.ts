import { useMutation, useQueryClient } from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/Services/Follow';
import QUERY_KEYS from '@/Constants/queryKeys';

export const useFollowByUserId = () => {
  const queryClient = useQueryClient();

  const { data: followData, mutate: followByUserId } = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.CHECK_AUTH] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID] });
    },
  });

  return {
    followData,
    followByUserId,
  };
};

export const useUnfollowByUserId = () => {
  const queryClient = useQueryClient();

  const { data: unfollowData, mutate: unfollowByUserId } = useMutation({
    mutationFn: (followId: string) => unfollowUser(followId),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.CHECK_AUTH] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID] });
    },
  });

  return {
    unfollowData,
    unfollowByUserId,
  };
};
