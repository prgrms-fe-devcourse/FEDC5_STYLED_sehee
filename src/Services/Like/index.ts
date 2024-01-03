import { axiosAuthInstance } from '@/Api/axiosInstance';
import handleError from '@/Api/handleError';
import { DOMAIN } from '@/Constants/Api';
import { LikeType } from '@/Types/LikeType';

/**
 * @brief 특정 포스트에 좋아요합니다.
 */
export const createLike = async (postId: string) => {
  try {
    const res = await axiosAuthInstance.post<LikeType>(DOMAIN.CREATE_LIKE, {
      postId,
    });

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 특정 포스트에 좋아요한 것을 취소합니다.
 */
export const deleteLike = async (postId: string) => {
  try {
    const res = await axiosAuthInstance.delete<LikeType>(DOMAIN.DELETE_LIKE, {
      data: {
        id: postId,
      },
    });

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};
