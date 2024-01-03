/* eslint-disable no-param-reassign */
import { InternalAxiosRequestConfig } from 'axios';
import { AUTH_TOKEN_KEY } from '@/Constants/Api';

/**
 * 로그인 하면 토큰을 발급 받고, 인증이 필요한 경우 통신 직전에 header에 발급 받은 토큰을 넣어줍니다.
 * 임시로 세션스토리지 사용 중, 추후에 변경 가능성 있습니다.
 */
const setAuthorization = (config: InternalAxiosRequestConfig) => {
  const accessToken = sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export default setAuthorization;
