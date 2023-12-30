import axiosInstance from '@/Api/axiosInstance';
import { DOMAIN } from '@/Constants/Api';
import { LikeType } from '@/Types/LikeType';

/**
 * @brief 특정 포스트에 좋아요합니다.
 * @details 실패할 경우, null을 반환합니다.
 */
export const createLike = async (postId: string) => {
  try {
    const res = await axiosInstance.post<LikeType>(DOMAIN.CREATE_LIKE, {
      params: {
        postId,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @brief 특정 포스트에 좋아요한 것을 취소합니다.
 * @details 실패할 경우, null을 반환합니다.
 */
export const deleteLike = async (postId: string) => {
  try {
    const res = await axiosInstance.delete<LikeType>(DOMAIN.DELETE_LIKE, {
      params: {
        id: postId,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
