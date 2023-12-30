import { InternalAxiosRequestConfig } from 'axios';
import { AUTH_TOKEN_KEY } from '@/Constants/Api';

// 로그인 하면 토큰 발급, 로그아웃하면 토큰 삭제
const setAuthorization = (config: InternalAxiosRequestConfig) => {
  if (!config.useAuth || !config.headers || config.headers.Authorization)
    return config;

  const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!accessToken) {
    throw new Error('토큰이 존재하지 않습니다');
  }

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

export default setAuthorization;
