import { axiosAuthInstance } from '@/Api/axiosInstance';
import { DOMAIN } from '@/Constants/Api';
import { LikeType } from '@/Types/LikeType';

/**
 * @brief 특정 포스트에 좋아요합니다.
 */
export const createLike = async (postId: string) => {
  const res = await axiosAuthInstance.post<LikeType>(DOMAIN.CREATE_LIKE, {
    postId,
  });

  return res.data;
};

/**
 * @brief 특정 포스트에 좋아요한 것을 취소합니다.
 */
export const deleteLike = async (postId: string) => {
  const res = await axiosAuthInstance.delete<LikeType>(DOMAIN.DELETE_LIKE, {
    data: {
      id: postId,
    },
  });

  return res.data;
};
