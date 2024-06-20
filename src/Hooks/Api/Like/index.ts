/* eslint-disable no-underscore-dangle */
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import QUERY_KEYS from '@/Constants/queryKeys';
import { createLike, deleteLike } from '@/Services/Like';
import useAuthUserStore from '@/Stores/AuthUser';
import { PostType } from '@/Types/PostType';

export const useLikeById = (currentChannelId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthUserStore();

  const { data: likeData, mutate: likeById } = useMutation({
    mutationFn: (likePostId: string) => createLike(likePostId),
    onMutate: async (likePostId: string) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID, currentChannelId],
      });

      const previousLikeState = queryClient.getQueryData<
        InfiniteData<PostType[]>
      >([QUERY_KEYS.POST_BY_ID, currentChannelId]);
      const updatedLikeState = {
        ...previousLikeState,
        pages: previousLikeState?.pages.map((page) =>
          page.map((info) => {
            if (info._id === likePostId) {
              return {
                ...info,
                likes: [
                  ...info.likes,
                  {
                    createdAt: '',
                    post: likePostId,
                    updatedAt: '',
                    user: user._id,
                    __v: 0,
                    _id: '',
                  },
                ],
              };
            }
            return info;
          }),
        ),
      };

      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        updatedLikeState,
      );

      return { previousLikeState };
    },
    onError: (error, _, context) => {
      alert(`좋아요 등록 실패 ${error}`);
      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        context?.previousLikeState,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID, currentChannelId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECK_AUTH] });
    },
  });

  return {
    likeData,
    likeById,
  };
};

export const useDisLikeById = (currentChannelId: string) => {
  const queryClient = useQueryClient();

  const { data: disLikeData, mutate: disLikeById } = useMutation({
    mutationFn: (disLikeId: string) => deleteLike(disLikeId),
    onMutate: async (disLikeId: string) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID, currentChannelId],
      });

      const previousLikeState = queryClient.getQueryData<
        InfiniteData<PostType[]>
      >([QUERY_KEYS.POST_BY_ID, currentChannelId]);

      const updatedLikeState = {
        ...previousLikeState,
        pages: previousLikeState?.pages.map((page) =>
          page.map((info) => {
            return {
              ...info,
              likes: info.likes.filter(({ _id }) => _id !== disLikeId),
            };
          }),
        ),
      };

      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        updatedLikeState,
      );

      return { previousLikeState };
    },
    onError: (error, _, context) => {
      alert(`좋아요 취소 실패 ${error}`);
      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        context?.previousLikeState,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID, currentChannelId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECK_AUTH] });
    },
  });

  return {
    disLikeData,
    disLikeById,
  };
};
