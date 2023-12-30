import { axiosAuthInstance, axiosCommonInstance } from '@/Api/axiosInstance';
import { DOMAIN, AUTH_TOKEN_KEY } from '@/Constants/Api';
import { PostLoginRequestType, PostSignUpRequestType } from '@/Types/Request';
import { UserResponseType } from '@/Types/Response';
import { UserType } from '@/Types/UserType';

/**
 * @brief 사용자가 이메일과 비밀번호로 서비스에 로그인합니다.
 * @return 리턴값은 별도로 존재하지 않습니다.
 * @todo 빈칸 에러 핸들링을 api함수 내부에서 할지, 외부에서 할지 고민해봐야 합니다.
 */
export const login = async ({ email, password }: PostLoginRequestType) => {
  try {
    const res = await axiosCommonInstance.post<UserResponseType>(DOMAIN.LOGIN, {
      email,
      password,
    });

    const { token } = res.data;
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (e) {
    console.error(e);
  }
};

/**
 * @brief 사용자가 이메일, fullName, 비밀번호로 서비스에 가입합니다.
 * @return 리턴값은 별도로 존재하지 않습니다.
 * @todo 빈칸 에러 핸들링을 api함수 내부에서 할지, 외부에서 할지 고민해봐야 합니다.
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

    const { token } = res.data;
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (e) {
    console.error(e);
  }
};

/**
 * @brief 사용자가 로그아웃 합니다.
 * @return 리턴값은 별도로 존재하지 않습니다.
 */
export const logout = async () => {
  try {
    await axiosAuthInstance.post(DOMAIN.LOGOUT);

    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (e) {
    console.error(e);
  }
};

/**
 * @brief 사용자가 인증이 되었는지 확인합니다.
 * @return 실패할 경우, null을 반환합니다.
 */
export const checkAuth = async () => {
  try {
    const res = await axiosAuthInstance.get<UserType>(DOMAIN.AUTH_USER);

    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
