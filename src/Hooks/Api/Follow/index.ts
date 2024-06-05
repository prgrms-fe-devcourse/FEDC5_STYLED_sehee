/* eslint-disable no-underscore-dangle */
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/Services/Follow';
import QUERY_KEYS from '@/Constants/queryKeys';
import useAuthUserStore from '@/Stores/AuthUser';
import { PostType } from '@/Types/PostType';

export const useFollowByUserId = (currentChannelId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthUserStore();

  const { data: followData, mutate: followByUserId } = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID, currentChannelId],
      });

      const previousPostState = queryClient.getQueryData<
        InfiniteData<PostType[]>
      >([QUERY_KEYS.POST_BY_ID, currentChannelId]);

      const updatedPostState = {
        ...previousPostState,
        pages: previousPostState?.pages.map((page) =>
          page.map((info) => {
            if (info.author._id === userId) {
              return {
                ...info,
                author: {
                  ...info.author,
                  followers: [...info.author.followers, user._id],
                },
              };
            }
            return info;
          }),
        ),
      };

      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        updatedPostState,
      );

      return { previousPostState };
    },
    onError: (error, _, context) => {
      console.error(error);
      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        context?.previousPostState,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECK_AUTH] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID],
      });
    },
  });

  return {
    followData,
    followByUserId,
  };
};

export const useUnfollowByUserId = (currentChannelId: string) => {
  const queryClient = useQueryClient();

  const { data: unfollowData, mutate: unfollowByUserId } = useMutation({
    mutationFn: (followId: string) => unfollowUser(followId),
    onMutate: async (followId: string) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID, currentChannelId],
      });
      const previousPostState = queryClient.getQueryData<
        InfiniteData<PostType[]>
      >([QUERY_KEYS.POST_BY_ID, currentChannelId]);

      const updatedPostState = {
        ...previousPostState,
        pages: previousPostState?.pages.map((page) =>
          page.map((info) => {
            return {
              ...info,
              author: {
                ...info.author,
                followers: info.author.followers.filter(
                  (followUserId) => followUserId !== followId,
                ),
              },
            };
          }),
        ),
      };

      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        updatedPostState,
      );

      return { previousPostState };
    },
    onError: (error, _, context) => {
      console.error(error);
      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        context?.previousPostState,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECK_AUTH] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID],
      });
    },
  });

  return {
    unfollowData,
    unfollowByUserId,
  };
};
