import { axiosAuthInstance } from '@/Api/axiosInstance';
import { PutUpdateUserRequestType } from '@/Types/Request';
import { UserType } from '@/Types/UserType';
import { DOMAIN } from '@/Constants/Api';
import handleError from '@/Api/handleError';

/**
 * @brief 나의 정보를 변경합니다.
 * @details {} 중괄호 내부에 반드시 fullName, username 설정해야 합니다.
 */
export const updateMyName = async ({
  fullName,
  username,
}: PutUpdateUserRequestType) => {
  try {
    const res = await axiosAuthInstance.put<UserType>(DOMAIN.UPDATE_USER, {
      fullName,
      username,
    });

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 내 계정 비밀번호를 변경합니다.
 * @return 성공 여부를 알려줍니다.
 */
export const updateMyPassword = async (password: string) => {
  try {
    await axiosAuthInstance.put(DOMAIN.UPDATE_PASSWORD, {
      password,
    });

    return true;
  } catch (e) {
    handleError(e);
    return false;
  }
};
