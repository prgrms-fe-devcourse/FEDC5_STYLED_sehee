import axiosInstance from '@/Api/axiosInstance';
import { DOMAIN } from '@/Constants/Api';
import { FollowType } from '@/Types/FollowType';

/**
 * @brief 특정 유저를 팔로우합니다.
 * @return 실패할 경우, null을 반환합니다.
 */
export const followUser = async (userId: string) => {
  try {
    const res = await axiosInstance.post<FollowType>(DOMAIN.FOLLOW, {
      userId,
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @brief 특정 유저를 언팔합니다.
 * @return 실패할 경우, null을 반환합니다.
 */
export const unfollowUser = async (userId: string) => {
  try {
    const res = await axiosInstance.delete<FollowType>(DOMAIN.UNFOLLOW, {
      data: {
        id: userId,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
