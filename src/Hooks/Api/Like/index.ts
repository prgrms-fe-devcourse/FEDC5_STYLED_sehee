import { useMutation, useQueryClient } from '@tanstack/react-query';
import QUERY_KEYS from '@/Constants/queryKeys';
import { createLike, deleteLike } from '@/Services/Like';

/**
 * 좋아요 api 호출 useMutation 훅
 */
export const useLikeById = () => {
  const queryClient = useQueryClient();

  const { data: likeData, mutate: likeById } = useMutation({
    mutationFn: (likePostId: string) => createLike(likePostId),
    onSuccess: () => {},
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID],
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID],
      });
    },
  });

  return {
    likeData,
    likeById,
  };
};

/**
 * 좋아요 취소 api 호출 useMutation 훅
 */

export const useDisLikeById = () => {
  const queryClient = useQueryClient();
  const { data: disLikeData, mutate: disLikeById } = useMutation({
    mutationFn: (disLikeId: string) => deleteLike(disLikeId),
    onSuccess: () => {},
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID],
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID],
      });
    },
  });

  return {
    disLikeData,
    disLikeById,
  };
};
