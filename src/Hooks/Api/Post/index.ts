import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/Services/Post';
import QUERY_KEYS from '@/Constants/queryKeys';

const useDeletePost = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMyPost, mutateAsync: asyncDeleteMyPost } = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
    },
  });

  return { deleteMyPost, asyncDeleteMyPost };
};

export default useDeletePost;
