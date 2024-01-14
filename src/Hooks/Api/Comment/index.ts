import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostCommentRequestType } from '@/Types/Request';
import { createComment, deleteComment } from '@/Services/Comment';
import QUERY_KEYS from '@/Constants/queryKeys';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const { mutate: commentById } = useMutation({
    mutationFn: ({ comment, postId }: PostCommentRequestType) =>
      createComment({
        comment,
        postId,
      }),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID] });
    },
  });

  return {
    commentById,
  };
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCommentById } = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID] });
    },
  });

  return {
    deleteCommentById,
  };
};
