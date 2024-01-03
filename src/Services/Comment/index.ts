import { axiosAuthInstance } from '@/Api/axiosInstance';
import handleError from '@/Api/handleError';
import { DOMAIN } from '@/Constants/Api';
import { CommentType } from '@/Types/CommentType';
import { PostCommentRequestType } from '@/Types/Request';

/**
 * @brief 특정 포스트에 댓글을 작성합니다.
 * @details {} 중괄호 내부에 반드시 comment, postId 설정해야 합니다.
 */
export const createComment = async ({
  comment,
  postId,
}: PostCommentRequestType) => {
  try {
    const res = await axiosAuthInstance.post<CommentType>(
      DOMAIN.CREATE_COMMENT,
      {
        comment,
        postId,
      },
    );

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 특정 포스트에 작성한 내 댓글을 삭제합니다.
 */
export const deleteComment = async (commentId: string) => {
  try {
    const res = await axiosAuthInstance.delete<CommentType>(
      DOMAIN.DELETE_COMMENT,
      {
        data: {
          id: commentId,
        },
      },
    );

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};
