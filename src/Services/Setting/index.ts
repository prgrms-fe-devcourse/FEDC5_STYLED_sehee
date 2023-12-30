import axiosInstance from '@/Api/axiosInstance';
import { PutUpdateUserRequestType } from '@/Types/Request';
import { UserType } from '@/Types/UserType';
import { DOMAIN } from '@/Constants/Api';

/**
 * @brief 나의 정보를 변경합니다.
 * @details {} 중괄호 내부에 반드시 fullName, username 설정해야 합니다.
 * 실패할 경우, null을 반환합니다.
 */
export const updateMyName = async ({
  fullName,
  username,
}: PutUpdateUserRequestType) => {
  try {
    const res = await axiosInstance.put<UserType>(DOMAIN.UPDATE_USER, {
      params: {
        fullName,
        username,
      },
    });

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * @brief 내 계정 비밀번호를 변경합니다.
 * @details 리턴값은 별도로 존재하지 않습니다.
 */
export const updateMyPassword = async (password: string) => {
  try {
    await axiosInstance.put(DOMAIN.UPDATE_PASSWORD, {
      params: {
        password,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
