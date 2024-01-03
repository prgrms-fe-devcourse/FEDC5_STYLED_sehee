import { axiosAuthInstance, axiosCommonInstance } from '@/Api/axiosInstance';
import handleError from '@/Api/handleError';
import { DOMAIN } from '@/Constants/Api';
import { PostLoginRequestType, PostSignUpRequestType } from '@/Types/Request';
import { UserResponseType } from '@/Types/Response';
import { UserType } from '@/Types/UserType';

/**
 * @brief 사용자가 이메일과 비밀번호로 서비스에 로그인합니다.
 */
export const login = async ({ email, password }: PostLoginRequestType) => {
  try {
    const res = await axiosCommonInstance.post<UserResponseType>(DOMAIN.LOGIN, {
      email,
      password,
    });

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 사용자가 이메일, fullName, 비밀번호로 서비스에 가입합니다.
 */
export const signUp = async ({
  email,
  fullName,
  password,
}: PostSignUpRequestType) => {
  try {
    const res = await axiosCommonInstance.post<UserResponseType>(
      DOMAIN.SIGNUP,
      {
        email,
        fullName,
        password,
      },
    );

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};

/**
 * @brief 사용자가 로그아웃 합니다.
 * @return 성공 여부를 알려줍니다.
 */
export const logout = async () => {
  try {
    await axiosAuthInstance.post(DOMAIN.LOGOUT);

    return true;
  } catch (e) {
    handleError(e);
    return false;
  }
};

/**
 * @brief 사용자가 인증이 되었는지 확인합니다.
 */
export const checkAuth = async () => {
  try {
    const res = await axiosAuthInstance.get<UserType>(DOMAIN.AUTH_USER);

    return res.data;
  } catch (e) {
    handleError(e);
    return null;
  }
};
