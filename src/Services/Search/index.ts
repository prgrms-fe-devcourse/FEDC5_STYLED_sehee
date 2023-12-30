import { axiosCommonInstance } from '@/Api/axiosInstance';
import { DOMAIN } from '@/Constants/Api';
import { PostType } from '@/Types/PostType';
import { UserType } from '@/Types/UserType';
/**
 * @brief 사용자를 검색합니다.
 * @return 실패할 경우, 빈 배열을 반환합니다.
 * @todo 추후에 query를 params로 넘겨줘야 합니다.
 */
export const searchUsers = async (query: string) => {
  try {
    const res = await axiosCommonInstance.get<UserType[]>(
      DOMAIN.SEARCH_USER(query),
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

/**
 * @brief 포스트와 사용자를 전체 검색합니다.
 * @return 실패할 경우, 빈 배열을 반환합니다.
 * @todo 추후에 query를 params로 넘겨줘야 합니다.
 */
export const searchAll = async (query: string) => {
  try {
    const res = await axiosCommonInstance.get<UserType[] | PostType[]>(
      DOMAIN.SEARCH_ALL(query),
    );

    return res.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
