/* eslint-disable no-underscore-dangle */
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { followUser, unfollowUser } from '@/Services/Follow';
import QUERY_KEYS from '@/Constants/queryKeys';
import { PostType } from '@/Types/PostType';
import { UserType } from '@/Types/UserType';

export const useFollowByUserId = (currentChannelId: string) => {
  const queryClient = useQueryClient();

  const { data: followData, mutate: followByUserId } = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID, currentChannelId],
      });
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.CHECK_AUTH],
      });

      const previousPostState = queryClient.getQueryData<
        InfiniteData<PostType[]>
      >([QUERY_KEYS.POST_BY_ID, currentChannelId]);
      const previousUserState = queryClient.getQueryData<UserType>([
        QUERY_KEYS.CHECK_AUTH,
      ]);
      const updatedUserState = {
        ...previousUserState,
        following: previousUserState?.following
          ? [...previousUserState.following, { _id: 'OptimisticId' }]
          : [{ _id: 'OptimisticId' }],
      };
      const updatedPostState = {
        ...previousPostState,
        pages: previousPostState?.pages.map((page) =>
          page.map((info) => {
            if (info.author._id === userId) {
              return {
                ...info,
                author: {
                  ...info.author,
                  followers: [...info.author.followers, 'OptimisticId'],
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
      queryClient.setQueryData([QUERY_KEYS.CHECK_AUTH], updatedUserState);

      return { previousPostState, previousUserState };
    },
    onError: (error, _, context) => {
      alert(`팔로우 등록 실패 ${error}`);
      queryClient.setQueryData(
        [QUERY_KEYS.POST_BY_ID, currentChannelId],
        context?.previousPostState,
      );
      queryClient.setQueryData(
        [QUERY_KEYS.CHECK_AUTH],
        context?.previousUserState,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHECK_AUTH] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
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
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.CHECK_AUTH],
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
      alert(`팔로우 취소 실패 ${error}`);
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
